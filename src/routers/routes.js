import User from "../Views/User";
import DashboardComponent from "../Views/Dashboard";
import InspectionItem from "../Views/InspectionItem";
import InspectionPoint from "../Views/InspectionPoint";
import InspectionPlan from "../Views/InspectionPlan";
import InspectionResult from "../Views/InspectionResult";
import InspectionTask from "../Views/InspectionTask";

import {
  ManageAccount,
} from "../images/icons";

import FactCheckIcon from '@mui/icons-material/FactCheck';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import PlaceIcon from '@mui/icons-material/Place';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const routes = [
  {
    name: 'today-task',
    icon: AssignmentIndIcon,
    path: "/today-task",
    component: InspectionTask
  },
  {
    name: 'inspection-item',
    icon: DataUsageIcon,
    path: "/inspection-item",
    component: InspectionItem
  },
  {
    name: 'inspection-point',
    icon: PlaceIcon,
    path: "/inspection-point",
    component: InspectionPoint
  },
  {
    name: 'inspection-plan',
    icon: FactCheckIcon,
    path: "/inspection-plan",
    component: InspectionPlan
  },
  {
    name: 'user',
    icon: ManageAccount,
    path: "/user",
    component: User
  },
  {
    name: 'inspection-result',
    icon: ReceiptLongIcon,
    path: "/inspection-result",
    component: InspectionResult
  },
]

export default routes