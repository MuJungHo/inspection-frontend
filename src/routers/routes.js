import User from "../Views/User";
import Item from "../Views/Item";
import Point from "../Views/Point";
import Plan from "../Views/Plan";
import ReportList from "../Views/Report/List";
import ReportDetail from "../Views/Report/Detail";
import Task from "../Views/Task";
import Dashboard from "../Views/Dashboard";

import {
  ManageAccount,
} from "../images/icons";

import FactCheckIcon from '@mui/icons-material/FactCheck';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import PlaceIcon from '@mui/icons-material/Place';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DashboardIcon from '@mui/icons-material/Dashboard';

const routes = [
  {
    name: 'dashboard',
    icon: DashboardIcon,
    path: "/dashboard",
    component: Dashboard
  },
  {
    name: 'task',
    icon: AssignmentIndIcon,
    path: "/task",
    component: Task
  },
  {
    name: 'inspection-item',
    path: "/point/:pointId/item",
    component: Item,
    sidebar: false
  },
  {
    name: 'inspection-point',
    icon: PlaceIcon,
    path: "/point",
    component: Point,
  },
  {
    name: 'inspection-plan',
    icon: FactCheckIcon,
    path: "/plan",
    component: Plan
  },
  {
    name: 'report',
    icon: ReceiptLongIcon,
    path: "/report",
    component: ReportList
  },
  {
    name: 'report-detail',
    path: "/report/:taskId/detail",
    component: ReportDetail,
    sidebar: false
  },
  {
    name: 'user',
    icon: ManageAccount,
    path: "/user",
    component: User
  },
]

export default routes