import Region from "../Views/Facility/Region";
import Factory from "../Views/Facility/Factory";
import ParkingFacility from '../Views/Facility/ParkingFacility';
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

import {
  ManageAccount,
  // IdCard,
  // DataTable,
  // TravelExplore,
  // Settings,
  Detector,
  // Tools
} from "../images/icons";

import DomainIcon from '@mui/icons-material/Domain';


const routes = [
  {
    name: "facility",
    icon: DomainIcon,
    children: [
      {
        path: "/region",
        name: "region",
        component: Region,
        authName: "sysAdmin",
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
]

export default routes