import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table } from "../../components/common";
import { Add } from "../../images/icons";
import {
  BorderColorSharp,
  Delete,
  Ballot
} from '@mui/icons-material';
import PLCSection from "../../components/device/PLCSection";

const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const PLC = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog, } = useContext(GlobalContext);
  const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);
  const actionCondition = (action) => (row) => canAccessAction("plc", action);

  const [PLCList, setPLCList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getPLCs()
  }, [filter])

  const getPLCs = async () => {
    const { data, total, success } = await authedApi.plc.getPLCs(filter);

    const _rows = data.map(a => ({
      ...a, _id: a.plcId,
      _count: a.plcPoints?.length
    }));

    if (success) {
      setPLCList(_rows);
      setTotal(total);
    }

  }

  const openEditPLCDialog = (plc) => {
    openDialog({
      title: t("edit-thing", { thing: t("plc") }),
      maxWidth: "md",
      fullWidth: true,
      section: <PLCSection onConfirm={handleEditPLC} plc={plc} />
    });
  }

  const openAddPLCDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("plc") }),
      maxWidth: "md",
      fullWidth: true,
      section: <PLCSection onConfirm={handleAddPLC} />
    });
  }

  const handleEditPLC = async (state) => {
    const plc = {
      ParkingFacilityGateId: state.parkingFacilityGateId,
      Name: state.name,
      Host: state.host,
      Port: state.port,
      Protocol: state.protocol,
      Note: state.note
    };
    // console.log(state)
    const { success } = await authedApi.plc.patchUpdatePLC({ id: state._id, data: plc });

    if (success) {
      getPLCs();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }
  }

  const handleAddPLC = async (state) => {
    const plc = {
      ParkingFacilityGateId: state.parkingFacilityGateId,
      Name: state.name,
      Host: state.host,
      Port: state.port,
      Protocol: state.protocol,
      Note: state.note
    };
    try {
      const { success } = await authedApi.plc.postCreatePLC({ data: { ...plc } });

      if (success) {
        getPLCs();
        closeDialog();
        openSnackbar({
          severity: "success",
          message: t("success-thing", { thing: t("add") })
        });
      } else {
        openSnackbar({
          severity: "error",
          message: t("failed-thing", { thing: t("add") })
        });
      }
    } catch (error) {
      openSnackbar({
        severity: "error",
        message: t("failed-thing", { thing: t("add") })
      });
    }
  }

  const handleDeletePLC = async plc => {
    const { success } = await authedApi.plc.deletePLC({ id: plc.plcId });

    if (success) {
      getPLCs();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    }
  }

  const handleSetWarningDialog = (plc) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: plc.name }),
      onConfirm: () => handleDeletePLC(plc)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("plc")}
        rows={PLCList}
        columns={[
          { key: 'name', label: t('name'), sortable: false },
          { key: 'host', label: t('host'), sortable: false },
          { key: 'port', label: t('port'), sortable: false },
          { key: '_count', label: t('thing-amount', { thing: t("plc-point") }), sortable: false },
          { key: 'protocol', label: t('protocol'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getPLCs}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), condition: actionCondition("create"), onClick: openAddPLCDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('edit'), condition: actionCondition("update"), onClick: (e, row) => openEditPLCDialog(row), icon: <BorderColorSharp /> },
          { name: t('plc-point'), onClick: (e, row) => navigate(`/plc-point/${row.plcId}`), icon: <Ballot /> },
          { name: t('delete'), condition: actionCondition("delete"), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default PLC;