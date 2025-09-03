import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { green, red } from '@mui/material/colors';
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table } from "../../components/common";
import { Add } from "../../images/icons";
import {
  BorderColorSharp,
  Delete,
  CheckCircle,
  Cancel,
  History,
} from '@mui/icons-material';
import SettingSection from "../../components/system/SettingSection";
import dayjs from "dayjs";

const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const NAME = "setting";

const Setting = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog, } = useContext(GlobalContext);
  const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);

  const [list, setList] = React.useState([]);
  const actionCondition = (action) => (row) => canAccessAction("user", action);
  const navigate = useNavigate();

  React.useEffect(() => {
    getList()
  }, [filter])

  const getList = async () => {
    const { data, total, success } = await authedApi.systemSetting.getSystemSettings(filter);

    const _rows = data.map(a => ({
      ...a, _id: a.settingId,
      _createAt: dayjs(a.createAt).format("YYYY/MM/DD HH:mm"),
      _updateAt: dayjs(a.updateAt).format("YYYY/MM/DD HH:mm"),

    }));

    if (success) {
      setList(_rows);
      setTotal(total);
    }

  }

  const openAddDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("system-setting") }),
      maxWidth: "sm",
      // fullWidth: true,
      section: <SettingSection onConfirm={handleAdd} />
    });
  }

  const handleAdd = async (state) => {
    const setting = {
      name: state.name,
      content: state.content
    };
    const { success } = await authedApi.systemSetting.postCreateSystemSetting({ data: setting });
    if (success) {
      getList();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("add") })
      });
    }
  }

  const openEditDialog = (setting) => {
    openDialog({
      title: t("edit-thing", { thing: t("system-setting") }),
      maxWidth: "sm",
      section: <SettingSection onConfirm={handleEdit} setting={setting} />
    });
  }
  const handleEdit = async (state) => {
    const setting = {
      name: state.name,
      content: state.content
    };
    // console.log(state)
    const { success } = await authedApi.systemSetting.pathchUpdateSystemSetting({ id: state._id, data: setting });

    if (success) {
      getList();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }
  }
  const handleDelete = async setting => {
    const { success } = await authedApi.systemSetting.deleteSystemSetting({ id: setting.settingId });

    if (success) {
      getList();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    }
  }

  const handleSetWarningDialog = (setting) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: setting.name }),
      onConfirm: () => handleDelete(setting)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("system-setting")}
        rows={list}
        columns={[
          { key: 'content', label: t('content'), sortable: false },
          { key: 'name', label: t('name'), sortable: false },
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
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), condition: actionCondition("add"), onClick: openAddDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('edit'), condition: actionCondition("update"), onClick: (e, row) => openEditDialog(row), icon: <BorderColorSharp /> },
          { name: t('history'), onClick: (e, row) => navigate(`/system-setting-history/${row._id}`), icon: <History /> },
          { name: t('delete'), condition: actionCondition("delete"), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default Setting;