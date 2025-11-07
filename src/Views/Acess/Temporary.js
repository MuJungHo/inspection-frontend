import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table, Image } from "../../components/common";
import { Add } from "../../images/icons";
import {
  // BorderColorSharp,
  // Delete,
  // Ballot,
  History,
  TimeToLeave
} from '@mui/icons-material';
import Vehicle from "../../components/vehicle/Vehicle";
import TemporarySection from "../../components/vehicle/TemporarySection";
import { host } from "../../utils/api/axios";
import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";
import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";

const NAME = "access-temporary";

const Temporary = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog,
  } = useContext(GlobalContext);
  // const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = useFilter(NAME);
  const [list, setList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getList()
  }, [filter])

  const getList = async () => {
    const { data, total, success } = await authedApi.vehicle.getTemporaryVehicleEntryRecord(filter);

    const _rows = data.map(a => {
      return {
        ...a,
        _id: a.temporaryVehicleId,
        _time: dayjs(a.time).format("YYYY/MM/DD HH:mm"),
      }
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

  const openAddDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("access-temporary") }),
      maxWidth: "sm",
      // fullWidth: true,
      section: <TemporarySection onConfirm={handleAdd} />
    });
  }

  const handleAdd = async (state) => {
    // const temporary = {
    //   plateNumber: state.plateNumber,
    //   reason: state.reason,
    //   FlaggedType: "BlackList",
    //   VehicleType: "CAR"
    // };
    const { success } = await authedApi.vehicle.postTemporaryVehicle({ data: state });
    if (success) {
      getList();
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
        rows={list}
        columns={[
          { key: 'plateNumber', label: t('plate-number'), sortable: false },
          { key: 'ownerName', label: t('thing-name', { thing: t('owner') }), sortable: false },
          { key: '_time', label: t('create-time'), sortable: false },
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
        onSearchClick={getList}
        onClearClick={() => setFilter(initFilters[NAME])}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), onClick: openAddDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('vehicle-data'), onClick: (e, row) => openVehicleDialog(row.plateNumber), icon: <TimeToLeave /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default Temporary;