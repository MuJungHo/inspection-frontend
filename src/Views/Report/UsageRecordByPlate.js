import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table, Image } from "../../components/common";
import { useParams } from "react-router-dom";
// import { Add } from "../../images/icons";
import { useLocation } from "react-router";
import {
  // BorderColorSharp,
  // Delete,
  TimeToLeave
} from '@mui/icons-material';
import { host } from "../../utils/api/axios";
import Vehicle from "../../components/vehicle/Vehicle";
import { DateRangePicker } from 'rsuite';
import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";

const NAME = "usage-record-by-plate";

const UsageRecordByPlate = () => {
  const { t, authedApi,
    openDialog,
    // closeDialog,
    // openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const { plateNumber } = useParams();
  const location = useLocation()

  const [filter, setFilter] = useFilter(NAME);
  const [UsageRecordList, setUsageRecordList] = React.useState([]);
  const lastPage = location.pathname.split("/")[1];

  React.useEffect(() => {
    getUsageRecordByPlate()
  }, [filter])

  const getUsageRecordByPlate = async () => {
    const { data, total, success } = await authedApi.record.getUsageRecordByPlate({ ...filter, plateNumber });

    const _rows = data.map(a => {
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

    if (success) {
      setUsageRecordList(_rows);
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

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t(NAME)}
        prevPages={[
          { name: t(lastPage), path: `/#/${lastPage}` }
        ]}
        rows={UsageRecordList}
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
        onSearchClick={getUsageRecordByPlate}
        onClearClick={() => setFilter(initFilters[NAME])}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[]}
        rowActions={[
          { name: t('vehicle-data'), onClick: (e, row) => openVehicleDialog(row.plateNumber), icon: <TimeToLeave /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default UsageRecordByPlate;