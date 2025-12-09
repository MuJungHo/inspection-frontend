import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { green, red } from '@mui/material/colors';
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table } from "../../components/common";
import { Add } from "../../images/icons";
import {
  BorderColorSharp,
  Delete,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import AuthorizationSection from "../../components/User/AuthorizationSection";


const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const Authorization = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog, } = useContext(GlobalContext);
  const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);
  const actionCondition = (action) => (row) => canAccessAction("authorization", action) && !row.isBuiltIn;

  const [AuthorizationList, setAuthorizationList] = React.useState([]);
  // const navigate = useNavigate();

  React.useEffect(() => {
    getAuthorizations()
  }, [filter])

  const getAuthorizations = async () => {
    const { data, total, success } = await authedApi.authorization.getAuthorizations(filter);

    const _rows = data.map(a => ({
      ...a,
      _id: a.authorizationId,
      _isEnabled: a.isEnabled ? <CheckCircle sx={{ color: green[300] }} /> : <Cancel sx={{ color: red[300] }} />,
      _isBuiltIn: a.isBuiltIn && <CheckCircle />,
    }));

    if (success) {
      setAuthorizationList(_rows);
      setTotal(total);
    }

  }

  const openEditAuthorizationDialog = (authorization) => {
    openDialog({
      title: t("edit-thing", { thing: t("authorization") }),
      maxWidth: "md",
      fullWidth: true,
      section: <AuthorizationSection onConfirm={handleEditAuthorization} authorization={authorization} />
    });
  }

  const openAddAuthorizationDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("authorization") }),
      maxWidth: "md",
      fullWidth: true,
      section: <AuthorizationSection onConfirm={handleAddAuthorization} />
    });
  }

  const handleEditAuthorization = async (state) => {
    const authorization = {
      name: state.name,
      description: state.description,
      scope: state.scope,
      isEnabled: state.isEnabled
    };
    // console.log(state)
    const { success } = await authedApi.authorization.putUpdateAuthorization({ id: state._id, data: authorization });

    if (success) {
      getAuthorizations();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }
  }

  const handleAddAuthorization = async (state) => {
    const authorization = {
      name: state.name,
      description: state.description,
      scope: state.scope,
      isEnabled: state.isEnabled
    };
    try {
      const { success } = await authedApi.authorization.postCreateAuthorization({ data: { ...authorization } });

      if (success) {
        getAuthorizations();
        closeDialog();
        openSnackbar({
          severity: "success",
          message: t("success-thing", { thing: t("add") })
        });
      } else {
        openSnackbar({
          severity: "error",
          message: t("failed-thing", { thing: t("add") })
        });
      }
    } catch (error) {
      openSnackbar({
        severity: "error",
        message: t("failed-thing", { thing: t("add") })
      });
    }
  }

  const handleDeleteAuthorization = async authorization => {
    const { success } = await authedApi.authorization.deleteAuthorization({ id: authorization.authorizationId });

    if (success) {
      getAuthorizations();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    }
  }

  const handleSetWarningDialog = (authorization) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: authorization.name }),
      onConfirm: () => handleDeleteAuthorization(authorization)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("authorization")}
        rows={AuthorizationList}
        columns={[
          { key: 'name', label: t('name'), sortable: false },
          { key: 'scope', label: t('scope'), sortable: false },
          { key: 'description', label: t('description'), sortable: false },
          { key: '_isEnabled', label: t('is-enabled'), sortable: false },
          { key: '_isBuiltIn', label: t('built-in'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getAuthorizations}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        // onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), condition: actionCondition("create"), onClick: openAddAuthorizationDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('edit'), condition: actionCondition("update"), onClick: (e, row) => openEditAuthorizationDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), condition: actionCondition("delete"), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default Authorization;