import React from "react";
import {
  Breadcrumbs,
  // Radio,
  // Checkbox,
  Text,
  Paper,
  // Button,
  // Switch,
  // TextField
} from "../components/common";

import {
  Link,
  Typography,
  Divider,
  // InputAdornment
} from '@mui/material'; // Changed from @material-ui/core

// import { DateRangePicker, DatePicker } from 'rsuite';
// import SearchIcon from "@mui/icons-material/Search"; // Changed from @material-ui/icons/Search


const Navigation = () => {
  // const { t } = useContext(GlobalContext);
  return (
    <div style={{ padding: 20 }}> {/* Consider using sx prop with theme spacing if theme is available here */}
      <Paper sx={{ width: '100%', padding: 2, marginBottom: 2.5 }}> {/* Changed style to sx and used theme spacing units */}
        <Text variant="h5">Breadcrumbs</Text>
        <Divider sx={{ marginY: 2 }} /> {/* Changed style to sx and used theme spacing units */}
        <Breadcrumbs>
          <Link component="button">
            MUI v5
          </Link>
          <Link component="button">
            Core
          </Link>
          <Typography>Breadcrumb</Typography>
        </Breadcrumbs>
      </Paper>
    </div>
  );
}


export default Navigation;