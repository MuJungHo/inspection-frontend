import React, { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table, Image } from "../../components/common";
// import { Add } from "../../images/icons";
import {
  BorderColorSharp,
  // Delete,
  // Ballot,
  // History,
  TimeToLeave,
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
import dayjs from "dayjs";
import PatchAbnormalRecordDialog from "../../components/report/PatchAbnormalRecordDialog";

const NAME = "violation-overtime";

const AbnormalRecordInstant = () => {
  const { t, authedApi, openDialog,
    // closeDialog, openSnackbar, openWarningDialog,
  } = useContext(GlobalContext);
  // const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [list, setList] = React.useState([]);
  const [filter, setFilter, clearFilter] = useFilter(NAME);

  // const navigate = useNavigate();

  React.useEffect(() => {
    getList()
  }, [filter])

  const getList = async () => {
    const { data, total, success } = await authedApi.record.getAbnormalRecordRecords(filter);
    const _rows = data.map(a => {
      const _eventImageSrc = `${host}/api/v1/Image/${a.eventImageFileId}`;
      const _snapshotImageSrc = `${host}/api/v1/Image/${a.snapshotImageFileId}`;
      return ({
        ...a,
        _id: a.parkingAbnormalRecordId,
        _type: t(`TYPE.${a.type}`),
        _createAt: dayjs(a.timestamp).format("YYYY/MM/DD HH:mm"),
        _eventImage: a.eventImageFileId && <Image name={t('event-image')} src={_eventImageSrc} />,
        _snapshotImage: a.snapshotImageFileId && <Image name={t('snapshot-image')} src={_snapshotImageSrc} />,
      })
    });

    if (success) {
      setList(_rows);
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

  const openEditDialog = (parkingAbnormalRecord) => {
    // console.log(parkingAbnormalRecord)
    const handleEdit = async (state) => {

      const { success } = await authedApi.record.patchAbnormalRecord({ abnormalRecordId: parkingAbnormalRecord.parkingAbnormalRecordId, data: state });

      if (success) {
        getList();
        closeDialog();
        openSnackbar({
          severity: "success",
          message: t("success-thing", { thing: t("edit") })
        });
      }
    }
    openDialog({
      title: t("edit-thing", { thing: t("status") }),
      maxWidth: "sm",
      fullWidth: true,
      section: <PatchAbnormalRecordDialog onConfirm={handleEdit} />
    });
  }


  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t(NAME)}
        rows={list}
        columns={[
          { key: 'plateNumber', label: t('plate-number'), sortable: false },
          { key: '_type', label: t('type'), sortable: false },
          { key: 'status', label: t('status'), sortable: false },
          { key: '_createAt', label: t('create-time'), sortable: false },
          { key: '_eventImage', label: t('event-image'), sortable: false },
          { key: '_snapshotImage', label: t('snapshot-image'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        toolbarFilters={
          <div style={{ width: '100%', display: 'flex' }}>
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
              }
            />
            <FormControl sx={{ ml: 2 }} >
              <InputLabel>{t("status")}</InputLabel>
              <Select
                size="small"
                value={filter.status}
                label={t("status")}
                onChange={e => setFilter({
                  ...filter,
                  status: e.target.value
                })}
              >
                <MenuItem value="new">new</MenuItem>
                <MenuItem value="ignore">ignore</MenuItem>
                <MenuItem value="done">done</MenuItem>
              </Select>
            </FormControl>
          </div>
        }
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onClearClick={() => clearFilter()}
        rowActions={[
          { name: t('edit'), onClick: (e, row) => openEditDialog(row), icon: <BorderColorSharp /> },
          { name: t('vehicle-data'), onClick: (e, row) => openVehicleDialog(row.plateNumber), icon: <TimeToLeave /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default AbnormalRecordInstant;