import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table, Image } from "../../components/common";
import ChecklistIcon from '@mui/icons-material/Checklist';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";

import dayjs from "dayjs";

const User = () => {
  const { authedApi, t } = useContext(GlobalContext);
  const navigate = useNavigate();

  const [list, setList] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState({
    limit: 10,
    offset: 0
  });
  React.useEffect(() => {
    getList()
  }, [filter])

  const getList = async () => {
    const startDate = new Date();
    const endDate = new Date();

    const { data: { rows, count }, success } = await authedApi.getAllTasks({
      status: "TODO",
      startDate,
      endDate,
      limit: filter.limit,
      offset: filter.offset
    });

    const _list = rows.map(a => ({
      ...a, _id: a.id,
      _inspector: a.inspector.username,
      _plan: a.plan.name,
      _scheduledAt: a.scheduledAt
    }));

    setList(_list);
    setTotal(count);
  }

  return (<Paper sx={{ margin: 3 }}>
    <Table
      dense
      title={t("today-task")}
      checkable={false}
      paginable
      total={total}
      rows={list}
      page={filter.offset}
      rowsPerPage={filter.limit}
      columns={[
        { key: '_plan', label: t('inspection-plan'), sortable: false },
        { key: '_scheduledAt', label: t('schedule-at'), sortable: false },
        { key: '_inspector', label: t('inspector'), sortable: false },
      ]}
      rowActions={[
        { name: t('inspection-item'), onClick: (e, row) => navigate(`/task/${row.id}/edit`), icon: <EditIcon/> },
      ]}
      onPageChange={offset => setFilter({
        ...filter,
        offset
      })}
      onRowsPerPageChange={limit => setFilter({
        ...filter,
        limit
      })}
    />
  </Paper>)
}


export default User;