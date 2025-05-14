import React from "react";
import {
  // Breadcrumbs,
  Radio,
  Checkbox,
  Text,
  Paper,
  Button,
  Switch,
  TextField
} from "../components/common";


import {
  // Link,
  // Typography,
  Divider,
} from '@mui/material'; // Changed from @material-ui/core

import { DateRangePicker, DatePicker } from 'rsuite';


const Input = () => {
  return (
    <div style={{ padding: 20 }}>
      <Paper sx={{ width: '100%', padding: 2, marginBottom: 2.5 }}>
        <Text variant="h5">Radio</Text>
        <Divider sx={{ marginY: 2 }} />
        <Radio checked={false} />
        <Radio checked={true} color="default" />
        <Radio checked={true} color="primary" />
        <Radio checked={true} color="secondary" />
        <Radio disabled checked={false} />
        <Radio disabled checked={true} color="default" />
      </Paper>
      <Paper sx={{ width: '100%', padding: 2, marginBottom: 2.5 }}>
        <Text variant="h5">Checkbox</Text>
        <Divider sx={{ marginY: 2 }} />
        <Checkbox checked={false} color="default" />
        <Checkbox checked={true} color="default" />
        <Checkbox checked={true} color="primary" />
        <Checkbox checked={true} color="secondary" />
        <Checkbox disabled checked={false} color="default" />
        <Checkbox disabled checked={true} color="default" />
      </Paper>
      <Paper sx={{ width: '100%', padding: 2, marginBottom: 2.5 }}>
        <Text variant="h5">Button</Text>
        <Divider sx={{ marginY: 2 }} />
        <div style={{ marginBottom: 16 }}>
          <Button color="primary" sx={{ marginRight: 2 }}>Button</Button>
          <Button color="secondary" sx={{ marginRight: 2 }}>Button</Button>
          <Button color="inherit" sx={{ marginRight: 2 }}>Button</Button>
          <Button variant="outlined" color="primary" sx={{ marginRight: 2 }}>Button</Button>
          <Button variant="outlined" color="secondary" sx={{ marginRight: 2 }}>Button</Button>
          <Button variant="outlined" color="inherit" sx={{ marginRight: 2 }}>Button</Button>
        </div>
        <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>Button</Button>
        <Button variant="contained" color="secondary" sx={{ marginRight: 2 }}>Button</Button>
        <Button variant="contained" color="inherit" sx={{ marginRight: 2 }}>Button</Button>
        <Button disabled color="primary" sx={{ marginRight: 2 }}>Button</Button>
        <Button disabled variant="outlined" color="primary" sx={{ marginRight: 2 }}>Button</Button>
        <Button disabled variant="contained" color="primary" sx={{ marginRight: 2 }}>Button</Button>
      </Paper>
      <Paper sx={{ width: '100%', padding: 2, marginBottom: 2.5 }}>
        <Text variant="h5">Switch</Text>
        <Divider sx={{ marginY: 2 }} />
        <Switch checked={false} sx={{ marginRight: 2 }} />
        <Switch checked={true} color="primary" sx={{ marginRight: 2 }} />
        <Switch checked={true} color="secondary" sx={{ marginRight: 2 }} />
        <Switch disabled checked={false} sx={{ marginRight: 2 }} />
        <Switch disabled checked={true} color="primary" sx={{ marginRight: 2 }} />
      </Paper>
      <Paper sx={{ width: '100%', padding: 2, marginBottom: 2.5 }}>
        <Text variant="h5">TextField</Text>
        <Divider sx={{ marginY: 2 }} />
        <TextField label="TextField" sx={{ marginRight: 2 }} />
        <TextField label="TextField" sx={{ marginRight: 2 }} defaultValue="TextField Text" />
        <TextField type="search" sx={{ marginRight: 2 }} label="Search TextField" defaultValue="Search Text" />
        <TextField type="number" label="TextField Number" defaultValue={1000} />
      </Paper>
      <Paper sx={{ width: '100%', padding: 2, marginBottom: 2.5 }}>
        <Text variant="h5">DateTimePicker</Text>
        <Divider sx={{ marginY: 2 }} />
        <DateRangePicker
          format="yyyy-MM-dd HH:mm:ss"
          style={{ marginRight: 16 }} placement="auto" />
        <DatePicker placement="auto" />
      </Paper>
    </div>
  );
}


export default Input;