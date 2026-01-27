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

const EdgeServerHistory = () => {
  const { t, authedApi,
    // openDialog,
    // closeDialog,
    // openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);
  const { edgeServerId } = useParams();
  const [edgeServerHistoryList, setEdgeServerHistoryList] = React.useState([]);

  React.useEffect(() => {
    getEdgeServerHistories()
  }, [filter])

  const getEdgeServerHistories = async () => {
    const { data, total, success } = await authedApi.edgeServer.getEdgeServerHistories({ id: edgeServerId });

    const _rows = data.map(a => ({ ...a, _id: a.edgeServerHistoryId }));

    if (success) {
      setEdgeServerHistoryList(_rows);
      setTotal(total);
    }

  }


  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("edge-server-history")}
        prevPages={[
          { name: t("edge-server"), path: "/#/edge-server" }
        ]}
        rows={edgeServerHistoryList}
        columns={[
          { key: 'type', label: t('type'), sortable: false },
          { key: 'content', label: t('content'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getEdgeServerHistories}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        toolbarActions={[]}
        rowActions={[]}
      // dense
      />
    </Paper>
  );
}


export default EdgeServerHistory;