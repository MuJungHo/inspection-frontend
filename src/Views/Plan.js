import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Paper, Table, Image } from "../components/common";
import dayjs from "dayjs";

const User = () => {
  const { authedApi, t } = useContext(GlobalContext);

  const [UserList, setUserList] = React.useState([]);
  React.useEffect(() => {
    getAllPlans()
  }, [])
  const getAllPlans = async () => {
    const { data, success } = await authedApi.getAllPlans();
    const _rows = data.map(a => ({
      ...a, _id: a.id,
      _points: a.points.length,
    }));

    if (success) {
      setUserList(_rows);
    }
  }
  return (<Paper sx={{ margin: 3 }}>
    <Table
      title={t("inspection-plan")}
      checkable={false}
      rows={UserList}
      columns={[
        { key: 'name', label: t('name'), sortable: false },
        { key: '_points', label: t('inspection-point'), sortable: false },
        { key: 'frequency', label: t('frequency'), sortable: false },
        { key: 'startDate', label: t('start-date'), sortable: false },
        { key: 'endDate', label: t('end-date'), sortable: false },
      ]}
    // dense
    />
  </Paper>)
}


export default User;