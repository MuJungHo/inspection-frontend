import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Paper, Table, Image } from "../components/common";


const User = () => {
  const { authedApi, t } = useContext(GlobalContext);

  const [UserList, setUserList] = React.useState([]);
  React.useEffect(() => {
    getAllInspectionItems()
  }, [])
  const getAllInspectionItems = async () => {
    const { data, success } = await authedApi.getAllInspectionItems();
    const _rows = data.map(a => ({
      ...a, _id: a.id,
      _isReportable: a.isReportable ? t('yes') : t('no'),
      _options: a.options?.length
    }));

    if (success) {
      setUserList(_rows);
    }
  }
  return (<Paper sx={{ margin: 3 }}>
    <Table
      title={t("inspection-item")}
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
    // dense
    />
  </Paper>)
}


export default User;