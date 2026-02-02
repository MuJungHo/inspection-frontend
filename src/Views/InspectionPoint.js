import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Paper, Table, Image } from "../components/common";
import dayjs from "dayjs";

const User = () => {
  const { authedApi, t } = useContext(GlobalContext);

  const [UserList, setUserList] = React.useState([]);
  React.useEffect(() => {
    getAllInspectionPoints()
  }, [])
  const getAllInspectionPoints = async () => {
    const { data, success } = await authedApi.getAllInspectionPoints();
    const _rows = data.map(a => ({
      ...a, _id: a.id,
      _targetItems: a.items.length,
    }));

    if (success) {
      setUserList(_rows);
    }
  }
  return (<Paper sx={{ margin: 3 }}>
    <Table
      title={t("inspection-point")}
      checkable={false}
      rows={UserList}
      columns={[
        { key: 'name', label: t('name'), sortable: false },
        { key: '_targetItems', label: t('inspection-item'), sortable: false },
        { key: 'latitude', label: t('座標Y'), sortable: false },
        { key: 'longitude', label: t('座標X'), sortable: false },
      ]}
    // dense
    />
  </Paper>)
}


export default User;