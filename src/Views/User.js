import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Paper, Table, Image } from "../components/common";


const User = () => {
  const { authedApi, t } = useContext(GlobalContext);

  const [UserList, setUserList] = React.useState([]);
  React.useEffect(() => {
    getAllUsers()
  }, [])
  const getAllUsers = async () => {
    const { data, success } = await authedApi.getAllUsers();
    const _rows = data.map(a => ({
      ...a, _id: a.id,
      _role: t(a.role)
    }));

    if (success) {
      setUserList(_rows);
    }
  }
  return (<Paper sx={{ margin: 3 }}>
    <Table
      title={t("user")}
      checkable={false}
      rows={UserList}
      columns={[
        { key: 'username', label: t('username'), sortable: false },
        { key: 'email', label: t('email'), sortable: false },
        { key: '_role', label: t('role'), sortable: false },
      ]}
    // dense
    />
  </Paper>)
}


export default User;