import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table, Image } from "../../components/common";
// import { Add } from "../../images/icons";
import {
  // BorderColorSharp,
  // Delete,
  // Ballot,
  // History,
  TimeToLeave
} from '@mui/icons-material';
import { host } from "../../utils/api/axios";
import Vehicle from "../../components/vehicle/Vehicle";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";
import { DateRangePicker } from 'rsuite';

const NAME = "abnormal-facility-record";

const AbnormalRecordInstant = () => {
  const { t, authedApi, openDialog,
    // closeDialog, openSnackbar, openWarningDialog,
  } = useContext(GlobalContext);
  // const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [AbnormalRecordInstantList, setAbnormalRecordInstantList] = React.useState([]);
  const [filter, setFilter] = useFilter(NAME);

  // const navigate = useNavigate();

  React.useEffect(() => {
    getAbnormalRecordRecords()
  }, [filter])

  const getAbnormalRecordRecords = async () => {
    const { data, total, success } = await authedApi.record.getAbnormalRecordRecords(filter);
    const _rows = data.map(a => {
      const _eventImageSrc = `${host}/api/v1/Image/${a.eventImageFileId}`;
      const _snapshotImageSrc = `${host}/api/v1/Image/${a.snapshotImageFileId}`;
      return ({
        ...a,
        _id: a.parkingAbnormalRecordId,
        _type: t(`TYPE.${a.type}`),
        _eventImage: a.eventImageFileId && <Image name={t('event-image')} src={_eventImageSrc} />,
        _snapshotImage: a.snapshotImageFileId && <Image name={t('snapshot-image')} src={_snapshotImageSrc} />,
      })
    });

    if (success) {
      setAbnormalRecordInstantList(_rows);
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
        rows={AbnormalRecordInstantList}
        columns={[
          { key: 'plateNumber', label: t('plate-number'), sortable: false },
          { key: 'status', label: t('status'), sortable: false },
          { key: '_eventImage', label: t('event-image'), sortable: false },
          { key: '_snapshotImage', label: t('snapshot-image'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        toolbarFilters={<>
          <DateRangePicker
            style={{ flexShrink: 0 }}
            cleanable={false}
            placement="bottomEnd"
            fullWidth
            format="MM/dd/yyyy hh:mm aa"
            value={[new Date(filter.startTime), new Date(filter.endTime)]} onChange={([startTime, endTime]) => setFilter({
              ...filter,
              startTime,
              endTime
            })} />
          <FormControl sx={{ ml: 2, flexShrink: 0 }}>
            <InputLabel>{t("type")}</InputLabel>
            <Select
              size="small"
              value={filter.type}
              label={t("type")}
              onChange={e => setFilter({
                ...filter,
                type: e.target.value
              })}
            >
              {/* <MenuItem value="">All</MenuItem> */}
              <MenuItem value="in">{t("TYPE.IN")}</MenuItem>
              <MenuItem value="out">{t("TYPE.OUT")}</MenuItem>
            </Select>
          </FormControl></>}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        // onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        // toolbarActions={[]}
        rowActions={[
          { name: t('vehicle-data'), onClick: (e, row) => openVehicleDialog(row.plateNumber), icon: <TimeToLeave /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default AbnormalRecordInstant;