import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { green, red } from '@mui/material/colors';
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table } from "../../components/common";
import { Add } from "../../images/icons";
import {
  BorderColorSharp,
  Delete,
  Ballot,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import RoleSection from "../../components/user/RoleSection";

const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const Role = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog, } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);

  const [RoleList, setRoleList] = React.useState([]);
  // const navigate = useNavigate();

  React.useEffect(() => {
    getRoles()
  }, [filter])

  const getRoles = async () => {
    const { data, total, success } = await authedApi.role.getRoles(filter);

    const _rows = data.map(a => ({
      ...a, _id: a.roleId,
      _isEnabled: a.isEnabled ? <CheckCircle sx={{ color: green[300] }} /> : <Cancel sx={{ color: red[300] }} />,
    }));

    if (success) {
      setRoleList(_rows);
      setTotal(total);
    }

  }

  const openEditRoleDialog = (role) => {
    openDialog({
      title: t("edit-thing", { thing: t("role") }),
      maxWidth: "md",
      fullWidth: true,
      section: <RoleSection onConfirm={handleEditRole} role={role} />
    });
  }

  const openAddRoleDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("role") }),
      maxWidth: "md",
      fullWidth: true,
      section: <RoleSection onConfirm={handleAddRole} />
    });
  }

  const handleEditRole = async (state) => {
    const role = {
      name: state.roleName,
      rolesAuthorizationIds: state.rolesAuthorizationIds,
      isEnabled: state.isEnabled
    };

    const { success } = await authedApi.role.putUpdateRole({ id: state.roleId, data: role });

    if (success) {
      getRoles();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }
  }

  const handleAddRole = async (state) => {
    const role = {
      name: state.roleName,
      rolesAuthorizationIds: state.rolesAuthorizationIds,
      isEnabled: state.isEnabled
    };
    try {
      const { success } = await authedApi.role.postCreateRole({ data: { ...role } });

      if (success) {
        getRoles();
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

  const handleDeleteRole = async role => {
    const { success } = await authedApi.role.deleteRole({ id: role.roleId });

    if (success) {
      getRoles();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    }
  }

  const handleSetWarningDialog = (role) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: role.name }),
      onConfirm: () => handleDeleteRole(role)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("role")}
        rows={RoleList}
        columns={[
          { key: 'roleName', label: t('role-name'), sortable: false },
          { key: '_isEnabled', label: t('enable'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getRoles}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), onClick: openAddRoleDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('edit'), onClick: (e, row) => openEditRoleDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default Role;