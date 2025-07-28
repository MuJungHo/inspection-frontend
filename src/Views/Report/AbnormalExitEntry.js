import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Paper, Table, Image } from "../../components/common";
import { useParams } from "react-router-dom";
// import { Add } from "../../images/icons";
import { useLocation } from "react-router";
import {
  // BorderColorSharp,
  // Delete,
  TimeToLeave
} from '@mui/icons-material';
import { host } from "../../utils/api/axios";
import Vehicle from "../../components/vehicle/Vehicle";
import { DateRangePicker } from 'rsuite';


var startTime = new Date();
startTime.setHours(0, 0, 0, 0);

var endTime = new Date();
endTime.setHours(23, 59, 59, 999);

const initFilter = {
  startTime,
  endTime,
  
}

const UsageRecordByTime = () => {

  return (
    <Paper sx={{ margin: 3 }}>
    </Paper>
  );
}


export default UsageRecordByTime;