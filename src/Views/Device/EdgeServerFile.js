import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table } from "../../components/common";
import { useParams } from "react-router-dom";
import { Add } from "../../images/icons";
import {
  // BorderColorSharp,
  Delete,
  Download
} from '@mui/icons-material';

import EdgeServerFileUploaderSection from "../../components/device/EdgeServerFileUploaderSection";
import dayjs from "dayjs";

const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const EdgeServerHistory = () => {
  const { t, authedApi,
    openDialog,
    closeDialog,
    openSnackbar,
    openWarningDialog,
  } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);
  const { edgeServerId } = useParams();
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    getList()
  }, [filter])

  const getList = async () => {
    const { data, total, success } = await authedApi.edgeServer.getEdgeServerFiles({ edgeserverid: edgeServerId });

    const _rows = data.map(a => ({
      ...a,
      _id: a.fileId,
      _createAt: dayjs(a.uploadAt).format("YYYY/MM/DD HH:mm"),
    }));

    if (success) {
      setList(_rows);
      setTotal(total);
    }

  }

  const handleAdd = () => {

    const handleUploadFile = async (state) => {

      if (!state.file) return;

      const formData = new FormData();
      formData.append('file', state.file, state.name);
      formData.append("description", state.description);
      formData.append("filename", state.name);

      await authedApi.edgeServer.postEdgeServerFile({ data: formData, edgeserverid: edgeServerId });
      getList()
      closeDialog()
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("upload") })
      })
    }

    openDialog({
      title: t("add-thing", { thing: t("edge-server-file") }),
      section: <EdgeServerFileUploaderSection onConfirm={handleUploadFile} />
    })
  }

  const handleSetWarningDialog = (file) => {

    const handleDeleteEdgeServers = async () => {
      await authedApi.edgeServer.deleteEdgeServerFile({ edgeserverid: edgeServerId, fileId: file.fileId });
      getList();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      })
    }

    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: file.fileName }),
      onConfirm: () => handleDeleteEdgeServers()
    })
  }

  const handleGetEdgeServerFile = async (file) => {
    const blob = await authedApi.edgeServer.getEdgeServerFile({ edgeserverid: edgeServerId, fileId: file.fileId });
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", file.fileName)

    document.body.appendChild(link)
    link.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("edge-server-file")}
        prevPages={[
          { name: t("edge-server"), path: "/#/edge-server" }
        ]}
        rows={list}
        columns={[
          { key: 'fileName', label: t('thing-name', { thing: t("file") }), sortable: false },
          { key: '_createAt', label: t('create-time'), sortable: false },
          { key: 'description', label: t('description'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getList}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), onClick: handleAdd, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('download'), onClick: (e, row) => handleGetEdgeServerFile(row), icon: <Download /> },
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> },
        ]}
      // dense
      />
    </Paper>
  );
}


export default EdgeServerHistory;