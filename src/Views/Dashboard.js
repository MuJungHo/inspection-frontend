import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
// import { AuthContext } from "../contexts/AuthContext";
import { Paper, Table, Button } from "../components/common";
import { Add } from "../images/icons";
import {
  // BorderColorSharp,
  // Delete,
  // CheckCircle,
  // Cancel
} from '@mui/icons-material';
// import { green, red } from '@mui/material/colors';
import ReactECharts from 'echarts-for-react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';

const config = {
  series: {
    type: 'sunburst',
    radius: [0, '90%'], // Inner and outer radius
    sort: 'descending', // Sort order of segments
    label: {
      rotate: 'horizontal', // This property makes the labels vertical
    },
  },
};
// const initFilter = {
//   amount: 5,
//   skip: 0,
//   page: 0
// }

const colors = [
  ["#2093fe", "#a4c7f1"],
  ["#fe6d4f", "#FADBC7"],
  ["#fdb302", "#efdf8a"],
  ["#47b857", "#90ee90"],
  ["#9b59b6", "#d7bde2"]
]
const Dashboard = () => {
  const { t, authedApi,
    // openDialog, closeDialog, openSnackbar, openWarningDialog, 
  } = useContext(GlobalContext);
  const [option, setOption] = React.useState({});
  const [option1, setOption1] = React.useState({});
  const [parkingFacilityList, setParkingFacilityList] = React.useState([]);
  const [statisticsOccupancyFilter, setStatisticsOccupancyFilter] = React.useState({
    range: "day",
    vehicleType: "CAR",
    parkingFacilityId: ""
  });

  React.useEffect(() => {
    getStatisticsBySpaceType();
    getParkingFacilityList()
  }, [])

  React.useEffect(() => {
    if (statisticsOccupancyFilter.parkingFacilityId) getStatisticsOccupancyByFacilityId();
  }, [statisticsOccupancyFilter])

  const getStatisticsBySpaceType = async () => {
    const { data, success } = await authedApi.statistics.getStatisticsBySpaceType();
    const __data = data?.spaceTypeOccupancy.map((space, i) => ({
      name: space.type,
      value: space.spaceCount + space.occupiedCount,
      itemStyle: {
        color: colors[i][0]
      },
      children: [
        {
          name: '停放中', value: space.spaceCount, itemStyle: {
            color: colors[i][0]
          }
        },
        {
          name: '閒置中', value: space.occupiedCount, itemStyle: {
            color: colors[i][1]
          }
        },
      ],
    }))
    const _data = [
      {
        name: '無障礙車位',
        value: 10,
        itemStyle: {
          color: '#fe6d4f'
        },
        children: [
          {
            name: '無障礙車位-停放中', value: 5, itemStyle: {
              color: '#fe6d4f'
            }
          },
          {
            name: '無障礙車位-閒置中', value: 5, itemStyle: {
              color: '#FADBC7'
            }
          },
        ],
      },
      {
        name: '主管車位',
        value: 10,
        itemStyle: {
          color: '#fdb302'
        },
        children: [
          {
            name: '主管車位-停放中', value: 5, itemStyle: {
              color: '#fdb302'
            }
          },
          {
            name: '主管車位-閒置中', value: 5, itemStyle: {
              color: '#efdf8a'
            }
          },
        ],
      },
      {
        name: '彈性車位',
        value: 10,
        itemStyle: {
          color: '#47b857'
        },
        children: [
          {
            name: '彈性車位-停放中', value: 5, itemStyle: {
              color: '#47b857'
            }
          },
          {
            name: '彈性車位-閒置中', value: 5, itemStyle: {
              color: '#90ee90'
            }
          },
        ],
      },
      {
        name: '一般車位',
        value: 10,
        itemStyle: {
          color: '#2093fe'
        },
        children: [
          {
            name: '一般車位-停放中', value: 5, itemStyle: {
              color: '#2093fe'
            }
          },
          {
            name: '一般車位-閒置中', value: 5, itemStyle: {
              color: '#a4c7f1'
            }
          },
        ],
      },
      {
        name: '孕婦車位',
        value: 10,
        itemStyle: {
          color: '#9b59b6'
        },
        children: [
          {
            name: '孕婦車位-停放中', value: 5, itemStyle: {
              color: '#9b59b6'
            }
          },
          {
            name: '孕婦車位-閒置中', value: 5, itemStyle: {
              color: '#d7bde2'
            }
          },
        ],
      },
    ]

    if (success) {
      config.series["data"] = _data;
      config.series["data"] = __data;
    }


    setOption({ ...config, series: { ...config.series, data: _data } })
    // console.log(data)
  }

  const getParkingFacilityList = async () => {

    const { data, total } = await authedApi.parkingFacilities.getParkingFacilities();
    setParkingFacilityList(data);
    if (total > 0) {
      setStatisticsOccupancyFilter({ ...statisticsOccupancyFilter, parkingFacilityId: data[0].parkingFacilityId })
    }
  }
  const getStatisticsOccupancyByFacilityId = async () => {
    const { data, success } = await authedApi.statistics.getStatisticsOccupancyByFacilityId({
      facilityId: statisticsOccupancyFilter.parkingFacilityId,
      params: statisticsOccupancyFilter
    });
    const dataMap = {
      day: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    };

    const option = {
      title: {
        left: 'center',
        // top: 10,
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Rates', 'Value'],
        // top: 40,
      },
      grid: {
        // top: 80,
        left: '3%',
        right: '4%',
        bottom: '8%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: dataMap[statisticsOccupancyFilter.range],
        boundaryGap: false,
      },
      yAxis: [
        {
          type: 'value',
          name: t('count'),
          position: 'left',
        },
        {
          type: 'value',
          name: t('rate'),
          position: 'right',
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: [
        {
          name: t('count'),
          type: 'line',
          yAxisIndex: 0,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          data: data.values,
          lineStyle: { width: 2 },
          areaStyle: { opacity: 0.1 },
        },
        {
          name: t('rate'),
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          symbol: 'triangle',
          symbolSize: 8,
          data: data.rates,
          lineStyle: { width: 2, type: 'dashed' },
        },
      ],
    };
    setOption1(option)
  }
  return (
    <>
      <Paper style={{ display: 'flex' }} sx={{ margin: 3 }}>
        <ReactECharts
          option={option}
          style={{ height: '500px', width: '50%' }}
        />
      </Paper>
      <Paper sx={{ margin: 3 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 16
          }}>
          <Typography variant="h6" component="div">停車場佔用統計</Typography>


          <Stack
            direction="row"
            // divider={<Divider orientation="vertical" flexItem />}
            spacing={3}
            style={{ padding: 10 }}
          >
            <FormControl size="small">
              <InputLabel>{t("parking-facility")}</InputLabel>
              <Select
                value={statisticsOccupancyFilter.parkingFacilityId}
                label={t("parking-facility")}
                onChange={e => setStatisticsOccupancyFilter({
                  ...statisticsOccupancyFilter,
                  parkingFacilityId: e.target.value
                })}
              >
                {
                  parkingFacilityList.map(parkingFacility => <MenuItem
                    key={parkingFacility.parkingFacilityId}
                    value={parkingFacility.parkingFacilityId}>
                    {parkingFacility.name}
                  </MenuItem>)
                }
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel>{t("type")}</InputLabel>
              <Select
                value={statisticsOccupancyFilter.vehicleType}
                label={t("type")}
                onChange={e => setStatisticsOccupancyFilter({
                  ...statisticsOccupancyFilter,
                  vehicleType: e.target.value
                })}
              >
                <MenuItem value="CAR">CAR</MenuItem>
                <MenuItem value="SCOOTER">SCOOTER</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small">
              <InputLabel>{t("range")}</InputLabel>
              <Select
                value={statisticsOccupancyFilter.range}
                label={t("range")}
                onChange={e => setStatisticsOccupancyFilter({
                  ...statisticsOccupancyFilter,
                  range: e.target.value
                })}
              >
                <MenuItem value="day">{t('day')}</MenuItem>
                <MenuItem value="week">{t('week')}</MenuItem>
                <MenuItem value="month">{t('month')}</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </div>
        <div style={{ display: 'flex', width: '100%' }}>
          <ReactECharts
            option={option1}
            style={{ height: '500px', width: '100%' }}
          />
        </div>
      </Paper>
    </>
  );
}


export default Dashboard;