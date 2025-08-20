import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table, Image } from "../../components/common";
import { useParams, useNavigate } from "react-router-dom";
// import { Add } from "../../images/icons";
import { useLocation } from "react-router";
import {
  LocalParking
} from '@mui/icons-material';
// import { host } from "../../utils/api/axios";
// import Vehicle from "../../components/vehicle/Vehicle";
// import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";
import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";

const NAME = "parking-floor";

const ParkingFloor = () => {
  const { t, authedApi,
    // openDialog,
    // closeDialog,
    // openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const { parkingFacilityId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [filter, setFilter] = useFilter(NAME);

  const [ParkingFloorList, setParkingFloorList] = React.useState([]);
  const lastPage = location.pathname.split("/")[1];

  React.useEffect(() => {
    getParkingFloors()
  }, [filter])

  const getParkingFloors = async () => {
    const { data, total, success } = await authedApi.parkingFloors.getParkingFloors({ ...filter, parkingFacilityId });

    const _rows = data.map(a => {

      return ({
        ...a,
        _id: a.parkingFloorId,
      })
    });

    if (success) {
      setParkingFloorList(_rows);
      setTotal(total);
    }

  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t(NAME)}
        prevPages={[
          { name: t("parking-facility"), path: `/#/parking-facility` }
        ]}
        rows={ParkingFloorList}
        columns={[
          { key: 'floorName', label: t('name'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        paginable={false}
        // order={filter.order}
        // sort={filter.sort}
        // rowsPerPage={filter.amount}
        // page={filter.page}
        // total={total}
        // onSearchClick={getUsageRecordHistory}
        // onClearClick={() => setFilter(initFilter)}
        // onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        // onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        // onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        // onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        // toolbarActions={[]}
        rowActions={[
          { name: t('parking-space'), onClick: (e, row) => navigate(`/parking-space/${parkingFacilityId}/${row._id}`), icon: <LocalParking /> },

        ]}
      // dense
      />
    </Paper>
  );
}


export default ParkingFloor;