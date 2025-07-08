import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table } from "../../components/common";
import { useParams } from "react-router-dom";
// import { Add } from "../../images/icons";
// import {
//   BorderColorSharp,
//   Delete,
// } from '@mui/icons-material';


const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const FailoverEvent = () => {
  const { t, authedApi,
    // openDialog,
    // closeDialog,
    // openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);
  const { failoverGroupId } = useParams();
  const [failoverEventList, setFailoverEventList] = React.useState([]);

  React.useEffect(() => {
    getFailoverEventsByGroupId()
  }, [filter])

  const getFailoverEventsByGroupId = async () => {
    const { data, total, success } = await authedApi.failoverEvent.getFailoverEventsByGroupId({ id: failoverGroupId });

    const _rows = data.map(a => ({ ...a, _id: a.failoverEventId }));

    if (success) {
      setFailoverEventList(_rows);
      setTotal(total);
    }

  }


  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("failover-event")}
        prevPages={[
          { name: t("failover-group"), path: "/#/failover-group" }
        ]}
        rows={failoverEventList}
        columns={[
          { key: 'type', label: t('type'), sortable: false },
          { key: 'details', label: t('detail'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getFailoverEventsByGroupId}
        onClearClick={() => setFilter(initFilter)}
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


export default FailoverEvent;