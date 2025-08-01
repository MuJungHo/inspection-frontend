import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table, Image } from "../../components/common";
import { useParams } from "react-router-dom";
// import { Add } from "../../images/icons";
import { useLocation } from "react-router";
// import {
//   BorderColorSharp,
//   Delete,
//   TimeToLeave
// } from '@mui/icons-material';
// import { host } from "../../utils/api/axios";
// import Vehicle from "../../components/vehicle/Vehicle";
// import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";

var startTime = new Date();
startTime.setHours(0, 0, 0, 0);

var endTime = new Date();
endTime.setHours(23, 59, 59, 999);

const initFilter = {
  startTime,
  endTime,
}

const AbnormalRecordHistory = () => {
  const { t, authedApi,
    // openDialog,
    // closeDialog,
    // openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const { abnormalRecordId } = useParams();
  const location = useLocation()

  const [filter, setFilter] = React.useState({ ...initFilter, abnormalRecordId });
  const [UsageRecordList, setUsageRecordList] = React.useState([]);
  const lastPage = location.pathname.split("/")[1];

  React.useEffect(() => {
    getAbnormalRecordHistory()
  }, [filter])

  const getAbnormalRecordHistory = async () => {
    const { data, total, success } = await authedApi.record.getAbnormalRecordHistory(filter);

    const _rows = data.map(a => {

      return ({
        ...a,
        _id: a.parkingFacilityUsageRecordHistoryId,
        _createAt: dayjs(a.createAt).format("YYYY-MM-DD HH:mm:ss")
      })
    });

    if (success) {
      setUsageRecordList(_rows);
      setTotal(total);
    }

  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("abnormal-record-history")}
        prevPages={[
          { name: t(lastPage), path: `/#/${lastPage}` }
        ]}
        rows={UsageRecordList}
        columns={[
          { key: 'type', label: t('type'), sortable: false },
          { key: '_createAt', label: t('create-time'), sortable: false },
          { key: 'content', label: t('content'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        paginable={false}
      // order={filter.order}
      // sort={filter.sort}
      // rowsPerPage={filter.amount}
      // page={filter.page}
      // total={total}
      // onSearchClick={getUsageRecordHistory}
      // onClearClick={() => setFilter(initFilter)}
      // onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
      // onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
      // onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
      // onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
      // toolbarActions={[]}
      // rowActions={[]}
      // dense
      />
    </Paper>
  );
}


export default AbnormalRecordHistory;