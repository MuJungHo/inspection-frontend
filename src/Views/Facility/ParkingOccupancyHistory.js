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
import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";
import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";

const NAME = "parking-occupancy-history";

const ParkingOccupancyHistory = () => {
  const { t, authedApi,
    // openDialog,
    // closeDialog,
    // openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const { parkingOccupancyId, parkingFacilityId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [filter, setFilter] = useFilter(NAME);

  const [ParkingOccupancyList, setParkingOccupancyList] = React.useState([]);
  const lastPage = location.pathname.split("/")[1];

  React.useEffect(() => {
    getParkingOccupancyHistory()
  }, [filter])

  const getParkingOccupancyHistory = async () => {
    const { data, total, success } = await authedApi.parkingOccupancys.getParkingOccupancyHistory({ ...filter, parkingOccupancyId });

    const _rows = data.map(a => {

      return ({
        ...a,
        _id: a.parkingOccupancyHistoryId,
        _createAt: dayjs(a.createAt).format("YYYY/MM/DD HH:mm")
      })
    });

    if (success) {
      setParkingOccupancyList(_rows);
      setTotal(total);
    }

  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t(NAME)}
        prevPages={[
          { name: t("parking-facility"), path: `/#/parking-facility` },
          { name: t("parking-occupancy"), path: `/#/parking-occupancy/${parkingFacilityId}` }
        ]}
        rows={ParkingOccupancyList}
        columns={[
          { key: 'occupiedSpaces', label: t('occupied-space'), sortable: false },
          { key: 'createBy', label: t('user'), sortable: false },
          { key: '_createAt', label: t('create-time'), sortable: false },
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
        rowActions={[]}
      // dense
      />
    </Paper>
  );
}


export default ParkingOccupancyHistory;