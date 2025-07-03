import React, { useContext, useCallback } from "react";
// import { makeStyles } from '@mui/material/styles';


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
        sx={{
          width: 500
        }}>
        <TextField
          label={t("name")}
          type="text"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        />
        <TextField
          label={t("host")}
          type="text"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          value={state.host}
          onChange={e => setState({ ...state, host: e.target.value })}
        />
        <TextField
          label={t("port")}
          type="number"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          value={state.port}
          onChange={e => setState({ ...state, port: Number(e.target.value) })}
        />
        <TextField
          label={t("description")}
          type="text"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          value={state.description}
          onChange={e => setState({ ...state, description: e.target.value })}
        />
        <TextField
          label={t("serial-number")}
          type="text"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          value={state.serialNumber}
          onChange={e => setState({ ...state, serialNumber: e.target.value })}
        />
        <FormControl fullWidth>
          <InputLabel>Parking Facility Gate</InputLabel>
          <Select
            value={state.parkingFacilityGateId}
            label="Parking Facility Gate"
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
          sx={{ marginBottom: 2.5 }}
          control={<Checkbox
            checked={state.isEnabled}
            color="default"
            onChange={e => setState({ ...state, isEnabled: e.target.checked })} />}
          label={t("enable")}
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