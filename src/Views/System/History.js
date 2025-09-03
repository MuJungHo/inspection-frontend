import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table, Image } from "../../components/common";
import { useParams, useNavigate } from "react-router-dom";
// import { Add } from "../../images/icons";
import { useLocation } from "react-router";
import {
  LocalParking
} from '@mui/icons-material';
// import { host } from "../../utils/api/axios";
// import Vehicle from "../../components/vehicle/Vehicle";
import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";
import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";

const NAME = "system-setting-history";
const SettingHistory = () => {
  const { t, authedApi,
    // openDialog,
    // closeDialog,
    // openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);

  const [total, setTotal] = React.useState(0);
  const { settingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [filter, setFilter] = useFilter(NAME);

  const [list, setList] = React.useState([]);
  const lastPage = location.pathname.split("/")[1];

  console.log(settingId)
  React.useEffect(() => {
    getSystemSettingHistory()
  }, [filter])

  const getSystemSettingHistory = async () => {
    const { data, total, success } = await authedApi.systemSetting.getSystemSettingHistoryById({ ...filter, settingId });

    const _rows = data.map(a => {

      return ({
        ...a,
        _id: a.settingHistoryId,
        _createAt: dayjs(a.createAt).format("YYYY/MM/DD HH:mm")
      })
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
        prevPages={[
          { name: t("system-setting"), path: `/#/system-setting` },
        ]}
        rows={list}
        columns={[
          { key: 'type', label: t('type'), sortable: false },
          { key: 'content', label: t('content'), sortable: false },
          { key: '_createAt', label: t('create-time'), sortable: false },
          { key: 'createBy', label: t('creator'), sortable: false }
        ]}
        checkable={false}
        filterable={false}
        paginable={false}
        rowActions={[]}
      // dense
      />
    </Paper>
  );
}


export default SettingHistory;