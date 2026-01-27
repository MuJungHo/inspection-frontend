import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";

import { useNavigate } from "react-router-dom";
import {
  Table,
  Paper,
} from "../../components/common";

import {
  BorderColorSharp,
  Delete,
  EmojiTransportation,
  DepartureBoard
} from '@mui/icons-material';
import { Upload, Add } from "../../images/icons"
import RegionDialog from "../../components/Facility/ParkingFacilityDialog";

const initFilter = {
  order: "asc",
  sort: "type",
  keyword: "",
  amount: 5,
  skip: 0,
}

const ParkingFacility = () => {
  const { t, openDialog, closeDialog, openSnackbar, openWarningDialog, authedApi } = useContext(GlobalContext);
  const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);
  const navigate = useNavigate();

  const [parkingFacilityList, setParkingFacilityList] = React.useState([]);
  const actionCondition = (action) => (row) => canAccessAction("parking-facility", action);

  // 預先載入的 region 資料
  const [allRegions, setAllRegions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

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

  const getParkingFacilityList = async () => {
    try {
      setLoading(true);
      let { data, total } = await authedApi.parkingFacilities.getParkingFacilities({
        amount: filter.amount,
        skip: filter.skip,
        // keyword: filter.keyword,
        // order: filter.order,
        // sort: filter.sort
      })

      const _rows = data.map(a => ({ ...a, _id: a.parkingFacilityId }))
      setParkingFacilityList(_rows)
      setTotal(total)
    } catch (error) {
      console.error('載入 ParkingFacility 資料時發生錯誤:', error);
      openSnackbar({
        severity: "error",
        message: t("error-thing", { thing: t("loading") })
      });
    } finally {
      setLoading(false);
    }
  };


  React.useEffect(() => {
    getAllRegions();
    getParkingFacilityList();
  }, [filter]);

  // 取得 region 名稱的輔助函式
  const getRegionName = (regionId) => {
    const region = allRegions.find(r => r.id === regionId);
    return region ? region.name : regionId;
  };

  const openEditParkingFacilityDialog = (data) => {
    openDialog({
      title: t("edit-thing", { thing: t("parking-facility") }),
      section: <RegionDialog onConfirm={handleEditParkingFacility} data={data} allRegions={allRegions} />
    })
  }

  const openAddParkingFacilityDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("parking-facility") }),
      section: <RegionDialog onConfirm={handleAddParkingFacility} allRegions={allRegions} />
    })
  }

  const handleEditParkingFacility = async (data) => {
    if (!data.regionId) {
      openSnackbar({
        severity: "warning",
        message: t("notice.select", { thing: t("factory") })
      });
      return;
    }

    let res = await authedApi.parkingFacilities.patchUpdateParkingFacility({
      id: data.parkingFacilityId,
      data: {
        "RegionId": data.regionId || null,
        "Name": data.name,
        "Description": data.description
      }
    });

    getParkingFacilityList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("edit") })
    })
  }

  const handleAddParkingFacility = async (data) => {
    if (!data.regionId) {
      openSnackbar({
        severity: "warning",
        message: t("notice.select", { thing: t("factory") })
      });
      return;
    }

    let res = await authedApi.parkingFacilities.postCreateParkingFacility({
      data: {
        "RegionId": data.regionId || null,
        "Name": data.name,
        "Description": data.description
      }
    })

    if (!res.success) {
      openSnackbar({
        severity: "error",
        message: t("error-thing", { thing: t("add") })
      })
      return;
    }

    getParkingFacilityList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("add") })
    })
  }

  const handleDeleteParkingFacility = async data => {
    try {
      await authedApi.parkingFacilities.deleteParkingFacility({ id: data.parkingFacilityId })
      getParkingFacilityList()
      closeDialog()
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      })
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
      onConfirm: () => handleDeleteParkingFacility(data)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("parking-facility")}
        rows={parkingFacilityList}
        columns={[
          //   { key: 'facilityId', label: t('facilityId') },
          {
            key: 'regionId',
            label: t('factory'),
            render: (value) => {
              const region = allRegions.find(r => r.regionId === value);
              return region ? region.name : value;
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
        // onSearchClick={getParkingFacilityList}
        // onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter(prevFilter => ({ ...prevFilter, skip: page * prevFilter.amount }))}
        onRowsPerPageChange={(limit) => setFilter(prevFilter => ({ ...prevFilter, skip: 0, amount: limit }))}
        // onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        
        toolbarActions={[
          { name: t('add'), condition: actionCondition("create"), onClick: openAddParkingFacilityDialog, icon: <Add /> },
          // { name: t('upload'), onClick: openImportUserDialog, icon: <Upload /> },
        ]}
        rowActions={[
          { name: t('parking-floor'), onClick: (e, row) => navigate(`/parking-floor/${row._id}`), icon: <EmojiTransportation /> },
          { name: t('parking-occupancy'), onClick: (e, row) => navigate(`/parking-occupancy/${row._id}`), icon: <DepartureBoard /> },
          { name: t('edit'), condition: actionCondition("update"), onClick: (e, row) => openEditParkingFacilityDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), condition: actionCondition("delete"), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}

export default ParkingFacility;