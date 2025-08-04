import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table, Image } from "../../components/common";
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
// import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";

const NAME = "usage-record-record";

const UsageRecordRecord = () => {
  const { t, authedApi, openDialog,
    closeDialog, openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  // const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = useFilter(NAME);

  const [AbnormalRecordRecordList, setAbnormalRecordRecordList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getUsageRecordByTime();
  }, [filter])

  const getUsageRecordByTime = async () => {
    const { data, total, success } = await authedApi.record.getUsageRecordByTime(filter);

    const _data = data.map(async a => {
      const _entryImageSrc = `${host}/api/v1/Image/${a.entryExitRecord.entryImageFileId}`;
      const _entryPlateImageSrc = `${host}/api/v1/Image/${a.entryExitRecord.entryImagePlateFileId}`;
      const _exitImageSrc = `${host}/api/v1/Image/${a.entryExitRecord.exitImageFileId}`;
      const _exitPlateImageSrc = `${host}/api/v1/Image/${a.entryExitRecord.exitImagePlateFileId}`;
      return ({
        ...a,
        _id: a.parkingFacilityUsageRecordId,
        _entryTime: a.entryExitRecord?.entryTime,
        _entryImage: a.entryExitRecord.entryImageFileId && <Image name={t('entry-image')} src={_entryImageSrc} />,
        _entryPlateImage: a.entryExitRecord.entryImagePlateFileId && <Image name={t('entry-plate-image')} src={_entryPlateImageSrc} />,
        _exitTime: a.entryExitRecord?.exitTime,
        _exitImage: a.entryExitRecord.exitImageFileId && <Image name={t('exit-image')} src={_exitImageSrc} />,
        _exitPlateImage: a.entryExitRecord.exitImagePlateFileId && <Image name={t('exit-plate-image')} src={_exitPlateImageSrc} />,
        _parkingDuration: a.entryExitRecord?.parkingDuration
      })
    });
    const _rows = await Promise.all(_data)

    if (success) {
      setAbnormalRecordRecordList(_rows);
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
      title: t('edit-thing', { thing: t("usage-record-record") }),
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
      getUsageRecordByTime();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("usage-record-record")}
        rows={AbnormalRecordRecordList}
        columns={[
          { key: 'plateNumber', label: t('plate-number'), sortable: false },
          { key: '_entryTime', label: t('entry-time'), sortable: false },
          { key: '_entryImage', label: t('entry-image'), sortable: false },
          { key: '_entryPlateImage', label: t('entry-plate-image'), sortable: false },
          { key: '_exitTime', label: t('exit-time'), sortable: false },
          { key: '_exitImage', label: t('exit-image'), sortable: false },
          { key: '_exitPlateImage', label: t('exit-plate-image'), sortable: false },
          { key: '_parkingDuration', label: t('parking-duration'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        toolbarFilters={<div style={{ width: '100%', display: 'flex' }}>
          <DateRangePicker
            cleanable={false}
            placement="bottomEnd"
            format="MM/dd/yyyy hh:mm aa"
            value={[new Date(filter.startTime), new Date(filter.endTime)]} onChange={([startTime, endTime]) => setFilter({
              ...filter,
              startTime,
              endTime
            })} />
        </div>}
        // onSearchClick={getUsageRecordByTime}
        // onClearClick={() => setFilter(initFilters[NAME])}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        // onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        // onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        // toolbarActions={[]}
        rowActions={[
          { name: t('edit'), onClick: (e, row) => openManualPlateNumberDialog(row), icon: <BorderColorSharp /> },
          { name: t('usage-record-history'), onClick: (e, row) => navigate(`/usage-record-record/usage-record-history/${row._id}`), icon: <History /> },
          { name: t('vehicle-data'), onClick: (e, row) => openVehicleDialog(row.plateNumber), icon: <TimeToLeave /> },
        ]}
      // dense
      />
    </Paper>
  );
}


export default UsageRecordRecord;