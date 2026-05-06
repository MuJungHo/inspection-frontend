import React, { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  List,
  ListItem,
  LinearProgress,
  IconButton,
  Tooltip as MuiTooltip,
  useTheme
} from '@mui/material';

import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import WarningIcon from '@mui/icons-material/Warning';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { Paper } from "../components/common";

const DashboardMUIOfficial = () => {
  const theme = useTheme();
  const { authedApi, t, openDialog } = useContext(GlobalContext);
  const [rankingItems, setRankingItems] = React.useState([]);
  const [rankingPoints, setRankingPoints] = React.useState([]);
  const [rankingPlans, setRankingPlans] = React.useState([]);
  const [recordDetails, setRecordDetails] = React.useState([]);
  const [recordStats, setRecordStats] = React.useState([]);

  React.useEffect(() => {
    getDashboardRankingItems();
    getDashboardRankingPoints();
    getDashboardRankingPlans();
    getDashboardRecordStatus();
  }, [])

  const getDashboardRankingItems = async () => {
    const { data, success } = await authedApi.getDashboardRankingItems();
    let _data = data.slice(0, 6);
    setRankingItems(_data);
  }

  const getDashboardRankingPoints = async () => {
    const { data, success } = await authedApi.getDashboardRankingPoints();
    let _data = data.slice(0, 6);
    setRankingPoints(_data);
  }

  const getDashboardRankingPlans = async () => {
    const { data, success } = await authedApi.getDashboardRankingPlans();
    let _data = data.slice(0, 6);
    setRankingPlans(_data);
  }

  const getDashboardRecordStatus = async () => {
    const { data, success } = await authedApi.getDashboardRecordStatus();
    // console.log(theme)
    let _recordStatus = data?.details.map(d => ({
      id: d.status,
      value: d.count,
      label: d.status,
      // color: {
      //   "DEFAULT": theme.palette.warning.main,
      //   "FAIL": theme.palette.error.main,
      //   "PASS": theme.palette.success.main
      // }[d.status]
    }))
    setRecordDetails(_recordStatus);
    setRecordStats({
      totalRecords: data?.totalRecords,
      defaultCount: data?.details[0].count,
      failedCount: data?.details[1].count,
      passRate: data?.details[2].percentage,
    })
  }

  const renderSummaryCard = (title, value, icon, color, suffix = '') => (
    <Box sx={{
      display: 'flex',
      // alignItems: 'center',
      justifyContent: 'space-between',
      p: 1,
      m: 1,
      borderRadius: '12px',
      border: '1px solid #bebebe'
    }}>
      <Box>
        <Typography variant="subtitle2" color="text.secondary" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          {value}<Typography component="span" variant="h6" color="text.secondary" sx={{ ml: 0.5 }}>{suffix}</Typography>
        </Typography>
      </Box>
      <Box sx={{ bgcolor: `${color}.50`, p: 1.5, borderRadius: 2, display: 'flex', color: `${color}.main` }}>
        {icon}
      </Box>
    </Box >
  );

  return (
    <Box sx={{ p: 3, height: '100%', display: 'flex' }}>
      <Box sx={{ flexBasis: '65%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', mb: 1 }}>
          <Box sx={{ flexBasis: '25%' }}>
            {renderSummaryCard('通過率', recordStats.passRate, <TrendingUpIcon fontSize="large" />, 'primary', '%')}
          </Box>
          <Box sx={{ flexBasis: '25%' }}>
            {renderSummaryCard('巡檢總數', recordStats.totalRecords, <AssignmentTurnedInIcon fontSize="large" />, 'info')}
          </Box>
          <Box sx={{ flexBasis: '25%' }}>
            {renderSummaryCard('未檢總數', recordStats.defaultCount, <AssignmentLateIcon fontSize="large" />, 'warning')}
          </Box>
          <Box sx={{ flexBasis: '25%' }}>
            {renderSummaryCard('異常發現次數', recordStats.failedCount, <WarningIcon fontSize="large" />, 'error')}
          </Box>
        </Box>
        <Box sx={{ flex: 1, p: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              巡檢項目異常排行榜
            </Typography>
            <MuiTooltip title="重新整理數據">
              <IconButton color="primary" sx={{ bgcolor: 'white', boxShadow: 1 }}>
                <AutorenewIcon />
              </IconButton>
            </MuiTooltip>
          </Box>
          <List disablePadding>
            {rankingItems.map((item, index) => (
              <React.Fragment key={item.itemId}>
                <ListItem disablePadding sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {index + 1}. {item.itemName}
                    </Typography>
                    <Typography variant="body2" color="error.main" fontWeight="bold">
                      {item.passRate}%
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={item.passRate}
                      color={item.passRate < 75 ? 'error' : 'warning'}
                      sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ minWidth: 40, textAlign: 'right' }}>
                      異常: {item.failedCount}
                    </Typography>
                  </Box>
                </ListItem>
                {index < rankingItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>

      </Box>
      <Box sx={{ flexBasis: '35%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{
          flexBasis: '33%',
        }}>
          <Box sx={{
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            borderRadius: '12px',
            border: '1px solid #bebebe'
          }}>
            <PieChart
              series={[
                {
                  data: recordDetails,
                },
              ]}
              height={180}
            />
          </Box>
        </Box>
        <Box sx={{
          flexBasis: '33%'
        }}>
          <Box sx={{
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            borderRadius: '12px',
            border: '1px solid #bebebe'
          }}>
            <BarChart
              dataset={rankingPoints}
              // layout="horizontal"
              xAxis={[
                {
                  scaleType: 'band',
                  dataKey: 'pointName'
                }
              ]}
              series={[
                {
                  dataKey: 'failedCount',
                  label: '巡檢點位異常次數',
                }
              ]}
              height={180}
            />
          </Box>
        </Box>
        <Box sx={{
          flexBasis: '34%',
        }}>
          <Box sx={{
            display: 'flex',
            // alignItems: 'center',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            borderRadius: '12px',
            border: '1px solid #bebebe'
          }}>
            <BarChart
              dataset={rankingPlans}
              xAxis={[
                {
                  scaleType: 'band',
                  dataKey: 'planName',
                }
              ]}
              series={[
                {
                  dataKey: 'failedCount',
                  label: '巡檢計畫異常次數',
                }
              ]}
              height={180}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardMUIOfficial;