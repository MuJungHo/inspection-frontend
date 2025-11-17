import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table, Image } from "../components/common";
import { Add } from "../images/icons";
import {
  // BorderColorSharp,
  // Delete,
  // Ballot,
  History,
  TimeToLeave
} from '@mui/icons-material';
import Vehicle from "../components/vehicle/Vehicle";
import BlackListSection from "../components/vehicle/BlackListSection";
import { host } from "../utils/api/axios";
import { initFilters } from "../utils/constant";
import { useFilter } from "../hooks/useFilter";
import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";

const NAME = "notification";

const Notification = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog,
  } = useContext(GlobalContext);
  // const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = useFilter(NAME);
  const [list, setList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getList()
  }, [filter])

  const getList = async () => {
    const { data, total, success } = await authedApi.notification.getNotifications(filter);

    const _rows = data.map(a => {
      return {
        ...a,
        _id: a.notificationLogId,
        _createAt: dayjs(a.createAt).format("YYYY/MM/DD HH:mm"),
        // _updateAt: dayjs(a.updateAt).format("YYYY/MM/DD HH:mm"),
      }
    });

    if (success) {
      setList(_rows);
      setTotal(total);
    }
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t(NAME)}
        rows={list}
        columns={[
          { key: 'type', label: t('type'), sortable: false },
          { key: 'message', label: t('content'), sortable: false },
          { key: 'level', label: t('level'), sortable: false },
          { key: '_createAt', label: t('create-time'), sortable: false },
          { key: 'createBy', label: t('creator'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        toolbarFilters={<div style={{ width: '100%', display: 'flex' }}>
          <DateRangePicker
            cleanable={false}
            placement="bottomEnd"
            format="MM/dd/yyyy hh:mm aa"
            value={[new Date(filter.startTime), new Date(filter.endTime)]} onChange={([startTime, endTime]) => setFilter({
              ...filter,
              startTime,
              endTime
            })} />
        </div>}
        onSearchClick={getList}
        onClearClick={() => setFilter(initFilters[NAME])}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[]}
        rowActions={[]}
      // dense
      />
    </Paper>
  );
}


export default Notification;