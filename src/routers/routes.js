import Region from "../Views/Facility/Region";
import Factory from "../Views/Facility/Factory";
import ParkingFacility from '../Views/Facility/ParkingFacility';
import ParkingFloor from '../Views/Facility/ParkingFloor';
import ParkingSpace from '../Views/Facility/ParkingSpace';
import ParkingOccupancy from '../Views/Facility/ParkingOccupancy';
import ParkingOccupancyHistory from '../Views/Facility/ParkingOccupancyHistory';
import ParkingOccupancyAdjustmentlog from '../Views/Facility/ParkingOccupancyAdjustmentlog';
import Gate from '../Views/Facility/Gate';
import GateLane from '../Views/Facility/GateLane';

import EdgeServer from "../Views/Device/EdgeServer";
import EdgeServerHistory from "../Views/Device/EdgeServerHistory";
import EdgeServerFile from "../Views/Device/EdgeServerFile";
import FailoverGroup from "../Views/Device/FailoverGroup";
import FailoverEvent from "../Views/Device/FailoverEvent";
import Camera from "../Views/Device/Camera";
import PLC from "../Views/Device/PLC";
import PLCPoint from "../Views/Device/PLCPoint";

import User from "../Views/User/User";
import Role from "../Views/User/Role";
import Authorization from "../Views/User/Authorization";

import SystemSetting from "../Views/System/Setting";
import SystemSettingHistory from "../Views/System/History";

import DashboardComponent from "../Views/Dashboard";

import AbnormalFacilityRecord from "../Views/Abnormal/FacilityRecord";
import Overtime from "../Views/Violation/Overtime";
import Unauthorized from "../Views/Violation/Unauthorized";

import AccessRecord from "../Views/Acess/Record";
import AccessBlackList from "../Views/Acess/BlackList";
import AccessTemporary from "../Views/Acess/Temporary";

import Notification from "../Views/Notification";

import VehicleSearch from "../Views/Presentation/VehicleSearch";
import Map from "../Views/Presentation/Map";


import {
  ManageAccount,
  // IdCard,
  // DataTable,
  // TravelExplore,
  Settings,
  Detector,
  // Tools
} from "../images/icons";

import { Domain, DataUsage, Storage, Warning, TaxiAlert, Dashboard, Notifications, NoCrash } from '@mui/icons-material';


const routes = [
  {
    name: 'dashboard',
    icon: Dashboard,
    path: "/dashboard",
    component: DashboardComponent
  },
  {
    name: "access-management",
    icon: DataUsage,
    children: [
      {
        name: "access-record",
        path: "/access-record",
        component: AccessRecord
      },
      {
        name: "access-blacklist",
        path: "/access-blacklist",
        component: AccessBlackList
      },
      {
        name: "access-temporary",
        path: "/access-temporary",
        component: AccessTemporary
      }
    ]
  },
  {
    name: "violation-management",
    icon: Warning,
    children: [
      {
        name: "violation-overtime",
        path: "/violation-overtime",
        component: Overtime
      },
      {
        name: "violation-unauthorized",
        path: "/violation-unauthorized",
        component: Unauthorized
      },
    ]
  },
  {
    name: "abnormal-management",
    icon: TaxiAlert,
    children: [
      {
        name: "abnormal-facility-record",
        path: "/abnormal-facility-record",
        component: AbnormalFacilityRecord
      },
    ]
  },
  {
    name: "presentation",
    icon: NoCrash,
    children: [
      {
        name: "presentation-vehicle-search",
        path: "/presentation-vehicle-search",
        component: VehicleSearch
      },
      {
        name: "presentation-map",
        path: "/presentation-map",
        component: Map
      }
    ]
  },
  {
    name: 'notification',
    icon: Notifications,
    path: "/notification",
    component: Notification
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
        path: "/edge-server/file/:edgeServerId",
        name: "edge-server-file",
        component: EdgeServerFile,
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
    name: "system-setting",
    icon: Settings,
    path: "/system-setting",
    authName: "admin",
    component: SystemSetting
  },
  {
    name: "system-setting-history",
    path: "/system-setting-history/:settingId",
    component: SystemSettingHistory,
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
  {
    name: "parking-occupancy",
    path: "/parking-occupancy/:parkingFacilityId",
    component: ParkingOccupancy,
    sidebar: false
  },
  {
    name: "parking-occupancy-history",
    path: "/parking-occupancy-history/:parkingFacilityId/:parkingOccupancyId",
    component: ParkingOccupancyHistory,
    sidebar: false
  },
  {
    name: "parking-occupancy-adjustmentlog",
    path: "/parking-occupancy-adjustmentlog/:parkingFacilityId/:parkingOccupancyId",
    component: ParkingOccupancyAdjustmentlog,
    sidebar: false
  },
]

export default routes