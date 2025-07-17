import React, { useContext, useCallback } from "react";
import { makeStyles } from '@mui/styles';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';


// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import {
  TextField,
  Checkbox,
  // Radio, 
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

const EdgeServerSection = ({
  edgeServer = {
    parkingFacilityGateId: "",
    name: "",
    // "Description": "tes3",
    host: "",
    port: "",
    lastStatus: "",
    isEnabled: true,
    serialNumber: ""
  },
  onConfirm = () => { },
}) => {
  const classes = useStyles();
  // console.log(edgeServer)
  const [state, setState] = React.useState(edgeServer);
  const { closeDialog, t, authedApi } = useContext(GlobalContext);

  const [parkingFacilityGateList, setParkingFacilityGateList] = React.useState([]);

  React.useEffect(() => {
    getParkingFacilityGates();
  }, [])

  const getParkingFacilityGates = async () => {
    const { data } = await authedApi.parkingFacilityGates.getParkingFacilityGates();

    const _rows = data.map(a => ({ ...a, _id: a.parkingFacilityGateId }));

    setParkingFacilityGateList(_rows);

  }

  return (
    <>
      <DialogContent
        dividers
        className={classes.content}>
        <TextField
          label={t("name")}
          type="text"
          value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        />
        <TextField
          label={t("host")}
          type="text"
          value={state.host}
          onChange={e => setState({ ...state, host: e.target.value })}
        />
        <TextField
          label={t("port")}
          type="number"
          value={state.port}
          onChange={e => setState({ ...state, port: Number(e.target.value) })}
        />
        <TextField
          label={t("description")}
          type="text"
          value={state.description}
          onChange={e => setState({ ...state, description: e.target.value })}
        />
        <TextField
          label={t("serial-number")}
          type="text"
          value={state.serialNumber}
          onChange={e => setState({ ...state, serialNumber: e.target.value })}
        />
        <FormControl>
          <InputLabel>{t("gate")}</InputLabel>
          <Select
            value={state.parkingFacilityGateId}
            label={t("gate")}
            onChange={e => setState({
              ...state,
              parkingFacilityGateId: e.target.value
            })}
          >
            {
              parkingFacilityGateList.map(parkingFacilityGate => <MenuItem
                key={parkingFacilityGate.parkingFacilityGateId}
                value={parkingFacilityGate.parkingFacilityGateId}>
                {parkingFacilityGate.name}
              </MenuItem>)
            }
          </Select>
        </FormControl>
        <FormControlLabel
          value="end"
          control={<Checkbox
            checked={state.isEnabled}
            color="default"
            onChange={e => setState({ ...state, isEnabled: e.target.checked })} />}
          label={t("is-enabled")}
          labelPlacement="end"
        />

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

export default EdgeServerSection