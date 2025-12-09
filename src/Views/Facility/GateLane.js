import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";

import {
  Table,
  Paper,
} from "../../components/common";

import {
  BorderColorSharp,
  Delete,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import { Upload, Add } from "../../images/icons";
import GateLaneDialog from "../../components/Facility/GateLaneDialog";

const initFilter = {
  //   order: "asc",
  //   sort: "name",
  keyword: "",
  amount: 5,
  skip: 0,
}

const GateLane = () => {
  const { t, openDialog, closeDialog, openSnackbar, openWarningDialog, authedApi } = useContext(GlobalContext);
  const { canAccessAction } = useContext(AuthContext);

  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);

  // GateLane 資料狀態
  const [gateLaneList, setGateLaneList] = React.useState([]);

  // 預先載入的 region 資料
  const [allRegions, setAllRegions] = React.useState([]);
  const [allParkingFacilities, setAllParkingFacilities] = React.useState([]);
  // 新增：預先載入的 gate 資料
  const [allParkingFacilityGates, setAllParkingFacilityGates] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  const actionCondition = (action) => (row) => canAccessAction("gate-lane", action);
  // 載入全部 region 資料供選擇使用
  const getAllRegions = async () => {
    try {
      let { data, total } = await authedApi.regions.getRegions({
        // 不使用分頁限制，載入全部 region 資料
      });

      if (total > data.length) {
        let result = await authedApi.regions.getRegions({
          amount: total,
          skip: 0,
        });
        data = result.data;
      }

      const _allRegions = data.map(a => ({ ...a, _id: a.regionId }));
      setAllRegions(_allRegions);

    } catch (error) {
      console.error('載入 region 資料時發生錯誤:', error);
    }
  };

  const getAllParkingFacilities = async () => {
    try {
      let { data, total } = await authedApi.parkingFacilities.getParkingFacilities({
        // 不使用分頁限制，載入全部 parking facility 資料
      });
      if (total > data.length) {
        let result = await authedApi.parkingFacilities.getParkingFacilities({
          amount: total,
          skip: 0,
        });
        data = result.data;
      }
      const _allParkingFacilities = data.map(a => ({ ...a, _id: a.parkingFacilityId }));
      setAllParkingFacilities(_allParkingFacilities);
    } catch (error) {
      console.error('載入 parking facility 資料時發生錯誤:', error);
    }
  };

  // 新增：載入全部 gate 資料供選擇使用
  const getAllParkingFacilityGates = async () => {
    try {
      let { data, total } = await authedApi.parkingFacilityGates.getParkingFacilityGates({
        // 不使用分頁限制，載入全部 gate 資料
      });
      if (total > data.length) {
        let result = await authedApi.parkingFacilityGates.getParkingFacilityGates({
          amount: total,
          skip: 0,
        });
        data = result.data;
      }
      const _allParkingFacilityGates = data.map(a => ({ ...a, _id: a.parkingFacilityGateId }));
      setAllParkingFacilityGates(_allParkingFacilityGates);
    } catch (error) {
      console.error('載入 parking facility gate 資料時發生錯誤:', error);
    }
  };

  // 載入 GateLane 清單資料（分頁顯示用）
  const getGateLaneList = async () => {
    try {
      setLoading(true);
      let { data, total } = await authedApi.parkingFacilityGateLanes.getParkingFacilityGateLanes({
        amount: filter.amount,
        skip: filter.skip,
        // keyword: filter.keyword,
        // order: filter.order,
        // sort: filter.sort
      });

      const _rows = data.map(a => ({
        ...a,
        _id: a.parkingFacilityGateLaneId,
        _reversibleLane: a.reversibleLane ? <CheckCircle sx={{ color: green[300] }} /> : < Cancel sx={{ color: red[300] }} />,
        _isEnabled: a.isEnabled ? <CheckCircle sx={{ color: green[300] }} /> : < Cancel sx={{ color: red[300] }} />
      }));
      setGateLaneList(_rows);
      setTotal(total);
    } catch (error) {
      console.error('載入 GateLane 資料時發生錯誤:', error);
      openSnackbar({
        severity: "error",
        message: t("error-thing", { thing: t("loading") })
      });
    } finally {
      setLoading(false);
    }
  };

  // 頁面載入時執行
  React.useEffect(() => {
    // 預先載入全部 region 資料
    getAllRegions();
    // 預先載入全部 parking facility 資料
    getAllParkingFacilities();
    // 預先載入全部 gate 資料
    getAllParkingFacilityGates();
  }, []);

  React.useEffect(() => {
    getGateLaneList();
  }, [filter]);

  // 取得 region 名稱的輔助函式
  // const getRegionName = (regionId) => {
  //   const region = allRegions.find(r => r.id === regionId);
  //   return region ? region.name : regionId;
  // };

  const openEditGateLaneDialog = (data) => {
    openDialog({
      title: t("edit-thing", { thing: t("gate-lane") }),
      section: <GateLaneDialog
        onConfirm={handleEditGateLane}
        data={data}
        allRegions={allRegions}
        allParkingFacilities={allParkingFacilities}
        allParkingFacilityGates={allParkingFacilityGates}
      />
    });
  }

  const openAddGateLaneDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("gate-lane") }),
      section: <GateLaneDialog
        onConfirm={handleAddGateLane}
        allRegions={allRegions}
        allParkingFacilities={allParkingFacilities}
        allParkingFacilityGates={allParkingFacilityGates}
      />
    });
  }

  const handleEditGateLane = async (data) => {
    try {
      await authedApi.parkingFacilityGateLanes.patchUpdateParkingFacilityGateLane({
        id: data.parkingFacilityGateLaneId,
        data: {
          "parkingFacilityGateId": data.parkingFacilityGateId,
          "name": data.name,
          "description": data.description,
          "vehicleType": data.vehicleType,
          "direction": data.direction,
          "isEnabled": data.isEnabled,
          "reversibleLane": data.reversibleLane,
          "reversibleLaneManualActive": data.reversibleLaneManualActive
        }
      });

      getGateLaneList();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    } catch (error) {
      openSnackbar({
        severity: "error",
        message: t("error-thing", { thing: t("edit") })
      });
    }
  }

  const handleAddGateLane = async (data) => {
    debugger;
    try {
      let res = await authedApi.parkingFacilityGateLanes.postCreateParkingFacilityGateLane({
        data: {
          "parkingFacilityGateId": data.parkingFacilityGateId,
          "name": data.name,
          "description": data.description,
          "vehicleType": data.vehicleType,
          "direction": data.direction,
          "isEnabled": data.isEnabled,
          "reversibleLane": data.reversibleLane,
          "reversibleLaneManualActive": data.reversibleLaneManualActive
        }
      });

      if (!res.success) {
        openSnackbar({
          severity: "error",
          message: t("error-thing", { thing: t("add") })
        });
        return;
      }

      getGateLaneList();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("add") })
      });
    } catch (error) {
      openSnackbar({
        severity: "error",
        message: t("error-thing", { thing: t("add") })
      });
    }
  }

  const handleDeleteGateLane = async data => {
    try {
      await authedApi.parkingFacilityGateLanes.deleteParkingFacilityGateLane({ id: data.parkingFacilityGateLaneId });
      getGateLaneList();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    } catch (error) {
      openSnackbar({
        severity: "error",
        message: t("error-thing", { thing: t("delete") })
      });
    }
  }

  const handleSetWarningDialog = (data) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: data.name }),
      onConfirm: () => handleDeleteGateLane(data)
    });
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("gate-lane")}
        rows={gateLaneList}
        columns={[
          {
            key: 'factory', label: t('factory'),
            render: (value, rowData) => {
              // 先找到對應的 gate
              const gate = allParkingFacilityGates.find(g => g.parkingFacilityGateId === rowData.parkingFacilityGateId);
              if (!gate) return rowData.parkingFacilityGateId;

              // 再找到對應的 parking facility
              const parkingFacility = allParkingFacilities.find(f => f.parkingFacilityId === gate.parkingFacilityId);
              if (!parkingFacility) return rowData.parkingFacilityGateId;

              // 最後找到對應的 region
              const region = allRegions.find(r => r.regionId === parkingFacility.regionId);
              return region ? region.name : rowData.parkingFacilityGateId;
            }
          },
          {
            key: 'parkingFacilityId',
            label: t('parking-facility'),
            render: (value, rowData) => {
              // 先找到對應的 gate
              const gate = allParkingFacilityGates.find(g => g.parkingFacilityGateId === rowData.parkingFacilityGateId);
              if (!gate) return rowData.parkingFacilityGateId;

              // 再找到對應的 parking facility
              const parkingFacility = allParkingFacilities.find(f => f.parkingFacilityId === gate.parkingFacilityId);
              return parkingFacility ? parkingFacility.name : rowData.parkingFacilityGateId;
            }
          },
          {
            key: 'parkingFacilityGateId',
            label: t('gate'),
            render: (value, rowData) => {
              const gate = allParkingFacilityGates.find(g => g.parkingFacilityGateId === value);
              return gate ? gate.name : value;
            }
          },
          { key: 'name', label: t('name') },
          { key: 'description', label: t('description') },
          { key: '_reversibleLane', label: t('lane.reversible') },
          { key: '_isEnabled', label: t('is-enabled') },
        ]}
        checkable={false}
        filterable={false}
        loading={loading}
        // order={filter.order}
        // sort={filter.sort}
        rowsPerPage={filter.amount}
        page={(filter.skip / filter.amount)}
        total={total}
        // onSearchClick={getGateLaneList}
        // onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter(prevFilter => ({ ...prevFilter, skip: page * prevFilter.amount }))}
        onRowsPerPageChange={(limit) => setFilter(prevFilter => ({ ...prevFilter, skip: 0, amount: limit }))}
        // onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        // onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), condition: actionCondition("create"), onClick: openAddGateLaneDialog, icon: <Add /> },
          // { name: t('upload'), onClick: openImportGateLaneDialog, icon: <Upload /> },
        ]}
        rowActions={[
          { name: t('edit'), condition: actionCondition("update"), onClick: (e, row) => openEditGateLaneDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), condition: actionCondition("delete"), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}

export default GateLane;