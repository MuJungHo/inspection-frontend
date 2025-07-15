import React, { useContext, useCallback } from "react";
import { makeStyles } from '@mui/styles';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';


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
  plcPoint = {
    parkingFacilityGateLaneId: "",
    name: "",
    point: "",
    type: "door",
    retryCount: "",
    timeout: ""
  },
  parkingFacilityGateId = "",
  onConfirm = () => { },
}) => {
  // console.log(edgeServer)
  const classes = useStyles();
  const [state, setState] = React.useState(plcPoint);
  const { closeDialog, t, authedApi } = useContext(GlobalContext);

  const [parkingFacilityGateLaneList, setParkingFacilityGateLaneList] = React.useState([]);

  React.useEffect(() => {
    getParkingFacilityGateLanes();
  }, [])

  const getParkingFacilityGateLanes = async () => {
    const { data, success } = await authedApi.parkingFacilityGateLanes.getParkingFacilityGateLanesByGateId({ gateId: parkingFacilityGateId });

    if (success) {
      const _rows = data.map(a => ({ ...a, _id: a.parkingFacilityGateLaneId }));
      setParkingFacilityGateLaneList(_rows);
    }

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
          label={t("point")}
          type="number"
          value={state.point}
          onChange={e => setState({ ...state, point: Number(e.target.value) })}
        />
        <TextField
          label={t("retry-count")}
          type="number"
          value={state.retryCount}
          onChange={e => setState({ ...state, retryCount: Number(e.target.value) })}
        />
        <TextField
          label={t("timeout")}
          type="number"
          value={state.timeout}
          onChange={e => setState({ ...state, timeout: Number(e.target.value) })}
        />
        <FormControl>
          <InputLabel>{t("type")}</InputLabel>
          <Select
            value={state.type}
            label={t("type")}
            onChange={e => setState({
              ...state,
              type: e.target.value
            })}
          >
            <MenuItem value="door">Door</MenuItem>
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