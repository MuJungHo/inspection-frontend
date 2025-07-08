import User from "../Views/User";
import Setting from "../Views/Setting";

import Flexible from "../Views/Log/Flexible";
import Overstay from "../Views/Log/Overstay";
import Override from "../Views/Log/Override";
import SpecialUse from "../Views/Log/SpecialUse";
import LogTemporary from "../Views/Log/Temporary";
import Tracking from "../Views/Log/Tracking";
import Usage from "../Views/Log/Usage";
import Violation from "../Views/Log/Violation";

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

import {
  ManageAccount,
  // IdCard,
  DataTable,
  // TravelExplore,
  Settings,
  Detector,
  // Tools
} from "../images/icons";

import DomainIcon from '@mui/icons-material/Domain';


const routes = [
  {
    path: "/facility",
    name: "facilityManagement",
    icon: DomainIcon,
    sider: true,
    children: [
      // {
      //   path: "/region",
      //   name: "region"
      // },
      {
        path: "/factory",
        name: "factory",
      },
      {
        path: "/parking-facility",
        name: "parking-facility",
      },
      {
        path: "/gate",
        name: "gate"
      },
      {
        path: "/gate-lane",
        name: "gate-lane",
      }
      // {
      //   path: "/parking-facility",
      //   name: "_parking-facility",
      //   component: ParkingFacility,
      //   children: [
      //     {
      //       path: "/parking-facility-gate",
      //       name: "_parking-facility-gate",
      //       component: ParkingFacilityGate,
      //     }
      //   ]
      // }
    ]
  },
  {
    path: "/region",
    name: "region",
    component: Region,
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
  {
    path: "/device",
    name: "_device",
    sider: true,
    icon: Detector,
    children: [
      {
        path: "/edge-server",
        name: "_edge-server",
      },
      {
        path: "/camera",
        name: "_camera",
      },
      {
        path: "/failover-group",
        name: "_failover-group",
      },
    ]
  },
  {
    path: "/edge-server",
    name: "_edge-server",
    component: EdgeServer,
  },
  {
    path: "/edge-server/history/:edgeServerId",
    name: "_edge-server-history",
    component: EdgeServerHistory,
  },
  {
    path: "/camera",
    name: "_camera",
    component: Camera,
  },
  {
    path: "/failover-group",
    name: "_failover-group",
    component: FailoverGroup,
  },
  {
    path: "/user",
    name: "_user",
    component: User,
    icon: ManageAccount,
    sider: true,
    exact: true
  },
  {
    path: "/failover/event/:failoverGroupId",
    name: "_failover-event",
    component: FailoverEvent,
  },
  {
    path: "/report",
    name: "_report",
    sider: true,
    icon: DataTable,
    children: [
      {
        path: "/flexible",
        name: "_flexible",
      },
      {
        path: "/overstay",
        name: "_overstay",
      },
      {
        path: "/override",
        name: "_override",
      },
      {
        path: "/specialuse",
        name: "_specialuse",
      },
      {
        path: "/log-temporary",
        name: "_log-temporary",
      },
      {
        path: "/usage",
        name: "_usage",
      },
      {
        path: "/violation",
        name: "_violation",
      },
    ]
  },
  {
    path: "/flexible",
    name: "_flexible",
    component: Flexible,
  },
  {
    path: "/overstay",
    name: "_overstay",
    component: Overstay,
  },
  {
    path: "/override",
    name: "_override",
    component: Override,
  },
  {
    path: "/specialuse",
    name: "_specialuse",
    component: SpecialUse,
  },
  {
    path: "/log-temporary",
    name: "_log-temporary",
    component: LogTemporary,
  },
  {
    path: "/tracking",
    name: "_tracking",
    component: Tracking,
  },
  {
    path: "/usage",
    name: "_usage",
    component: Usage,
  },
  {
    path: "/violation",
    name: "_violation",
    component: Violation,
  },
  {
    path: "/setting",
    name: "_setting",
    component: Setting,
    icon: Settings,
    sider: true
  },
]

export default routes