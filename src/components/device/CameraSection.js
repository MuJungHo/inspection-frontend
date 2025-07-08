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
  camera = {
    edgeServerId: "",
    parkingFacilityGateId: "",
    parkingFacilityGateLaneId: "",
    host: "",
    port: "",
    username: "",
    password: "",
    name: "",
    streamType: "",
    streamUrl: "",
    isActive: true
  },
  onConfirm = () => { },
}) => {
  // console.log(edgeServer)
  const classes = useStyles();
  const [state, setState] = React.useState(camera);
  const { closeDialog, t, authedApi } = useContext(GlobalContext);

  const [parkingFacilityGateList, setParkingFacilityGateList] = React.useState([]);
  const [parkingFacilityGateLaneList, setParkingFacilityGateLaneList] = React.useState([]);
  const [edgeServerList, setEdgeServerList] = React.useState([]);

  React.useEffect(() => {
    getEdgeServers();
    getParkingFacilityGates();
    getParkingFacilityGateLanes();
  }, [])

  const getParkingFacilityGates = async () => {
    const { data } = await authedApi.parkingFacilityGates.getParkingFacilityGates();

    const _rows = data.map(a => ({ ...a, _id: a.parkingFacilityGateId }));

    setParkingFacilityGateList(_rows);

  }

  const getParkingFacilityGateLanes = async () => {
    const { data } = await authedApi.parkingFacilityGateLanes.getParkingFacilityGateLanes();

    const _rows = data.map(a => ({ ...a, _id: a.parkingFacilityGateLaneId }));

    setParkingFacilityGateLaneList(_rows);

  }

  const getEdgeServers = async () => {
    const { data } = await authedApi.edgeServer.getEdgeServers();

    const _rows = data.map(a => ({ ...a, _id: a.edgeServerId }));

    setEdgeServerList(_rows);

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
        <FormControl fullWidth>
          <InputLabel>{t("stream-type")}</InputLabel>
          <Select
            value={state.streamType}
            label={t("stream-type")}
            onChange={e => setState({
              ...state,
              streamType: e.target.value
            })}
          >
            <MenuItem value="RTSP">RTSP</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label={t("stream-url")}
          type="text"
          value={state.streamUrl}
          onChange={e => setState({ ...state, streamUrl: e.target.value })}
        />
        <TextField
          label={t("username")}
          type="text"
          value={state.username}
          onChange={e => setState({ ...state, username: e.target.value })}
        />
        <TextField
          label={t("password")}
          type="password"
          value={state.password}
          onChange={e => setState({ ...state, password: e.target.value })}
        />
        <FormControl>
          <InputLabel>{t("edge-server")}</InputLabel>
          <Select
            value={state.edgeServerId}
            label={t("edge-server")}
            onChange={e => setState({
              ...state,
              edgeServerId: e.target.value
            })}
          >
            {
              edgeServerList.map(edgeServer => <MenuItem
                key={edgeServer.edgeServerId}
                value={edgeServer.edgeServerId}>
                {edgeServer.name}
              </MenuItem>)
            }
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
        <FormControl>
          <InputLabel>{t("gate-lane")}</InputLabel>
          <Select
            value={state.parkingFacilityGateLaneId}
            label={t("gate-lane")}
            onChange={e => setState({
              ...state,
              parkingFacilityGateLaneId: e.target.value
            })}
          >
            {
              parkingFacilityGateLaneList.map(parkingFacilityGateLane => <MenuItem
                key={parkingFacilityGateLane.parkingFacilityGateLaneId}
                value={parkingFacilityGateLane.parkingFacilityGateLaneId}>
                {parkingFacilityGateLane.name}
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

export default CameraSection