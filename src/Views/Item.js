import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Paper, Table, Image } from "../components/common";
import { useParams } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import ItemDialog from "../components/Item/ItemDialog";

const User = () => {
  const { authedApi, t, openDialog } = useContext(GlobalContext);
  const { pointId } = useParams();

  const [UserList, setUserList] = React.useState([]);
  React.useEffect(() => {
    getAllItems()
  }, [])
  const getAllItems = async () => {
    const { data, success } = await authedApi.getAllItems({ pointId });
    const _rows = data.map(a => ({
      ...a, _id: a.id,
      _isReportable: a.isReportable ? t('yes') : t('no'),
      _options: a.options?.length
    }));

    if (success) {
      setUserList(_rows);
    }
  }
  const handleOpenCreateDialog = async () => {
    openDialog({
      title: "add",
      maxWidth: "sm",
      fullWidth: true,
      component: <ItemDialog />
    })
  }
  return (<Paper sx={{ margin: 3 }}>
    <Table
      title={t("inspection-item")}
      prevPages={[
        { name: t("inspection-point"), path: "/#/point" }
      ]}
      rows={UserList}
      checkable={false}
      columns={[
        { key: 'name', label: t('name'), sortable: false },
        { key: 'dataType', label: t('type'), sortable: false },
        { key: 'operator', label: t('_operator'), sortable: false },
        { key: 'numerical', label: t('numerical'), sortable: false },
        { key: '_options', label: t('_options'), sortable: false },
        { key: '_isReportable', label: t('notify'), sortable: false },
      ]}
      toolbarActions={[
        { name: t('add'), onClick: handleOpenCreateDialog, icon: <AddIcon /> }
      ]}
    // dense
    />
  </Paper>)
}


export default User;