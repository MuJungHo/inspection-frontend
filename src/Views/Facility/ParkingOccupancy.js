import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table, Image } from "../../components/common";
import { useParams, useNavigate } from "react-router-dom";
// import { Add } from "../../images/icons";
import { useLocation } from "react-router";
import {
  LocalParking,
  ManageSearch,
  BorderColorSharp,
  Build
} from '@mui/icons-material';
// import { host } from "../../utils/api/axios";
// import Vehicle from "../../components/vehicle/Vehicle";
import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";
import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";
import ParkingOccupancyDialog from "../../components/Facility/ParkingOccupancyDialog";

const NAME = "parking-occupancy";

const ParkingOccupancy = () => {
  const { t, authedApi,
    openDialog,
    closeDialog,
    openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const { parkingFacilityId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [filter, setFilter, clearFilter] = useFilter(NAME);

  const [ParkingOccupancyList, setParkingOccupancyList] = React.useState([]);
  const lastPage = location.pathname.split("/")[1];

  React.useEffect(() => {
    getParkingOccupancys()
  }, [filter])

  const getParkingOccupancys = async () => {
    const { data, total, success } = await authedApi.parkingOccupancys.getParkingOccupancys({ ...filter, parkingFacilityId });

    const _rows = data.map(a => {

      return ({
        ...a,
        _id: a.parkingOccupancyId,
      })
    });

    if (success) {
      setParkingOccupancyList(_rows);
      setTotal(total);
    }

  }

  const openUpdateParkingOccupancyDialog = (parkingOccupancy) => {
    const handleUpdateParkingOccupancy = async ({ occupiedSpaces }) => {
      const { success } = await authedApi.parkingOccupancys.patchUpdateParkingOccupancy({
        parkingOccupancyId: parkingOccupancy.parkingOccupancyId,
        data: { occupiedSpaces: Number(occupiedSpaces) }
      })
      if (success) {
        closeDialog();
        getParkingOccupancys();
        openSnackbar({
          severity: "success",
          message: t("success-thing", { thing: t("edit") })
        });
      }
    }
    openDialog({
      title: t("edit-thing", { thing: t("parking-occupancy") }),
      maxWidth: "sm",
      fullWidth: true,
      section: <ParkingOccupancyDialog parkingOccupancy={parkingOccupancy} onConfirm={handleUpdateParkingOccupancy} />
    })

  }


  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t(NAME)}
        prevPages={[
          { name: t("parking-facility"), path: `/#/parking-facility` }
        ]}
        rows={ParkingOccupancyList}
        columns={[
          { key: 'occupiedSpaces', label: t("occupied-spaces"), sortable: false },
          { key: 'totalSpaces', label: t("thing-amount", { "thing": t("parking-space") }), sortable: false },
          { key: 'vehicleType', label: t('vehicle-type'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        paginable={false}
        toolbarFilters={<div style={{ width: '100%', display: 'flex' }}>
          <DateRangePicker
            cleanable={false}
            placement="bottomEnd"
            format="MM/dd/yyyy hh:mm aa"
            value={[new Date(filter.startTime), new Date(filter.endTime)]}
            onChange={([startTime, endTime]) =>
              // console.log([startTime, endTime])
              setFilter({
                ...filter,
                startTime,
                endTime
              })
            } />
        </div>}
        onClearClick={() => clearFilter()}
        rowActions={[
          { name: t("edit-thing", { thing: t("parking-occupancy") }), onClick: (e, row) => openUpdateParkingOccupancyDialog(row), icon: <BorderColorSharp /> },
          { name: t('parking-occupancy-history'), onClick: (e, row) => navigate(`/parking-occupancy-history/${parkingFacilityId}/${row._id}`), icon: <ManageSearch /> },
          { name: t('parking-occupancy-adjustmentlog'), onClick: (e, row) => navigate(`/parking-occupancy-adjustmentlog/${parkingFacilityId}/${row._id}`), icon: <Build /> },
        ]}
      // dense
      />
    </Paper>
  );
}


export default ParkingOccupancy;