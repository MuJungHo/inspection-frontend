import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table, Image, TextField } from "../../components/common";
// import { Add } from "../../images/icons";
import {
  BorderColorSharp,
  // Delete,
  // Ballot,
  History,
  TimeToLeave
} from '@mui/icons-material';
import { host } from "../../utils/api/axios";
import Vehicle from "../../components/vehicle/Vehicle";
import { DateRangePicker } from 'rsuite';
import ManualPlateNumberDialog from "../../components/report/ManualPlateNumberDialog";

import { useFilter } from "../../hooks/useFilter";
import ParkingRecordFilter from "../../components/report/ParkingRecordFilter";

const NAME = "parking-record";

const UsageRecordRecord = () => {
  const { t, authedApi, openDialog,
    closeDialog, openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  // const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter, clearFilter] = useFilter(NAME);

  const [ParkingRecordList, setParkingRecordList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getParkingRecord();
  }, [filter])

  const getParkingRecord = async () => {
    const { data, total, success } = await authedApi.record.getParkingRecord(filter);

    const _data = data.map(async a => {
      return ({
        ...a,
        _id: a.parkingRecordId,
      })
    });
    const _rows = await Promise.all(_data)

    if (success) {
      setParkingRecordList(_rows);
      setTotal(total);
    }

  }

  const openVehicleDialog = (plateNumber) => {
    openDialog({
      title: t("vehicle-data"),
      maxWidth: "sm",
      fullWidth: true,
      section: <Vehicle onConfirm={() => { }} plateNumber={plateNumber} />
    })
  }

  const openManualPlateNumberDialog = (usageRecord) => {
    openDialog({
      title: t('edit-thing', { thing: t("parking-record") }),
      maxWidth: "sm",
      fullWidth: true,
      section: <ManualPlateNumberDialog onConfirm={handleUpdatePlateNumber} usageRecord={usageRecord} />
    })
  }

  const handleUpdatePlateNumber = async (usageRecord) => {
    const { success } = await authedApi.record.patchUsageRecord({
      id: usageRecord.entryExitRecord?.entryRecordId,
      data: {
        PlateNUmber: usageRecord.plateNumber
      }
    });
    if (success) {
      closeDialog();
      getParkingRecord();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }
  }

  const handleConfirmFilter = (state) => {
    setFilter({

      amount: filter.amount,
      skip: filter.skip,
      page: filter.page,
      plateNumber: state.plateNumber,
      parkingSpaceName: state.parkingSpaceName,
      parkingFloorId: state.parkingFloorId,
      startTime: state.startTime,
      endTime: state.endTime
    })
    closeDialog()

  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("parking-record")}
        rows={ParkingRecordList}
        columns={[
          { key: 'plateNumber', label: t('plate-number'), sortable: false },
          { key: 'entryTime', label: t('entry-time'), sortable: false },
          { key: 'exitTime', label: t('exit-time'), sortable: false },
          { key: 'duration', label: t('parking-duration'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        toolbarFilters={<ParkingRecordFilter filter={filter} onConfirm={handleConfirmFilter} />}
        // onSearchClick={getParkingRecord}
        onClearClick={() => clearFilter()}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        // onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        // onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        // toolbarActions={[]}
        rowActions={[
        ]}
      // dense
      />
    </Paper>
  );
}


export default UsageRecordRecord;