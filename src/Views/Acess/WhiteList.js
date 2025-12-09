import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table, Image } from "../../components/common";
// import { Add } from "../../images/icons";
// import {
//   BorderColorSharp,
//   Delete,
//   Ballot,
//   History,
//   TimeToLeave
// } from '@mui/icons-material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import Vehicle from "../../components/vehicle/Vehicle";
// import BlackListSection from "../../components/vehicle/BlackListSection";
// import { host } from "../../utils/api/axios";
import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";
// import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";

const NAME = "access-list";

const AccessList = () => {
  const { t, authedApi, 
    
    // openDialog, closeDialog, openSnackbar, openWarningDialog,
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
    const { data, total, success } = await authedApi.vehicle.getVehicleData(filter);

    const _rows = data.map(a => {
      return {
        ...a,
        _id: a.vehicleId,
        _updateTime: dayjs(a.updateTime).format("YYYY/MM/DD HH:mm"),
        _owerName: a.owner?.name
      }
    });

    if (success) {
      setList(_rows);
      setTotal(total);
    }
  }
  
  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t(NAME)}
        rows={list}
        columns={[
          { key: 'plateNumber', label: t('plate-number'), sortable: false },
          { key: 'vehicleType', label: t('vehicle-type'), sortable: false },
          { key: '_owerName', label: t('owner'), sortable: false },
          { key: '_updateTime', label: t('update-time'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        toolbarFilters={<FormControl sx={{ ml: 2, flexShrink: 0 }} >
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
            <MenuItem value="CAR">CAR</MenuItem>
            <MenuItem value="SCOOTER">SCOOTER</MenuItem>
          </Select>
        </FormControl>}
        onSearchClick={getList}
        onClearClick={() => setFilter(initFilters[NAME])}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, plateNumber: keyword })}
        toolbarActions={[
          // { name: t('add'), onClick: openAddDialog, icon: <Add /> },
        ]}
        rowActions={[
          //   { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default AccessList;