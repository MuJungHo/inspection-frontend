import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table } from "../../components/common";
import { useParams } from "react-router-dom";
// import { Add } from "../../images/icons";
import { useLocation } from "react-router";
import {
  // BorderColorSharp,
  // Delete,
  TimeToLeave
} from '@mui/icons-material';
import { config } from "../../utils/config";
import Vehicle from "../../components/vehicle/Vehicle";
import { DateRangePicker } from 'rsuite';


var startTime = new Date();
startTime.setHours(0, 0, 0, 0);

var endTime = new Date();
endTime.setHours(23, 59, 59, 999);

const initFilter = {
  startTime,
  endTime,
}

const imageStyle = {
  height: 32,
  cursor: 'pointer'
}

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

  const [filter, setFilter] = React.useState({ ...initFilter, plateNumber });
  const [UsageRecordList, setUsageRecordList] = React.useState([]);
  const host = `${config.apiProtocol}://${config.apiHost}${config.apiPort ? `:${config.apiPort}` : ''}`;
  const lastPage = location.pathname.split("/")[1];

  React.useEffect(() => {
    getUsageRecordByPlate()
  }, [filter])

  const getUsageRecordByPlate = async () => {
    const { data, total, success } = await authedApi.record.getUsageRecordByPlate(filter);

    const _rows = data.map(a => {
      const _entryImageSrc = `${host}/api/v1/Image/${a.entryExitRecord.entryImageFileId}`;
      const _entryPlateImageSrc = `${host}/api/v1/Image/${a.entryExitRecord.entryImagePlateFileId}`;
      const _exitImageSrc = `${host}/api/v1/Image/${a.entryExitRecord.exitImageFileId}`;
      const _exitPlateImageSrc = `${host}/api/v1/Image/${a.entryExitRecord.exitImagePlateFileId}`;

      return ({
        ...a,
        _id: a.parkingFacilityUsageRecordId,
        _entryTime: a.entryExitRecord?.entryTime,
        _entryImage: a.entryExitRecord.entryImageFileId && <img onClick={() => onImageDialg(t('entry-image'), _entryImageSrc)} style={imageStyle} src={_entryImageSrc} alt="" />,
        _entryPlateImage: a.entryExitRecord.entryImagePlateFileId && <img onClick={() => onImageDialg(t('entry-plate-image'), _entryPlateImageSrc)}  style={imageStyle} src={_entryPlateImageSrc} alt="" />,
        _exitTime: a.entryExitRecord?.exitTime,
        _exitImage: a.entryExitRecord.exitImageFileId && <img onClick={() => onImageDialg(t('exit-image'), _exitImageSrc)} style={imageStyle} src={_exitImageSrc} alt="" />,
        _exitPlateImage: a.entryExitRecord.exitImagePlateFileId && <img onClick={() => onImageDialg(t('exit-plate-image'), _exitPlateImageSrc)} style={imageStyle} src={_exitPlateImageSrc} alt="" />,
        _parkingDuration: a.entryExitRecord?.parkingDuration
      })
    });

    if (success) {
      setUsageRecordList(_rows);
      setTotal(total);
    }

  }

  const onImageDialg = (title, src) => {
    openDialog({
      title,
      maxWidth: "sm",
      fullWidth: true,
      section: <img src={src} alt="" />
    })
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
        title={t("entry-history")}
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
        onClearClick={() => setFilter(initFilter)}
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