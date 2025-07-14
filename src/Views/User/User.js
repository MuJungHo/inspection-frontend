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
import UserSection from "../../components/User/UserSection";


const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const User = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog, } = useContext(GlobalContext);
  const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);

  const [UserList, setUserList] = React.useState([]);
  const actionCondition = (action) => (row) => canAccessAction("user", action);
  // const navigate = useNavigate();

  React.useEffect(() => {
    getUsers()
  }, [filter])

  const getUsers = async () => {
    const { data, total, success } = await authedApi.user.getUsers(filter);

    const _rows = data.map(a => ({
      ...a, _id: a.userId,
      _isEnabled: a.isEnabled ? <CheckCircle sx={{ color: green[300] }} /> : <Cancel sx={{ color: red[300] }} />,
    }));

    if (success) {
      setUserList(_rows);
      setTotal(total);
    }

  }

  const openEditUserDialog = (user) => {
    openDialog({
      title: t("edit-thing", { thing: t("user") }),
      maxWidth: "md",
      fullWidth: true,
      section: <UserSection onConfirm={handleEditUser} user={user} />
    });
  }

  const openAddUserDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("user") }),
      maxWidth: "md",
      fullWidth: true,
      section: <UserSection onConfirm={handleAddUser} />
    });
  }

  const handleEditUser = async (state) => {
    const user = {
      name: state.username,
      displayName: state.displayName,
      roleIds: state.roleIds,
      isEnabled: state.isEnabled,
    };
    if (state.password) {
      user.credentials = [
        {
          credentialType: "password",
          content: state.password,
          isEnabled: true
        }
      ]
    }
    // console.log(state)
    const { success } = await authedApi.user.putUpdateUser({ id: state._id, data: user });

    if (success) {
      getUsers();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }
  }

  const handleAddUser = async (state) => {
    const user = {
      name: state.username,
      displayName: state.displayName,
      roleIds: state.roleIds,
      isEnabled: state.isEnabled,
      credentials: [
        {
          credentialType: "password",
          content: state.password,
          isEnabled: true
        }
      ],
    };
    try {
      const { success } = await authedApi.user.postCreateUser({ data: { ...user } });

      if (success) {
        getUsers();
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

  const handleDeleteUser = async user => {
    const { success } = await authedApi.user.deleteUser({ id: user.userId });

    if (success) {
      getUsers();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    }
  }

  const handleSetWarningDialog = (user) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: user.username }),
      onConfirm: () => handleDeleteUser(user)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("user")}
        rows={UserList}
        columns={[
          { key: 'displayName', label: t('display-name'), sortable: false },
          { key: 'username', label: t('username'), sortable: false },
          { key: '_isEnabled', label: t('enable'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getUsers}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), condition: actionCondition("create"), onClick: openAddUserDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('edit'), condition: actionCondition("update"), onClick: (e, row) => openEditUserDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), condition: actionCondition("delete"), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default User;