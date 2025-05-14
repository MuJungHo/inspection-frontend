import React, { useContext, useCallback } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { AuthContext } from "../contexts/AuthContext";
import {
  Table,
  Paper,
} from "../components/common";

import {
  BorderColorSharp,
  Delete,
} from '@mui/icons-material';
import { Upload, Add } from "../images/icons"
// import {
//   Select,
//   MenuItem
// } from '@material-ui/core';

import UserSection from "../components/User/UserSection";
import { dummyUserList } from "../utils/constant";

const initFilter = {
  order: "asc",
  sort: "name",
  keyword: "",
  limit: 5,
  page: 0,
}

const User = () => {
  const { t, openDialog, closeDialog, openSnackbar, openWarningDialog, authedApi } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);

  const [accountList, setAccountList] = React.useState([]);

  const getUserList = useCallback(async () => {
    // let { rows, count } = await authedApi.getUserList({
    //   limit: filter.limit,
    //   page: filter.page,
    //   keyword: filter.keyword,
    //   order: filter.order,
    //   sort: filter.sort
    // })
    let { rows, count } = dummyUserList;

    const _rows = rows.map(a => ({ ...a, _id: a.id }))
    setAccountList(_rows)
    setTotal(count)
  }, [filter])

  React.useEffect(() => {
    getUserList()
  }, [getUserList])

  const openEditUserDialog = (user) => {
    openDialog({
      title: t("edit-thing", { thing: t("user") }),
      section: <UserSection onConfirm={handleEditUserAccount} user={user} />
    })
  }

  const openAddUserDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("user") }),
      section: <UserSection onConfirm={handleAddUserAccount} />
    })
  }

  const openImportUserDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("user") }),
      section: <UserSection onConfirm={handleAddUserAccount} />
    })
  }

  const handleEditUserAccount = async (user) => {
    // await authedApi.putUpdateUser({ data: { ...user }, id: user.id })
    getUserList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("edit") })
    })
  }

  const handleAddUserAccount = async (user) => {
    // await authedApi.postCreateUser({ data: { ...user } })
    getUserList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("add") })
    })
  }

  const handleDeleteAccount = async user => {
    // await authedApi.deleteUser({ id: user.id })
    getUserList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("delete") })
    })
  }

  const handleSetWarningDialog = (user) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: user.name }),
      onConfirm: () => handleDeleteAccount(user)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("user")}
        rows={accountList}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'account', label: t('account') },
          { key: 'email', label: t('email') },
        ]}
        checkable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.limit}
        page={filter.page}
        total={total}
        onSearchClick={getUserList}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page })}
        onRowsPerPageChange={(limit) => setFilter({ ...filter, page: 0, limit })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), onClick: openAddUserDialog, icon: <Add /> },
          { name: t('upload'), onClick: openImportUserDialog, icon: <Upload /> },
        ]}
        rowActions={[
          { name: t('edit'), onClick: (e, row) => openEditUserDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default User;