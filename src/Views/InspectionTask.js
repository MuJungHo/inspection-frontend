import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Paper, Table, Image } from "../components/common";
import dayjs from "dayjs";

const User = () => {
  const { authedApi, t } = useContext(GlobalContext);

  const [UserList, setUserList] = React.useState([]);
  React.useEffect(() => {
    getAllInspectionTaskToday()
  }, [])
  const getAllInspectionTaskToday = async () => {
    const { data, success } = await authedApi.getAllInspectionTaskToday();
    const _rows = data.map(a => ({
      ...a, _id: a.id,
      _plan: a.plan.name,
    }));

    if (success) {
      setUserList(_rows);
    }
  }
  return (<Paper sx={{ margin: 3 }}>
    <Table
      title={t("today-task")}
      checkable={false}
      rows={UserList}
      columns={[
        { key: '_plan', label: t('inspection-plan'), sortable: false },
        { key: 'scheduledAt', label: t('schedule-at'), sortable: false },
        { key: 'status', label: t('status'), sortable: false },
      ]}
    // dense
    />
  </Paper>)
}


export default User;