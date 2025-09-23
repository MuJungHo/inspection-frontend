import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
// import { AuthContext } from "../contexts/AuthContext";
import { Paper, Table } from "../components/common";
import { Add } from "../images/icons";
import {
  // BorderColorSharp,
  // Delete,
  // CheckCircle,
  // Cancel
} from '@mui/icons-material';
// import { green, red } from '@mui/material/colors';
import ReactECharts from 'echarts-for-react';
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
const Camera = () => {
  const { t, authedApi,
    // openDialog, closeDialog, openSnackbar, openWarningDialog, 
  } = useContext(GlobalContext);
  const [option, setOption] = React.useState({});
  const [option1, setOption1] = React.useState({});
  React.useEffect(() => {
    getStatistics()
  }, [])

  const getStatistics = async () => {
    const { data, success } = await authedApi.statistics.getStatistics();
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
    setOption1({ ...config, series: { ...config.series, data: __data } })
    // console.log(data)
  }

  return (
    <Paper style={{ display: 'flex' }} sx={{ margin: 3 }}>
      <ReactECharts
        option={option}
        style={{ height: '500px', width: '50%' }}
      />
      <ReactECharts
        option={option1}
        style={{ height: '500px', width: '50%' }}
      />
    </Paper>
  );
}


export default Camera;