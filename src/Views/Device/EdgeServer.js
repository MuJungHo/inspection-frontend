import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table } from "../../components/common";
import { Add } from "../../images/icons";
import {
  BorderColorSharp,
  Delete,
  History
} from '@mui/icons-material';
import EdgeServerSection from "../../components/device/EdgeServerSection";


const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const EdgeServer = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog, } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);
  const [edgeServerList, setEdgeServerList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getEdgeServers()
  }, [filter])

  const getEdgeServers = async () => {
    const { data, total } = await authedApi.edgeServer.getEdgeServers(filter);

    const _rows = data.map(a => ({ ...a, _id: a.edgeServerId }));

    setEdgeServerList(_rows);

    setTotal(total);

  }

  const openEditEdgeServerDialog = (edgeServer) => {
    openDialog({
      title: t("edit-thing", { thing: t("edge-server") }),
      section: <EdgeServerSection onConfirm={handleEditEdgeServer} edgeServer={edgeServer} />
    })
  }

  const openAddEdgeServerDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("edge-server") }),
      section: <EdgeServerSection onConfirm={handleAddEdgeServer} />
    })
  }

  const handleEditEdgeServer = async (state) => {
    const edgeServer = {
      ParkingFacilityGateId: state.parkingFacilityGateId,
      Name: state.name,
      // "Description": "tes3",
      Host: state.host,
      Port: state.port,
      LastStatus: state.lastStatus,
      IsEnabled: state.isEnabled,
      SerialNumber: state.serialNumber
    }
    // console.log(state)
    await authedApi.edgeServer.patchUpdateEdgeServer({ id: state._id, data: edgeServer });
    getEdgeServers()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("edit") })
    })
  }

  const handleAddEdgeServer = async (state) => {
    const edgeServer = {
      ParkingFacilityGateId: state.parkingFacilityGateId,
      Name: state.name,
      // "Description": "tes3",
      Host: state.host,
      Port: state.port,
      LastStatus: state.lastStatus,
      IsEnabled: state.isEnabled,
      SerialNumber: state.serialNumber
    }
    await authedApi.edgeServer.postCreateEdgeServer({ data: { ...edgeServer } })
    getEdgeServers()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("add") })
    })
  }


  const handleDeleteEdgeServers = async edgeServer => {
    await authedApi.edgeServer.deleteEdgeServer({ id: edgeServer.edgeServerId })
    getEdgeServers()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("delete") })
    })
  }

  const handleSetWarningDialog = (edgeServer) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: edgeServer.name }),
      onConfirm: () => handleDeleteEdgeServers(edgeServer)
    })
  }
  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("edge-server")}
        rows={edgeServerList}
        columns={[
          { key: 'name', label: t('name'), sortable: false },
          { key: 'host', label: t('host'), sortable: false },
          { key: 'port', label: t('port'), sortable: false },
          { key: 'serialNumber', label: t('serial-number'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getEdgeServers}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), onClick: openAddEdgeServerDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('edit'), onClick: (e, row) => openEditEdgeServerDialog(row), icon: <BorderColorSharp /> },
          { name: t('history'), onClick: (e, row) => navigate(`/edge-server/history/${row.edgeServerId}`), icon: <History /> },
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default EdgeServer;