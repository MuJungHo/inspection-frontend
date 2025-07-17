import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table } from "../../components/common";
import { Add } from "../../images/icons";
import {
  BorderColorSharp,
  Delete,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import CameraSection from "../../components/device/CameraSection";

const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const Camera = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog, } = useContext(GlobalContext);
  const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);
  const [cameraList, setCameraList] = React.useState([]);
  const actionCondition = (action) => (row) => canAccessAction("camera", action);

  React.useEffect(() => {
    getCameras()
  }, [filter])

  const getCameras = async () => {
    const { data, total, success } = await authedApi.camera.getCameras(filter);

    const _rows = data.map(a => ({
      ...a, _id: a.cameraId,
      _isActive: a.isActive ? <CheckCircle sx={{ color: green[300] }} /> : <Cancel sx={{ color: red[300] }} />,

    }));

    if (success) {
      setCameraList(_rows);
      setTotal(total);
    }

  }

  const openEditCameraDialog = (camera) => {
    openDialog({
      title: t("edit-thing", { thing: t("camera") }),
      maxWidth: "md",
      fullWidth: true,
      section: <CameraSection onConfirm={handleEditCamera} camera={camera} />
    });
  }

  const openAddCameraDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("camera") }),
      maxWidth: "md",
      fullWidth: true,
      section: <CameraSection onConfirm={handleAddCamera} />
    });
  }

  const handleEditCamera = async (state) => {
    const camera = {
      EdgeServerId: state.edgeServerId,
      ParkingFacilityGateId: state.parkingFacilityGateId,
      ParkingFacilityGateLaneId: state.parkingFacilityGateLaneId,
      Host: state.host,
      Port: state.port,
      Username: state.username,
      Password: state.password,
      Name: state.name,
      StreamType: state.streamType,
      StreamUrl: state.streamUrl,
      IsActive: state.isActive
    };
    // console.log(state)
    const { success } = await authedApi.camera.patchUpdateCamera({ id: state._id, data: camera });

    if (success) {
      getCameras();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }
  }

  const handleAddCamera = async (state) => {
    const camera = {
      EdgeServerId: state.edgeServerId,
      ParkingFacilityGateId: state.parkingFacilityGateId,
      ParkingFacilityGateLaneId: state.parkingFacilityGateLaneId,
      Host: state.host,
      Port: state.port,
      Username: state.username,
      Password: state.password,
      Name: state.name,
      StreamType: state.streamType,
      StreamUrl: state.streamUrl,
      IsActive: state.isActive
    };
    try {
      const { success } = await authedApi.camera.postCreateCamera({ data: { ...camera } });

      if (success) {
        getCameras();
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

  const handleDeleteEdgeCamera = async camera => {
    const { success } = await authedApi.camera.deleteCamera({ id: camera.cameraId });

    if (success) {
      getCameras();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    }
  }

  const handleSetWarningDialog = (camera) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: camera.name }),
      onConfirm: () => handleDeleteEdgeCamera(camera)
    })
  }


  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("camera")}
        rows={cameraList}
        columns={[
          { key: 'name', label: t('name'), sortable: false },
          { key: 'streamType', label: t('stream-type'), sortable: false },
          { key: 'host', label: t('host'), sortable: false },
          { key: 'port', label: t('port'), sortable: false },
          { key: '_isActive', label: t('is-active'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getCameras}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), condition: actionCondition("create"), onClick: openAddCameraDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('edit'), condition: actionCondition("update"), onClick: (e, row) => openEditCameraDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), condition: actionCondition("delete"), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default Camera;