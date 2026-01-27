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
  TimeToLeave,
  Download
} from '@mui/icons-material';
import Vehicle from "../components/vehicle/Vehicle";
import BlackListSection from "../components/vehicle/BlackListSection";
import { host } from "../utils/api/axios";
import { initFilters } from "../utils/constant";
import { useFilter } from "../hooks/useFilter";
import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";

const NAME = "report";

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
    const { data, total, success } = await authedApi.record.getReport(filter);

    const _rows = data.map(a => {
      return {
        ...a,
        _id: a.fileName,
        _createAt: dayjs(a.createdTime).format("YYYY/MM/DD HH:mm"),
        // _updateAt: dayjs(a.updateAt).format("YYYY/MM/DD HH:mm"),
      }
    });

    if (success) {
      setList(_rows);
      setTotal(total);
    }
  }

  const getReportFile = async (report) => {
    const blob = await authedApi.record.getReportFile({ fileName: report.fileName });
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${report.fileName}.xlsx`)
    document.body.appendChild(link)
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t(NAME)}
        rows={list}
        columns={[
          { key: 'fileName', label: t('name'), sortable: false },
          { key: 'sizeKB', label: `${t('file-size')} (KB)`, sortable: false },
          { key: '_createAt', label: t('create-time'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getList}
        onClearClick={() => setFilter(initFilters[NAME])}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        toolbarActions={[]}
        rowActions={[
          { name: t('download'), onClick: (e, row) => getReportFile(row), icon: <Download /> },
        ]}
      // dense
      />
    </Paper>
  );
}


export default Notification;