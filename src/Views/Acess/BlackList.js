import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table, Image } from "../../components/common";
import { Add } from "../../images/icons";
import {
  // BorderColorSharp,
  Delete,
  // Ballot,
  History,
  TimeToLeave
} from '@mui/icons-material';
import Vehicle from "../../components/vehicle/Vehicle";
import BlackListSection from "../../components/vehicle/BlackListSection";
import { host } from "../../utils/api/axios";
import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";
import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";

const NAME = "access-blacklist";

const BlackList = () => {
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
    const { data, total, success } = await authedApi.vehicle.getFlaggedVehicleBlacklist(filter);

    const _rows = data.map(a => {
      return {
        ...a,
        _id: a.flaggedVehicleId,
        _createAt: dayjs(a.createAt).format("YYYY/MM/DD HH:mm"),
        _updateAt: dayjs(a.updateAt).format("YYYY/MM/DD HH:mm"),
      }
    });

    if (success) {
      setList(_rows);
      setTotal(total);
    }
  }

  const openAddDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("access-blacklist") }),
      maxWidth: "sm",
      section: <BlackListSection onConfirm={handleAdd} />
    });
  }

  const handleAdd = async (state) => {
    const blacklist = {
      plateNumber: state.plateNumber,
      reason: state.reason,
      FlaggedType: "BlackList",
      VehicleType: "CAR"
    };
    const { success } = await authedApi.vehicle.postFlaggedVehicle({ data: blacklist });
    if (success) {
      getList();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("add") })
      });
    }
  }

  const handleDelete = async blacklist => {
    const { success } = await authedApi.vehicle.deleteFlaggedVehicle({ id: blacklist.flaggedVehicleId });

    if (success) {
      getList();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    }
  }

  const handleSetWarningDialog = (blacklist) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: blacklist.plateNumber }),
      onConfirm: () => handleDelete(blacklist)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t(NAME)}
        rows={list}
        columns={[
          { key: 'plateNumber', label: t('plate-number'), sortable: false },
          { key: 'reason', label: t('description'), sortable: false },
          { key: '_createAt', label: t('create-time'), sortable: false },
          { key: 'createBy', label: t('creator'), sortable: false },
          { key: '_updateAt', label: t('update-time'), sortable: false },
          { key: 'updateBy', label: t('updater'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getList}
        onClearClick={() => setFilter(initFilters[NAME])}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        
        toolbarActions={[
          { name: t('add'), onClick: openAddDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default BlackList;