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

const CameraSection = ({
  plc = {
    parkingFacilityGateId: "",
    name: "",
    host: "",
    port: "",
    protocol: "",
    note: ""
  },
  onConfirm = () => { },
}) => {
  // console.log(edgeServer)
  const classes = useStyles();
  const [state, setState] = React.useState(plc);
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
        className={classes.content}
      >
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
        <FormControl>
          <InputLabel>{t("protocol")}</InputLabel>
          <Select
            value={state.protocol}
            label={t("protocol")}
            onChange={e => setState({
              ...state,
              protocol: e.target.value
            })}
          >
            <MenuItem value="Mobus"> Mobus </MenuItem>
          </Select>
        </FormControl>
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

export default CameraSection