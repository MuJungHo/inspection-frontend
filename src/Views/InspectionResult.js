import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Paper, Table, Image } from "../components/common";
import dayjs from "dayjs";

const User = () => {
  const { authedApi, t } = useContext(GlobalContext);

  const [UserList, setUserList] = React.useState([]);
  React.useEffect(() => {
    getAllInspectionResults()
  }, [])
  const getAllInspectionResults = async () => {
    const { data, success } = await authedApi.getAllInspectionResults();
    const _rows = data.map(a => ({
      ...a, _id: a.id,
      _plan: a.plan.name,
      _item: a.item.name,
      _inspector: a.inspector.username,
    }));

    if (success) {
      setUserList(_rows);
    }
  }
  return (<Paper sx={{ margin: 3 }}>
    <Table
      title={t("inspection-result")}
      checkable={false}
      rows={UserList}
      columns={[
        { key: '_plan', label: t('inspection-plan'), sortable: false },
        { key: '_item', label: t('inspection-item'), sortable: false },
        { key: '_inspector', label: t('inspector'), sortable: false },
        { key: 'status', label: t('status'), sortable: false },
        { key: 'value', label: t('value'), sortable: false },
        { key: 'comment', label: t('comment'), sortable: false },
      ]}
    // dense
    />
  </Paper>)
}


export default User;