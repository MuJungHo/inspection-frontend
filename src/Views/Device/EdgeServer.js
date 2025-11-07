import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
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
  VpnKey,
  ContentCopy,
  AttachFile
} from '@mui/icons-material';
import { green, red } from '@mui/material/colors';
import { Box, Typography, InputAdornment, TextField as MuiTextField, IconButton as MuiIconButton } from '@mui/material';
import EdgeServerSection from "../../components/device/EdgeServerSection";
import EdgeServerFileUploaderSection from "../../components/device/EdgeServerFileUploaderSection";

const initFilter = {
  amount: 5,
  skip: 0,
  page: 0
}

const EdgeServer = () => {
  const { t, authedApi, openDialog, closeDialog, openSnackbar, openWarningDialog, } = useContext(GlobalContext);
  const { canAccessAction } = useContext(AuthContext);
  const theme = useTheme();
  const [total, setTotal] = React.useState(0);
  const [filter, setFilter] = React.useState(initFilter);
  const [edgeServerList, setEdgeServerList] = React.useState([]);
  const navigate = useNavigate();
  const actionCondition = (action) => (row) => canAccessAction("edge-server", action);

  React.useEffect(() => {
    getEdgeServers()
  }, [filter])

  const getEdgeServers = async () => {
    const { data, total } = await authedApi.edgeServer.getEdgeServers(filter);

    const _rows = data.map(a => ({
      ...a, _id: a.edgeServerId,
      _isEnabled: a.isEnabled ? <CheckCircle sx={{ color: green[300] }} /> : <Cancel sx={{ color: red[300] }} />,
    }));

    setEdgeServerList(_rows);

    setTotal(total);

  }

  const openEditEdgeServerDialog = (edgeServer) => {
    openDialog({
      title: t("edit-thing", { thing: t("edge-server") }),
      section: <EdgeServerSection onConfirm={handleEditEdgeServer} edgeServer={edgeServer} />
    })
  }

  const openAddEdgeServerDialog = () => {
    openDialog({
      title: t("add-thing", { thing: t("edge-server") }),
      section: <EdgeServerSection onConfirm={handleAddEdgeServer} />
    })
  }


  const handleEditEdgeServer = async (state) => {
    const edgeServer = {
      ParkingFacilityGateId: state.parkingFacilityGateId,
      Name: state.name,
      // "Description": "tes3",
      Host: state.host,
      Port: state.port,
      LastStatus: state.lastStatus,
      IsEnabled: state.isEnabled,
      SerialNumber: state.serialNumber
    }
    // console.log(state)
    await authedApi.edgeServer.patchUpdateEdgeServer({ id: state._id, data: edgeServer });
    getEdgeServers()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("edit") })
    })
  }

  const handleAddEdgeServer = async (state) => {
    const edgeServer = {
      ParkingFacilityGateId: state.parkingFacilityGateId,
      Name: state.name,
      // "Description": "tes3",
      Host: state.host,
      Port: state.port,
      LastStatus: state.lastStatus,
      IsEnabled: state.isEnabled,
      SerialNumber: state.serialNumber
    }
    await authedApi.edgeServer.postCreateEdgeServer({ data: { ...edgeServer } })
    getEdgeServers()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("add") })
    })
  }


  const handleDeleteEdgeServers = async edgeServer => {
    await authedApi.edgeServer.deleteEdgeServer({ id: edgeServer.edgeServerId })
    getEdgeServers()
    closeDialog()
    openSnackbar({
      severity: "success",
      message: t("success-thing", { thing: t("delete") })
    })
  }

  const handleSetWarningDialog = (edgeServer) => {
    openWarningDialog({
      title: t("delete-confirmation"),
      message: t("delete-thing-confirm", { thing: edgeServer.name }),
      onConfirm: () => handleDeleteEdgeServers(edgeServer)
    })
  }

  const handleCopyToClipboard = (text, fieldName, inputRef = null) => {
    // console.log(`Copying ${fieldName}: ${text}`);

    // 方法1: 現代瀏覽器的 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        // console.log(`Copied from navigator ${fieldName}: ${text}`);
        openSnackbar({
          severity: "success",
          message: t("copy-success", { thing: fieldName })
        });
      }).catch(error => {
        // console.log(`Navigator clipboard failed: ${error}`);
        fallbackCopy();
      });
      return;
    }

    // 方法2: 降級處理
    function fallbackCopy() {
      // 如果有傳入 input 的參考，直接使用
      if (inputRef && inputRef.current) {
        // 查找 input 或 textarea 元素
        const inputElement = inputRef.current.querySelector('input') || inputRef.current.querySelector('textarea');
        if (inputElement) {
          // console.log(`Found ${inputElement.tagName.toLowerCase()} element via ref`);
          inputElement.focus();
          inputElement.select();

          // 對於 textarea，確保選取整個內容
          if (inputElement.tagName.toLowerCase() === 'textarea') {
            inputElement.setSelectionRange(0, text.length);
          }

          const successful = document.execCommand('copy');
          // console.log(`execCommand result via ref: ${successful}`);

          if (successful) {
            // console.log(`Copied from ref ${fieldName}: ${text}`);
            openSnackbar({
              severity: "success",
              message: t("copy-success", { thing: fieldName })
            });
            return;
          }
        }
      }

      // 尋找包含該文字的現有輸入欄位（包含 input 和 textarea）
      // 尋找包含該文字的現有輸入欄位（包含 input 和 textarea）
      const inputElements = document.querySelectorAll('input[readonly], textarea[readonly]');
      // console.log(`Found ${inputElements.length} readonly elements`);

      for (const element of inputElements) {
        // console.log(`Checking ${element.tagName.toLowerCase()}: "${element.value}"`);
        if (element.value === text) {
          // console.log(`Found matching ${element.tagName.toLowerCase()}`);
          element.focus();
          element.select();

          // 對於 textarea，確保選取整個內容
          if (element.tagName.toLowerCase() === 'textarea') {
            element.setSelectionRange(0, text.length);
          }

          const successful = document.execCommand('copy');
          // console.log(`execCommand result: ${successful}`);

          if (successful) {
            // console.log(`Copied from existing ${element.tagName.toLowerCase()} ${fieldName}: ${text}`);
            openSnackbar({
              severity: "success",
              message: t("copy-success", { thing: fieldName })
            });
            return;
          }
        }
      }

      // 如果都失敗，提示手動複製
      // console.log(`All copy methods failed for ${fieldName}`);
      openSnackbar({
        severity: "warning",
        message: `請手動選取並複製 ${fieldName}`
      });
    }

    fallbackCopy();
  };

  const handleRenewAppSecret = async (edgeServer) => {
    try {
      const response = await authedApi.edgeServer.putEdgeServerAppSecretRenew({ id: edgeServer.edgeServerId });

      if (response.data) {
        const { edgeServerId, appSecret } = response.data;

        // 使用 callback refs 而不是 createRef
        let edgeServerIdRef = null;
        let appSecretRef = null;

        closeDialog();
        openDialog({
          title: t("renew-app-secret-success"),
          section: (
            <Box sx={{
              padding: 2,
              minWidth: 480,
              backgroundColor: theme.palette.paper.background,
              color: theme.palette.paper.color
            }}>
              <Typography
                variant="body1"
                sx={{
                  marginBottom: 2,
                  color: theme.palette.paper.color
                }}
              >
                {t("renew-app-secret-success-message")}
              </Typography>


              <Box sx={{ marginBottom: 2 }}>
                <MuiTextField
                  ref={(el) => { edgeServerIdRef = el; }}
                  label="EdgeServerId"
                  value={edgeServerId}
                  fullWidth
                  variant="outlined"
                  size="small"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <MuiIconButton
                          onClick={() => handleCopyToClipboard(edgeServerId, 'EdgeServerId', { current: edgeServerIdRef })}
                          edge="end"
                          size="small"
                          sx={{ color: theme.palette.paper.color }}
                        >
                          <ContentCopy fontSize="small" />
                        </MuiIconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    marginBottom: 1,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : theme.palette.background.default,
                      color: theme.palette.paper.color,
                      '& fieldset': {
                        borderColor: theme.palette.textfield?.borderColor || theme.palette.divider,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.textfield?.color || theme.palette.text.secondary,
                    }
                  }}
                />
              </Box>

              <Box sx={{ marginBottom: 2 }}>
                <MuiTextField
                  ref={(el) => { appSecretRef = el; }}
                  label="AppSecret"
                  value={appSecret}
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline
                  maxRows={3}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <MuiIconButton
                          onClick={() => handleCopyToClipboard(appSecret, 'AppSecret', { current: appSecretRef })}
                          edge="end"
                          size="small"
                          sx={{
                            alignSelf: 'flex-start',
                            marginTop: 0.5,
                            color: theme.palette.paper.color
                          }}
                        >
                          <ContentCopy fontSize="small" />
                        </MuiIconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      wordBreak: 'break-all',
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      color: theme.palette.paper.color,
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : theme.palette.background.default,
                      color: theme.palette.paper.color,
                      '& fieldset': {
                        borderColor: theme.palette.textfield?.borderColor || theme.palette.divider,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: theme.palette.textfield?.color || theme.palette.text.secondary,
                    }
                  }}
                />
              </Box>

              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.mode === 'dark'
                    ? theme.palette.text.secondary
                    : 'textSecondary'
                }}
              >
                {t("app-secret-copy-instruction")}
              </Typography>
            </Box>
          )
        });
      }
    } catch (error) {
      closeDialog();
      openSnackbar({
        severity: "error",
        message: t("failed-thing", { thing: t("renew-app-secret") })
      });
    }
  }

  const handleSetRenewAppSecretWarningDialog = (edgeServer) => {
    openWarningDialog({
      title: t("renew-app-secret-confirmation"),
      message: t("renew-app-secret-warning"),
      onConfirm: () => handleRenewAppSecret(edgeServer)
    })
  }

  return (
    <Paper sx={{ margin: 3 }}>
      <Table
        title={t("edge-server")}
        rows={edgeServerList}
        columns={[
          { key: 'name', label: t('name'), sortable: false },
          { key: 'host', label: t('host'), sortable: false },
          { key: 'port', label: t('port'), sortable: false },
          { key: 'serialNumber', label: t('serial-number'), sortable: false },
          { key: '_isEnabled', label: t('is-enabled'), sortable: false },
        ]}
        checkable={false}
        filterable={false}
        order={filter.order}
        sort={filter.sort}
        rowsPerPage={filter.amount}
        page={filter.page}
        total={total}
        onSearchClick={getEdgeServers}
        onClearClick={() => setFilter(initFilter)}
        onPageChange={(page) => setFilter({ ...filter, page, skip: page * filter.amount })}
        onRowsPerPageChange={(rowPerPage) => setFilter({ page: 0, skip: 0, amount: rowPerPage })}
        onSortChange={(order, sort) => setFilter({ ...filter, order, sort })}
        onKeywordSearch={(keyword) => setFilter({ ...filter, keyword })}
        toolbarActions={[
          { name: t('add'), condition: actionCondition("create"), onClick: openAddEdgeServerDialog, icon: <Add /> },
        ]}
        rowActions={[
          { name: t('edit'), condition: actionCondition("update"), onClick: (e, row) => openEditEdgeServerDialog(row), icon: <BorderColorSharp /> },
          { name: t('renew-app-secret'), condition: actionCondition("update"), onClick: (e, row) => handleSetRenewAppSecretWarningDialog(row), icon: <VpnKey /> },
          { name: t('file'), onClick: (e, row) => navigate(`/edge-server/file/${row.edgeServerId}`), icon: <AttachFile /> },
          { name: t('history'), onClick: (e, row) => navigate(`/edge-server/history/${row.edgeServerId}`), icon: <History /> },
          { name: t('delete'), condition: actionCondition("delete"), onClick: (e, row) => handleSetWarningDialog(row), icon: <Delete /> }
        ]}
      // dense
      />
    </Paper>
  );
}


export default EdgeServer;