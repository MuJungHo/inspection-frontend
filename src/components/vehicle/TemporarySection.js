import React, { useContext, useCallback } from "react";
import { makeStyles } from '@mui/styles';

// import {
//   FormGroup,
//   RadioGroup
// } from '@mui/material';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';

import {
  TextField,
  Checkbox,
  //  Radio, 
  Button,
  DialogContent,
  DialogActions,
} from "../common";

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      width: 'calc(50% - 10px)',
      height: '100%',
      marginBottom: 10,
      marginTop: 10
    },
    '& > *:nth-child(even)': {
      marginLeft: 20
    }
  },
});

const TemporarySection = ({
  temporary = {
    plateNumber: "",
    vehicleType: "CAR",
    ownerName: "",
    employeeId: "",
    category: "Employee"
  },
  onConfirm = () => { },
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState(temporary);
  const { closeDialog, t, authedApi } = useContext(GlobalContext);


  return (
    <>
      <DialogContent
        dividers
      // className={classes.content}
      >
        <TextField
          label={t("plate-number")}
          style={{ marginBottom: 12 }}
          type="text"
          fullWidth
          value={state.plateNumber}
          onChange={e => setState({ ...state, plateNumber: e.target.value })}
        />
        <TextField
          label={t("employee-id")}
          style={{ marginBottom: 12 }}
          type="text"
          fullWidth
          value={state.employeeId}
          onChange={e => setState({ ...state, employeeId: e.target.value })}
        />
        <TextField
          label={t("thing-name", { thing: t("vehicle-owner") })}
          style={{ marginBottom: 12 }}
          type="text"
          fullWidth
          value={state.ownerName}
          onChange={e => setState({ ...state, ownerName: e.target.value })}
        />
        <TextField
          select
          fullWidth
          style={{ marginBottom: 12 }}
          label={t("vehicle-type")}
          value={state.vehicleType}
          onChange={e => setState({ ...state, vehicleType: e.target.value })}
        >
          <MenuItem value="CAR">CAR</MenuItem>
          <MenuItem value="SCOOTER">SCOOTER</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          label={t("type")}
          value={state.category}
          onChange={e => setState({ ...state, category: e.target.value })}
        >
          <MenuItem value="Employee">Employee</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("cancel")}
        </Button>
        <Button color="primary" variant="contained" onClick={() => onConfirm(state)}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </>)
}

export default TemporarySection