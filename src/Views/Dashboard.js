import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { AuthContext } from "../contexts/AuthContext";
import { Paper, Table, Button, Text } from "../components/common";
import { Add } from "../images/icons";
import {
  // BorderColorSharp,
  // Delete,
  // CheckCircle,
  // Cancel
} from '@mui/icons-material';
// import { green, red } from '@mui/material/colors';
import ReactECharts from 'echarts-for-react';
import { host } from "../utils/api/axios";
import * as signalR from "@microsoft/signalr";

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Stack from '@mui/material/Stack';
// import ButtonGroup from '@mui/material/ButtonGroup';

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
  const { token } = useContext(AuthContext);

  const [option, setOption] = React.useState({});
  const [option1, setOption1] = React.useState({});
  const [statisticsInformation, setStatisticsInformation] = React.useState({});
  const [statisticsOccupancyFilter, setStatisticsOccupancyFilter] = React.useState({
    range: "day",
    vehicleType: "CAR",
    parkingFacilityId: ""
  });
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    getStatisticsBySpaceType();
    getParkingFacilityList()
  }, [])

  React.useEffect(() => {
    if (statisticsOccupancyFilter.parkingFacilityId) {
      getStatisticsOccupancyByFacilityId();
      getStatisticsInformationByFacilityId()
    }
  }, [statisticsOccupancyFilter])

  const hubUrl = `${host}/hub/pms?access_token=${token}`;

  React.useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .build();

    let timer = null;

    const startConnection = async () => {
      try {
        await connection.start();
      } catch (err) {
        timer = setTimeout(startConnection, 5000);
      }
    };

    startConnection();

    connection.on("AvailableSpace", (source, payload) => {
      let data;
      try {
        data = typeof payload === "string" ? JSON.parse(payload) : payload;
      } catch (e) {
        return;
      }
      console.log("data:", data);
      setData(data)

    });

    return () => {
      connection.off("AvailableSpace");
      connection.stop();
      clearTimeout(timer);
    };
  }, []);

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


    setOption({ ...config, series: { ...config.series, data: __data } })
    // console.log(data)
  }

  const getParkingFacilityList = async () => {
    const { data, total } = await authedApi.parkingFacilities.getParkingFacilities();
    if (total > 0) {
      setStatisticsOccupancyFilter({ ...statisticsOccupancyFilter, parkingFacilityId: data[0].parkingFacilityId })
    }
  }

  const getStatisticsInformationByFacilityId = async () => {
    const { data, success } = await authedApi.statistics.getStatisticsInformationByFacilityId({
      facilityId: statisticsOccupancyFilter.parkingFacilityId
    });
    setStatisticsInformation(data)
    // console.log(data)
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
        text: "停車場佔用統計",
        left: "center",
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

  const option_ = {
    title: {
      text: "汽車進出狀況",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["進場", "出場"],
      bottom: 0,
    },
    xAxis: {
      type: "category",
      data: ["週一", "週二", "週三", "週四", "週五", "週六", "週日"],
    },
    yAxis: {
      type: "value",
      name: "車輛數",
    },
    series: [
      {
        name: "進場",
        type: "bar",
        data: [120, 132, 101, 134, 90, 230, 210],
        itemStyle: { color: "#5470C6" },
      },
      {
        name: "出場",
        type: "bar",
        data: [100, 150, 80, 120, 70, 200, 180],
        itemStyle: { color: "#91CC75" },
      },
    ],
  };

  const option__ = {
    title: {
      text: "機車進出狀況",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["進場", "出場"],
      bottom: 0,
    },
    xAxis: {
      type: "category",
      data: ["週一", "週二", "週三", "週四", "週五", "週六", "週日"],
    },
    yAxis: {
      type: "value",
      name: "機車數",
    },
    series: [
      {
        name: "進場",
        type: "bar",
        data: [220, 182, 191, 234, 290, 330, 310],
        itemStyle: { color: "#EE6666" },
      },
      {
        name: "出場",
        type: "bar",
        data: [180, 160, 210, 200, 270, 310, 300],
        itemStyle: { color: "#FAC858" },
      },
    ],
  };

  const four_card_height = (window.innerHeight - 120) / 6;
  return (
    <Grid container spacing={2} style={{ width: '100%', height: '100%', padding: 16 }}>
      <Grid size={3}>
        <Paper sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }} >
          <Text style={{ fontSize: four_card_height * .12 }}>汽車剩餘數量</Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1 }}>
            <div style={{ fontSize: four_card_height * .31 }}>
              {`${data?.CAR?.availableSpaces || '--'}/${data?.CAR?.totalSpaces || '--'}`}
            </div>
            <div style={{ fontSize: four_card_height * .11 }}>彈性車位: {data?.CAR?.temporarySpaces || '--'}</div>
          </div>
        </Paper>
      </Grid>
      <Grid size={3}>
        <Paper sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }} >
          <Text style={{ fontSize: four_card_height * .12 }}>機車剩餘數量</Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1 }}>
            <div style={{ fontSize: four_card_height * .31 }}>
              {`${data?.SCOOTER?.availableSpaces || '--'}/${data?.SCOOTER?.totalSpaces || '--'}`}
            </div>
            <div style={{ fontSize: four_card_height * .11 }}>彈性車位: {data?.SCOOTER?.temporarySpaces || '--'}</div>
          </div>
        </Paper>
      </Grid>
      <Grid size={3}>
        <Paper sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }} >
          <Text style={{ fontSize: four_card_height * .12 }}>汽車出入口辨識率</Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1 }}>
            <div style={{ fontSize: four_card_height * .31 }}>
              {Math.round(statisticsInformation?.totalRecognitionRate?.car?.rate * 100) || '--'} %
            </div>
            <div style={{ fontSize: four_card_height * .11 }}>辨識: {`${statisticsInformation?.totalRecognitionRate?.car?.recognizedCount || '--'}/${statisticsInformation?.totalRecognitionRate?.car?.total || '--'}`}</div>
          </div>
        </Paper>
      </Grid>
      <Grid size={3}>
        <Paper sx={{ p: 1, height: '100%', display: 'flex', flexDirection: 'column' }} >
          <Text style={{ fontSize: four_card_height * .12 }}>機車出入口辨識率</Text>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1 }}>
            <div style={{ fontSize: four_card_height * .31 }}>
              {Math.round(statisticsInformation?.totalRecognitionRate?.scooter?.rate * 100) || '--'} %
            </div>
            <div style={{ fontSize: four_card_height * .11 }}>
              辨識: {`${statisticsInformation?.totalRecognitionRate?.scooter?.recognizedCount || '--'}/${statisticsInformation?.totalRecognitionRate?.scooter?.total || '--'}`}
            </div>
          </div>
        </Paper>
      </Grid>

      <Grid size={6}>
        <Paper sx={{ p: 1, height: '100%' }} style={{ width: "100%" }}>
          <ReactECharts option={option_} style={{ height: 220, width: "100%" }} />
        </Paper>
      </Grid>
      <Grid size={6}>
        <Paper sx={{ p: 1, height: '100%' }} style={{ width: "100%" }}>
          <ReactECharts option={option__} style={{ height: 220, width: "100%" }} />

        </Paper>
      </Grid>

      <Grid size={9}>
        <Paper sx={{ p: 1 }} style={{ height: '100%' }}>
          <ReactECharts
            option={option1}
          />
        </Paper>
      </Grid>
      <Grid size={3}>
        <Paper style={{ height: '100%' }}>
          <ReactECharts
            option={option}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}


export default Dashboard;