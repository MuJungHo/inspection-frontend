import React, { useContext, useCallback } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

import {
  Table,
  Paper,
} from "../../components/common";

import {
  BorderColorSharp,
  Delete,
} from '@mui/icons-material';
import { Upload, Add } from "../../images/icons"
import RegionDialog from "../../components/Facility/RegionDialog";

const initFilter = {
//   order: "asc",
//   sort: "name",
  type: "fab",
  keyword: "",
  amount: 5,
  skip: 0,
}

const Factory = () => {
  const { t, openDialog, closeDialog, openSnackbar, openWarningDialog, authedApi } = useContext(GlobalContext);
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);

  const [regionList, setRegionList] = React.useState([]);

  const getRegionList = useCallback(async () => {
    let { data, total } = await authedApi.regions.getRegions({
      amount: filter.amount,
      skip: filter.skip,
      type: filter.type
      // keyword: filter.keyword,
      // order: filter.order,
      // sort: filter.sort
    })

    const _rows = data.map(a => ({ ...a, _id: a.id }))
    setRegionList(_rows)
    setTotal(total)
  }, [filter])

  React.useEffect(() => {
    getRegionList()
  }, [getRegionList])

  const openEditUserDialog = (data) => {
    openDialog({
      title: t("edit-thing", { thing: t("factory") }),
      section: <RegionDialog onConfirm={handleEditUserAccount} data={data} />
    })
  }

  const openAddUserDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("factory") }),
      section: <RegionDialog onConfirm={handleAddRegion} data={{ type: filter.type }} />
    })
  }


  const handleEditUserAccount = async (data) => {
    let res = await authedApi.regions.patchUpdateRegion({
      id: data.regionId,
      data: {
        "ParentRegionId": data.parentRegionId || null,
        "RegionType": data.type,
        "Name": data.name,
        "Description": data.description
      }
    });

    getRegionList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("edit") })
    })
  }

  const handleAddRegion = async (data) => {
    let res = await authedApi.regions.postCreateRegion({
      data: {
        "ParentRegionId": data.parentRegionId || null,
        "RegionType": data.type,
        "Name": data.name,
        "Description": data.description
      }
    })

    if (!res.success) {
      openSnackbar({
        severity: "error",
        message: t("error-thing", { thing: t("add") })
      })
      return;
    }


    getRegionList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("add") })
    })
  }

  const handleDeleteAccount = async data => {
    await authedApi.regions.deleteRegion({ id: data.regionId })
    getRegionList()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("delete") })
    })
  }

  const handleSetWarningDialog = (data) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: data.name }),
      onConfirm: () => handleDeleteAccount(data)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("factory")}
        rows={regionList}
        columns={[
        //   { key: 'regionId', label: t('regionId') },
        //   { key: 'type', label: t('type') },
          { key: 'name', label: t('name') },
        ]}
        checkable={false}
        filterable={false}
        // order={filter.order}
        // sort={filter.sort}
        rowsPerPage={filter.amount}
        page={(filter.skip / filter.amount)}
        total={total}
        // onSearchClick={getRegionList}
        // onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter(prevFilter => ({ ...prevFilter, skip: page * prevFilter.amount }))}
        onRowsPerPageChange={(limit) => setFilter(prevFilter => ({ ...prevFilter, skip: 0, amount: limit }))}
        // onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        // onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), onClick: openAddUserDialog, icon: <Add /> },
          // { name: t('upload'), onClick: openImportUserDialog, icon: <Upload /> },
        ]}
        rowActions={[
          { name: t('edit'), onClick: (e, row) => openEditUserDialog(row), icon: <BorderColorSharp /> },
          { name: t('delete'), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default Factory;