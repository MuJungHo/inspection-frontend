import Region from "../Views/Facility/Region";
import Factory from "../Views/Facility/Factory";
import ParkingFacility from '../Views/Facility/ParkingFacility';
import ParkingFloor from '../Views/Facility/ParkingFloor';
import ParkingSpace from '../Views/Facility/ParkingSpace';
import Gate from '../Views/Facility/Gate';
import GateLane from '../Views/Facility/GateLane';

import EdgeServer from "../Views/Device/EdgeServer";
import EdgeServerHistory from "../Views/Device/EdgeServerHistory";
import FailoverGroup from "../Views/Device/FailoverGroup";
import FailoverEvent from "../Views/Device/FailoverEvent";
import Camera from "../Views/Device/Camera";
import PLC from "../Views/Device/PLC";
import PLCPoint from "../Views/Device/PLCPoint";

import User from "../Views/User/User";
import Role from "../Views/User/Role";
import Authorization from "../Views/User/Authorization";

import UsageRecordInstant from "../Views/Report/UsageRecordInstant";
// import UsageRecordByPlate from "../Views/Report/UsageRecordByPlate";
import UsageRecordHistory from "../Views/Report/UsageRecordHistory";
import AbnormalRecordHistory from "../Views/Report/AbnormalRecordHistory";
import AbnormalRecordInstant from "../Views/Report/AbnormalRecordInstant";
import AbnormalRecordRecord from "../Views/Report/AbnormalRecordRecord";
import AbnormalRecordManagement from "../Views/Report/AbnormalRecordManagement";
import UsageRecordRecord from "../Views/Report/UsageRecordRecord";

import {
  ManageAccount,
  // IdCard,
  // DataTable,
  // TravelExplore,
  // Settings,
  Detector,
  // Tools
} from "../images/icons";

import { Domain, DataUsage, Storage, Warning, TaxiAlert } from '@mui/icons-material';


const routes = [
  {
    name: "instant",
    icon: DataUsage,
    children: [
      {
        name: "usage-record-instant",
        path: "/usage-record-instant",
        component: UsageRecordInstant
      },
    ]
  },
  {
    name: "abnormal-record-instant",
    icon: Warning,
    path: "/abnormal-record-instant",
    component: AbnormalRecordInstant
  },
  {
    name: "abnormal-record-management",
    icon: TaxiAlert,
    path: "/abnormal-record-management",
    component: AbnormalRecordManagement
  },
  {
    name: "record",
    icon: Storage,
    children: [
      {
        name: "abnormal-record-record",
        path: "/abnormal-record-record",
        component: AbnormalRecordRecord
      },
      {
        name: "usage-record-record",
        path: "/usage-record-record",
        component: UsageRecordRecord
      }
    ]
  },
  {
    name: "facility",
    icon: Domain,
    children: [
      {
        path: "/region",
        name: "region",
        component: Region,
        authName: "sysAdmin",
        sidebar: false // 暫時不顯示這個頁面
      },
      {
        path: "/factory",
        name: "factory",
        component: Factory,
      },
      {
        path: "/parking-facility",
        name: "parking-facility",
        component: ParkingFacility,
      },
      {
        path: "/gate",
        name: "gate",
        component: Gate,
      },
      {
        path: "/gate-lane",
        name: "gate-lane",
        component: GateLane,
      },
    ]
  },
  {
    name: "device",
    icon: Detector,
    children: [
      {
        path: "/edge-server",
        name: "edge-server",
        component: EdgeServer,
      },
      {
        path: "/edge-server/history/:edgeServerId",
        name: "edge-server-history",
        component: EdgeServerHistory,
        sidebar: false // 不顯示在 sidebar
      },
      {
        path: "/camera",
        name: "camera",
        component: Camera,
      },
      {
        path: "/plc",
        name: "plc",
        component: PLC,
      },
      {
        path: "/plc-point/:plcId",
        name: "plc-point",
        component: PLCPoint,
        sidebar: false // 不顯示在 sidebar
      },
      {
        path: "/failover-group",
        name: "failover-group",
        component: FailoverGroup,
      },
      {
        path: "/failover/event/:failoverGroupId",
        name: "failover-event",
        component: FailoverEvent,
        sidebar: false // 不顯示在 sidebar
      },
    ]
  },
  {
    name: "user-management",
    icon: ManageAccount,
    authName: "admin",
    children: [
      {
        path: "/authorization",
        name: "authorization",
        component: Authorization,
        authName: "sysAdmin",
        sidebar: false // 暫時不顯示這個頁面
      },
      {
        path: "/role",
        name: "role",
        component: Role,
        authName: "admin",
      },
      {
        path: "/user",
        name: "user",
        component: User,
        authName: "admin",
      },
    ]
  },
  {
    name: "usage-record-instant-usage-record-history",
    path: "/usage-record-instant/usage-record-history/:parkingFacilityUsageRecordId",
    component: UsageRecordHistory,
    sidebar: false
  },
  {
    name: "usage-record-record-usage-record-history",
    path: "/usage-record-record/usage-record-history/:parkingFacilityUsageRecordId",
    component: UsageRecordHistory,
    sidebar: false
  },
  {
    name: "abnormal-record-management-abnormal-record-history",
    path: "/abnormal-record-management/abnormal-record-history/:abnormalRecordId",
    component: AbnormalRecordHistory,
    sidebar: false
  },
  {
    name: "abnormal-record-instant-abnormal-record-history",
    path: "/abnormal-record-instant/abnormal-record-history/:abnormalRecordId",
    component: AbnormalRecordHistory,
    sidebar: false
  },
  {
    name: "abnormal-record-record-abnormal-record-history",
    path: "/abnormal-record-record/abnormal-record-history/:abnormalRecordId",
    component: AbnormalRecordHistory,
    sidebar: false
  },
  {
    name: "parking-floor",
    path: "/parking-floor/:parkingFacilityId",
    component: ParkingFloor,
    sidebar: false
  },
  {
    name: "parking-space",
    path: "/parking-space/:parkingFacilityId/:parkingFloorId",
    component: ParkingSpace,
    sidebar: false
  },
]

export default routes