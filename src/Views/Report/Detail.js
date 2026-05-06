import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table, Image, Text } from "../../components/common";
import { useParams } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleIcon from '@mui/icons-material/People';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import dayjs from "dayjs";
import {
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Grid,
  Chip,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

const Detail = () => {
  const { authedApi, t } = useContext(GlobalContext);
  const { taskId } = useParams();

  const [detail, setDetail] = React.useState({});

  const getDetail = async () => {
    const { data, success } = await authedApi.getTaskDetail({ id: taskId });
    setDetail(data);
  }
  React.useEffect(() => {
    getDetail()
  }, [])

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 4, overflow: 'auto' }}>
      <Box>
        {/* 標題區 */}
        <Box>
          <Text variant="h5" fontWeight="bold" color="text.primary">
            任務詳情: #1 陽光每日巡檢 ({detail.status})
          </Text>
          <CheckCircleIcon color="success" />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card variant="outlined" sx={{ borderColor: 'grey.300', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 3 }}>
                <InfoIcon fontSize="small" />
                <Text variant="subtitle1" fontWeight="bold" color="text.primary">基礎資訊</Text>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={2.4}><Text variant="body2" color="text.secondary">任務編號:</Text><Text variant="body2">1</Text></Grid>
                <Grid item xs={2.4}><Text variant="body2" color="text.secondary">狀態:</Text><Text variant="body2" color="success.main" fontWeight="bold">{detail.status}</Text></Grid>
                <Grid item xs={2.4}><Text variant="body2" color="text.secondary">巡檢日期:</Text><Text variant="body2">{detail.scheduledAt}</Text></Grid>
                <Grid item xs={2.4}><Text variant="body2" color="text.secondary">巡檢員:</Text><Text variant="body2">{detail?.inspector?.username}</Text></Grid>
                <Grid item xs={2.4}><Text variant="body2" color="text.secondary">所屬計劃:</Text><Text variant="body2">{detail?.plan?.name}</Text></Grid>
              </Grid>
            </CardContent>
          </Card>


          {
            detail.plan?.points?.map(point => {
              return <Card variant="outlined" sx={{ borderColor: 'grey.300', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', pb: '16px !important' }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
                      <LocationOnIcon fontSize="small" />
                      <Text variant="subtitle1" fontWeight="bold" color="text.primary">巡檢點位: {point.name} ({point.code})</Text>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Text variant="body2" color="text.secondary">代碼:</Text>
                        <Text variant="body2">{point.code}</Text>
                      </Grid>
                      <Grid item xs={4}>
                        <Text variant="body2" color="text.secondary">位置:</Text>
                        <Text variant="body2">{point.name}</Text>
                      </Grid>
                      <Grid item xs={4}>
                        <Text variant="body2" color="text.secondary">緯度: <span style={{ color: 'black' }}>{point.latitude}</span></Text>
                        <Text variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>經度: <span style={{ color: 'black' }}>{point.longitude}</span></Text>
                      </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, mt: 3 }}>
                      <AssignmentIcon fontSize="small" />
                      <Text variant="subtitle1" fontWeight="bold" color="text.primary">巡檢項目與結果 (共 {point.items.length} 項)</Text>
                    </Box>
                    <Grid container spacing={2}>
                      {
                        point.items?.map(record => (<Grid item xs={12} md={6}>
                          <Box sx={{
                            p: 2,
                            border: '1px solid',
                            borderColor: 'grey.300',
                            borderRadius: 1,
                            borderLeft: '4px solid',
                            borderLeftColor: 'success.main', bgcolor: '#fafafa', height: '100%'
                          }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Text variant="subtitle2" fontWeight="bold">{record.item?.name}</Text>
                              <Chip label="正常 ✓" color="success" size="small" variant="outlined" sx={{ bgcolor: '#edf7ed', fontWeight: 'bold' }} />
                            </Box>
                            <Text variant="body2" color="text.secondary">參考標準 : {record.item?.operator} {record.item?.numerical}</Text>
                            <Text variant="body2" color="text.secondary">
                              巡檢值 : <span style={{ color: 'black' }}>{record.value}</span> <span style={{ color: '#2e7d32' }}>(正常 / PASS)</span>
                            </Text>
                          </Box>
                        </Grid>))
                      }

                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            })
          }

        </Box>
      </Box>
    </Box>
  )
}


export default Detail;