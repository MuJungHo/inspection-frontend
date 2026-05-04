import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table, Image } from "../../components/common";
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const User = () => {
  const { authedApi, t } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    const { data, success } = await authedApi.getAllTasks({ status: "COMPLETED" });
    const _rows = data.map(a => ({
      ...a, _id: a.id,
      _inspector: a.inspector.username,
      _plan: a.plan.name
    }));

    setList(_rows);
  }
  return (<Paper sx={{ margin: 3 }}>
    <Table
      title={t("report")}
      checkable={false}
      rows={list}
      columns={[
        { key: '_plan', label: t('inspection-plan'), sortable: false },
        { key: '_inspector', label: t('inspector'), sortable: false },
      ]}
      rowActions={[
        { name: t('inspection-item'), onClick: (e, row) => navigate(`/report/${row.id}/detail`), icon: <ChecklistIcon /> },
      ]}
    // dense
    />
  </Paper>)
}


export default User;