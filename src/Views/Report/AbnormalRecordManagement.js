import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table, Image } from "../../components/common";
// import { Add } from "../../images/icons";
import {
  // BorderColorSharp,
  // Delete,
  // Ballot,
  History,
  TimeToLeave,
  Handyman
} from '@mui/icons-material';
import { host } from "../../utils/api/axios";
import Vehicle from "../../components/vehicle/Vehicle";
import { DateRangePicker } from 'rsuite';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ManualRecordDialog from "../../components/report/ManualRecordDialog";
import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";

const NAME = "abnormal-record-management";

const AbnormalRecordRecord = () => {
  const { t, authedApi, openDialog,
    closeDialog,
    openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  // const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = useFilter(NAME);

  const [AbnormalRecordRecordList, setAbnormalRecordRecordList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getAbnormalRecordRecords()
  }, [filter])

  const getAbnormalRecordRecords = async () => {
    const { data, total, success } = await authedApi.record.getAbnormalRecordRecords(filter);

    const _data = data.map(async a => {
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

  const openMaunalRecordDialog = (AbnormalRecord) => {
    openDialog({
      title: t("manual-correction"),
      maxWidth: "sm",
      fullWidth: true,
      section: <ManualRecordDialog onConfirm={handlePostManualRecordAbnormalRecord} AbnormalRecord={AbnormalRecord} />
    })
  }

  const handlePostManualRecordAbnormalRecord = async (state) => {
    const { success } = await authedApi.record.postManualRecordAbnormalRecord({
      abnormalRecordId: state.parkingAbnormalRecordId,
      data: {
        "Type": state.Type,
        "Time": state.Time
      }
    });

    if (success) {
      getAbnormalRecordRecords();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("add") })
      });
    }
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t(NAME)}
        rows={AbnormalRecordRecordList}
        columns={[
          { key: '_type', label: t('type'), sortable: false },
          { key: 'status', label: t('status'), sortable: false },
          { key: 'plateNumber', label: t('plate-number'), sortable: false },
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
          <div style={{ flex: 1 }} />
          <FormControl >
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
              <MenuItem value="overtime">{t("TYPE.OVERTIME")}</MenuItem>
              <MenuItem value="unauthorized">{t("TYPE.UNAUTHORIZED")}</MenuItem>
            </Select>
          </FormControl>
        </div>}
        onSearchClick={getAbnormalRecordRecords}
        onClearClick={() => setFilter(initFilters[NAME])}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[]}
        rowActions={[
          { name: t('vehicle-data'), onClick: (e, row) => openVehicleDialog(row.plateNumber), icon: <TimeToLeave /> },
          { name: t('abnormal-record-history'), onClick: (e, row) => navigate(`/abnormal-record-management/abnormal-record-history/${row._id}`), icon: <History /> },
          { name: t('manual-correction'), onClick: (e, row) => openMaunalRecordDialog(row), icon: <Handyman /> },
        ]}
      // dense
      />
    </Paper>
  );
}


export default AbnormalRecordRecord;