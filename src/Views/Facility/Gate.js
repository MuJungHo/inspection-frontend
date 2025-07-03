import React, { useContext, useCallback } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

import {
  Table,
  Paper,
} from "../../components/common";

import {
  BorderColorSharp,
  Delete,
} from '@mui/icons-material';
import { Upload, Add } from "../../images/icons";
import GateDialog from "../../components/Facility/GateDialog";

const initFilter = {
  //   order: "asc",
  //   sort: "name",
  keyword: "",
  amount: 5,
  skip: 0,
}

const Gate = () => {
  const { t, openDialog, closeDialog, openSnackbar, openWarningDialog, authedApi } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);

  // Gate 資料狀態
  const [gateList, setGateList] = React.useState([]);

  // 預先載入的 region 資料
  const [allRegions, setAllRegions] = React.useState([]);
  const [allParkingFacilities, setAllParkingFacilities] = React.useState([]);
  
  const [loading, setLoading] = React.useState(false);

  // 載入全部 region 資料供選擇使用
  const getAllRegions = useCallback(async () => {
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
  }, [authedApi.regions]);

  const getAllParkingFacilities = useCallback(async () => {
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
  }, [authedApi.parkingFacilities]);

  // 載入 Gate 清單資料（分頁顯示用）
  const getGateList = useCallback(async () => {
    try {
      setLoading(true);
      let { data, total } = await authedApi.parkingFacilityGates.getParkingFacilityGates({
        amount: filter.amount,
        skip: filter.skip,
        // keyword: filter.keyword,
        // order: filter.order,
        // sort: filter.sort
      });

      const _rows = data.map(a => ({ ...a, _id: a.id, factory: a.parkingFacilityId }));
      // const _rows = data.map(a => {
      //   const parkingFacility = allParkingFacilities.find(f => f._id === a.parkingFacilityId);
      //   return {
      //     ...a,
      //     regionId: parkingFacility ? parkingFacility.regionId : null,
      //     _id: a.id
      //   };
      // });
      setGateList(_rows);
      setTotal(total);
    } catch (error) {
      console.error('載入 Gate 資料時發生錯誤:', error);
      openSnackbar({
        severity: "error",
        message: t("error-thing", { thing: t("loading") })
      });
    } finally {
      setLoading(false);
    }
  }, [filter, authedApi.parkingFacilityGates, t, openSnackbar]);

  // 頁面載入時執行
  React.useEffect(() => {
    // 預先載入全部 region 資料
    getAllRegions();
    // 預先載入全部 parking facility 資料
    getAllParkingFacilities();
    // 載入 Gate 清單
    getGateList();
  }, [getAllRegions, getAllParkingFacilities, getGateList]);

  // 取得 region 名稱的輔助函式
  const getRegionName = useCallback((regionId) => {
    const region = allRegions.find(r => r.id === regionId);
    return region ? region.name : regionId;
  }, [allRegions]);

  const openEditGateDialog = (data) => {
    // TODO: 建立 GateDialog 元件
    openDialog({
      title: t("edit-thing", { thing: t("gate") }),
      section: <GateDialog onConfirm={handleEditGate} data={data} allRegions={allRegions} allParkingFacilities={allParkingFacilities} />
    });
  }

  const openAddGateDialog = () => {
    // TODO: 建立 GateDialog 元件
    openDialog({
      title: t("add-thing", { thing: t("gate") }),
      section: <GateDialog onConfirm={handleAddGate} allRegions={allRegions} allParkingFacilities={allParkingFacilities} />
    });
  }

  const handleEditGate = async (data) => {
    try {
      let res = await authedApi.parkingFacilityGates.patchUpdateParkingFacilityGate({
        id: data.parkingFacilityGateId,
        data: {
          "parkingFacilityId": data.parkingFacilityId,
          "name": data.name,
          "description": data.description
        }
      });

      getGateList();
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

  const handleAddGate = async (data) => {
    try {
      let res = await authedApi.parkingFacilityGates.postCreateParkingFacilityGate({
        data: {
          "parkingFacilityId": data.parkingFacilityId,
          "name": data.name,
          "description": data.description
        }
      });

      if (!res.success) {
        openSnackbar({
          severity: "error",
          message: t("error-thing", { thing: t("add") })
        });
        return;
      }

      getGateList();
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

  const handleDeleteGate = async data => {
    try {
      await authedApi.parkingFacilityGates.deleteParkingFacilityGate({ id: data.parkingFacilityGateId });
      getGateList();
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
      onConfirm: () => handleDeleteGate(data)
    });
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("gate")}
        rows={gateList}
        columns={[
          // { key: 'id', label: t('gateId') },
          { key: 'factory', label: t('factory'),
            render: (row) => {
              const parkingFacility = allParkingFacilities.find(f => f._id === row);
              if (!parkingFacility) return row;
              // 根據 parkingFacilityId 找到對應的 region 資料
              const data = allRegions.find(r => r.regionId === parkingFacility.regionId);
              return data ? data.name : row;
            } },
          {
            key: 'parkingFacilityId',
            label: t('parking-facility'),
            render: (row) => {
              const data = allParkingFacilities.find(r => r.parkingFacilityId === row);
              return data ? data.name : row;
            }
          },
          { key: 'name', label: t('name') },
          { key: 'description', label: t('description') },
        ]}
        checkable={false}
        filterable={false}
        loading={loading}
        // order={filter.order}
        // sort={filter.sort}
        rowsPerPage={filter.amount}
        page={(filter.skip / filter.amount)}
        total={total}
        // onSearchClick={getGateList}
        // onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter(prevFilter => ({ ...prevFilter, skip: page * prevFilter.amount }))}
        onRowsPerPageChange={(limit) => setFilter(prevFilter => ({ ...prevFilter, skip: 0, amount: limit }))}
        // onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        // onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), onClick: openAddGateDialog, icon: <Add /> },
          // { name: t('upload'), onClick: openImportGateDialog, icon: <Upload /> },
        ]}
        rowActions={[
          { name: t('edit'), onClick: (e, row) => openEditGateDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}

export default Gate;