import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table, Image, Text, TextField } from "../../components/common";
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
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  MenuItem
} from '@mui/material';

const Detail = () => {
  const { authedApi, t } = useContext(GlobalContext);
  const { taskId } = useParams();

  const [detail, setDetail] = React.useState({});
  const [points, setPoints] = React.useState([]);

  const getDetail = async () => {
    const { data, success } = await authedApi.getTaskDetail({ id: taskId });
    setDetail(data);
    console.log(data)
    const records = data.records;
    const _points = data.plan.points;
    setPoints(_points);
  }
  React.useEffect(() => {
    getDetail();
  }, [])

  return (
    <Box sx={{ flexGrow: 1, p: 4, overflow: 'auto', width: 700, margin: 'auto' }}>
      <Box>
        <Box>
          <Text variant="h5" fontWeight="bold" color="text.primary">
            {detail?.plan?.name} ({detail.status})
          </Text>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card variant="outlined" sx={{ borderColor: 'grey.300', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
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
            points.map(point => {
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
                    {
                      point.items?.map(item => (<Box sx={{
                        p: 1,
                        bgcolor: '#fafafa',
                        width: '100%',
                        mb: 1
                      }}>
                        {
                          item.dataType === "numeric" && <FormControl>
                            <FormLabel>{item.name}</FormLabel>
                            <TextField variant="outlined" type="number" />
                          </FormControl>
                        }
                        {
                          item.dataType === "text" && <FormControl>
                            <FormLabel>{item.name}</FormLabel>
                            <TextField variant="outlined" type="text" />
                          </FormControl>
                        }
                        {
                          item.dataType === "multiple" && <FormControl variant="outlined" size="small">
                            <FormLabel>{item.name}</FormLabel>
                            <Select
                              // displayEmpty
                            >
                              {item.options?.map(option => <MenuItem value={option.name}>{option.name}</MenuItem>)}
                            </Select>
                          </FormControl>
                        }
                        {
                          item.dataType === "boolean" && <FormControl>
                            <FormLabel>{item.name}</FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                            >
                              <FormControlLabel value="female" control={<Radio />} label={t("yes")} />
                              <FormControlLabel value="male" control={<Radio />} label={t("no")} />
                            </RadioGroup>
                          </FormControl>
                        }
                      </Box>))
                    }
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