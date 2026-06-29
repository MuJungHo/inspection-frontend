import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Paper, Table, Image } from "../components/common";
import { useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ItemDialog from "../components/Item/ItemDialog";

const User = () => {
  const { authedApi, t, openDialog, closeDialog, openSnackbar, openWarningDialog } = useContext(GlobalContext);
  const { pointId } = useParams();

  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    getList()
  }, [])
  const getList = async () => {
    const { data, success } = await authedApi.getAllItems({ pointId });
    const _rows = data.map(a => ({
      ...a, _id: a.id,
      _isReportable: a.isReportable ? t('yes') : t('no'),
      _options: a.options?.length
    }));

    if (success) {
      setList(_rows);
    }
  }
  const handleOpenCreateDialog = async () => {
    openDialog({
      title: t("thing-add", { thing: t('inspection-item') }),
      maxWidth: "sm",
      fullWidth: true,
      component: <ItemDialog onConfirm={handleCreate} />
    });
  }

  const handleOpenEditDialog = async (row) => {
    openDialog({
      title: t("thing-edit", { thing: t('inspection-item') }),
      maxWidth: "sm",
      fullWidth: true,
      component: <ItemDialog onConfirm={handleEdit} item={row} />
    });
  }

  const handleEdit = async (state) => {
    try {
      await authedApi.putUpdateItem({
        data: state,
        itemId: state.id
        // {
        //   pointId,
        //   name: '監視器(CCTV)畫面確認',
        //   dataType: 'boolean',
        //   numerical: '',
        //   operator: '',
        //   options: []
        // }
      });
      openSnackbar({
        severity: "success",
        message: t("thing-success", { thing: t("edit") })
      });
    } catch (e) {
      openSnackbar({
        severity: "error",
        message: t("thing-failed", { thing: t("edit") })
      });
    }
    closeDialog();
    getList();
  }
  const handleCreate = async (state) => {
    try {
      await authedApi.postAddItem({
        data: {
          ...state,
          pointId
        }
        // {
        //   pointId,
        //   name: '監視器(CCTV)畫面確認',
        //   dataType: 'boolean',
        //   numerical: '',
        //   operator: '',
        //   options: []
        // }
      });
      openSnackbar({
        severity: "success",
        message: t("thing-success", { thing: t("add") })
      });
    } catch (e) {
      openSnackbar({
        severity: "error",
        message: t("thing-failed", { thing: t("add") })
      });
    }
    closeDialog();
    getList();
  }
  const handleOpenDeleteDialog = (item) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: item.name }),
      onConfirm: () => handleDelete(item)
    })
  }

  const handleDelete = async item => {
    await authedApi.deleteItem({ itemId: item.id })
    getList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("thing-success", { thing: t("delete") })
    })
  }

  return (<Paper sx={{ margin: 3 }}>
    <Table
      title={t("inspection-item")}
      prevPages={[
        { name: t("inspection-point"), path: "/#/point" }
      ]}
      rows={list}
      checkable={false}
      columns={[
        { key: 'name', label: t('name'), sortable: false },
        { key: 'dataType', label: t('type'), sortable: false },
        { key: 'operator', label: t('_operator'), sortable: false },
        { key: 'numerical', label: t('numerical'), sortable: false },
        { key: '_options', label: t('_options'), sortable: false },
      ]}
      toolbarActions={[
        { name: t('add'), onClick: handleOpenCreateDialog, icon: <AddIcon /> }
      ]}
      rowActions={[
        { name: t('edit'), onClick: (e, row) => handleOpenEditDialog(row), icon: <EditIcon /> },
        { name: t('delete'), onClick: (e, row) => handleOpenDeleteDialog(row), icon: <DeleteIcon /> },

      ]}
    // dense
    />
  </Paper>)
}


export default User;