import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table } from "../../components/common";
import { Add } from "../../images/icons";
import {
  BorderColorSharp,
  Delete,
} from '@mui/icons-material';
import PLCPointSection from "../../components/device/PLCPointSection";
import { useParams } from "react-router-dom";

const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const PLCPoint = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog, } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);

  const { plcId } = useParams();
  const [PLCPointList, setPLCPointList] = React.useState([]);

  React.useEffect(() => {
    getPLCPointByPLCId()
  }, [filter])

  const getPLCPointByPLCId = async () => {
    const { data, total, success } = await authedApi.plcPoint.getPLCPointByPLCId({ plcId });

    const _rows = data.map(a => ({ ...a, _id: a.plcPointId }));

    if (success) {
      setPLCPointList(_rows);
      setTotal(total);
    }

  }

  const openEditPLCPointDialog = (plcPoint) => {
    openDialog({
      title: t("edit-thing", { thing: t("plc-point") }),
      maxWidth: "md",
      fullWidth: true,
      section: <PLCPointSection onConfirm={handleEditPLCPoint} plcPoint={plcPoint} />
    });
  }

  const openAddPLCPointDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("plc-point") }),
      maxWidth: "md",
      fullWidth: true,
      section: <PLCPointSection onConfirm={handleAddPLCPoint} />
    });
  }

  const handleEditPLCPoint = async (state) => {
    const plcPoint = {
      PLCId: plcId,
      ParkingFacilityGateLaneId: state.parkingFacilityGateLaneId,
      Name: state.name,
      Point: state.point,
      Type: state.type,
      RetryCount: state.retryCount,
      Timeout: state.timeout
    };
    // console.log(state)
    const { success } = await authedApi.plcPoint.patchUpdatePLCPoint({ id: state._id, data: plcPoint });

    if (success) {
      getPLCPoints();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }
  }

  const handleAddPLCPoint = async (state) => {
    const plcPoint = {
      PLCId: plcId,
      ParkingFacilityGateLaneId: state.parkingFacilityGateLaneId,
      Name: state.name,
      Point: state.point,
      Type: state.type,
      RetryCount: state.retryCount,
      Timeout: state.timeout
    };
    try {
      const { success } = await authedApi.plcPoint.postCreatePLCPoint({ data: { ...plcPoint } });

      if (success) {
        getPLCPoints();
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

  const handleDeletePLCPoint = async plcPoint => {
    const { success } = await authedApi.plcPoint.deletePLCPoint({ id: plcPoint.plcPointId });

    if (success) {
      getPLCPoints();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    }
  }

  const handleSetWarningDialog = (plcPoint) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: plcPoint.name }),
      onConfirm: () => handleDeletePLCPoint(plcPoint)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("plc-point")}
        prevPages={[
          { name: t("plc"), path: "/#/plc" }
        ]}
        rows={PLCPointList}
        columns={[
          { key: 'name', label: t('name'), sortable: false },
          { key: 'point', label: t('point'), sortable: false },
          { key: 'retryCount', label: t('retry-count'), sortable: false },
          { key: 'timeout', label: t('timeout'), sortable: false },
          { key: 'type', label: t('type'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getPLCPointByPLCId}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), onClick: openAddPLCPointDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('edit'), onClick: (e, row) => openEditPLCPointDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default PLCPoint;