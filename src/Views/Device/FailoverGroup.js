import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Paper, Table } from "../../components/common";
import { Add } from "../../images/icons";
import {
  BorderColorSharp,
  Delete,
  LowPriority,
  Event
} from '@mui/icons-material';
import FailoverGroupSection from "../../components/device/FailoverGroupSection";
import Priority from "../../components/device/Priority";

const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const FailoverGroup = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog, } = useContext(GlobalContext);
  const { canAccessAction } = useContext(AuthContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);
  const actionCondition = (action) => (row) => canAccessAction("failover-group", action);

  const [failoverGroupList, setFailoverGroupList] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getFailoverGroups()
  }, [filter])

  const getFailoverGroups = async () => {
    const { data, total } = await authedApi.failoverGroup.getFailoverGroups(filter);
    // console.log(data, total);

    const _rows = data.map(a => ({ ...a, _id: a.failoverGroupId }));
    setFailoverGroupList(_rows);
    setTotal(total);
  }

  const openEditFailoverGroupDialog = (failoverGroup) => {
    openDialog({
      title: t("edit-thing", { thing: t("failover-group") }),
      section: <FailoverGroupSection onConfirm={handleEditFailoverGroup} failoverGroup={failoverGroup} />
    });
  }

  const openAddFailoverGroupDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("failover-group") }),
      section: <FailoverGroupSection onConfirm={handleAddFailoverGroup} />
    });
  }

  const handleEditFailoverGroup = async (state) => {
    const failoverGroup = {
      Name: state.name,
      Description: state.description,
    };

    const { success } = await authedApi.failoverGroup.patchUpdateFailoverGroup({ id: state._id, data: failoverGroup });

    if (success) {
      getFailoverGroups();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("edit") })
      });
    }
  }

  const handleAddFailoverGroup = async (state) => {
    const failoverGroup = {
      Name: state.name,
      Description: state.description,
    };

    const { success } = await authedApi.failoverGroup.postCreateFailoverGroup({ data: { ...failoverGroup } });

    if (success) {
      getFailoverGroups();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("add") })
      });
    }
  }

  const handleDeleteFailoverGroup = async failoverGroup => {
    const { success } = await authedApi.failoverGroup.deleteFailoverGroup({ id: failoverGroup.failoverGroupId });

    if (success) {
      getFailoverGroups();
      closeDialog();
      openSnackbar({
        severity: "success",
        message: t("success-thing", { thing: t("delete") })
      });
    }
  }

  const handleSetWarningDialog = (failoverGroup) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: failoverGroup.name }),
      onConfirm: () => handleDeleteFailoverGroup(failoverGroup)
    })
  }

  const openEditPriorityDialog = (failoverGroup) => {
    openDialog({
      title: t("add-thing", { thing: t("member") }),
      section: <Priority failoverGroup={failoverGroup} />
    });
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("failover-group")}
        rows={failoverGroupList}
        columns={[
          { key: 'name', label: t('name') },
          { key: 'description', label: t('description') },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getFailoverGroups}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        // onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), condition: actionCondition("create"), onClick: openAddFailoverGroupDialog, icon: <Add /> }
        ]}
        rowActions={[
          { name: t('edit'), condition: actionCondition("update"), onClick: (e, row) => openEditFailoverGroupDialog(row), icon: <BorderColorSharp /> },
          { name: t('member'), condition: actionCondition("update"), onClick: (e, row) => openEditPriorityDialog(row), icon: <LowPriority /> },
          { name: t('event'), onClick: (e, row) => navigate(`/failover/event/${row.failoverGroupId}`), icon: <Event /> },
          { name: t('delete'), condition: actionCondition("delete"), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default FailoverGroup;