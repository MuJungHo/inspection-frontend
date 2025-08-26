import React, { useContext, useCallback } from "react";
import { makeStyles } from '@mui/styles';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';

import {
  FilterAlt
} from '@mui/icons-material';
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
import { DateRangePicker } from 'rsuite';


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

const ParkingRecordFilterSection = ({
  filter = {
  },
  onConfirm = () => { },
}) => {
  // console.log(edgeServer)
  const classes = useStyles();
  const [state, setState] = React.useState(filter);
  const { closeDialog, t, authedApi, openDialog } = useContext(GlobalContext);

  const [ParkingFloorList, setParkingFloorList] = React.useState([]);
  const [ParkingFacilityList, setParkingFacilityList] = React.useState([]);

  React.useEffect(() => {
    getParkingFacility();
  }, [])

  React.useEffect(() => {
    if (!state.parkingFacilityId) return
    getParkingFloors();
  }, [state.parkingFacilityId])

  const getParkingFloors = async () => {
    const { data, success } = await authedApi.parkingFloors.getParkingFloors({ amount: 200, skip: 0, parkingFacilityId: state.parkingFacilityId });
    const _rows = data.map(a => {
      return ({
        ...a,
        _id: a.parkingFloorId,
      })
    });
    if (success) {
      setParkingFloorList(_rows);
    }
  }

  const getParkingFacility = async () => {
    const { data } = await authedApi.parkingFacilities.getParkingFacilities({ amount: 200, skip: 0, });

    const _rows = data.map(a => ({ ...a, _id: a.parkingFacilityId }));

    setParkingFacilityList(_rows);

  }

  return (<>
    <DialogContent
      dividers
    // className={classes.content}
    >
      <DateRangePicker
        style={{ width: '100%', marginBottom: 20, zIndex: 1301 }}
        cleanable={false}
        placement="bottomEnd"
        format="MM/dd/yyyy hh:mm aa"
        value={[new Date(state.startTime), new Date(state.endTime)]}
        onChange={([startTime, endTime]) => setState({
          ...state,
          startTime,
          endTime
        })} />
      <FormControl
        fullWidth
        size="small"
        sx={{ marginBottom: 2.5 }}
      >
        <InputLabel>{t("parking-facility")}</InputLabel>
        <Select
          value={state.parkingFacilityId || ""}
          label={t("parking-facility")}
          onChange={e => setState({
            ...state,
            parkingFacilityId: e.target.value
          })}
        >
          {
            ParkingFacilityList.map((parkingFacility) =>
              <MenuItem key={parkingFacility._id} value={parkingFacility._id}>{parkingFacility.name}</MenuItem>)
          }
        </Select>
      </FormControl>
      <FormControl
        fullWidth
        size="small"
        sx={{ marginBottom: 2.5 }}>
        <InputLabel>{t("parking-floor")}</InputLabel>
        <Select
          value={state.parkingFloorId}
          label={t("parking-floor")}
          onChange={e => setState({
            ...state,
            parkingFloorId: e.target.value
          })}
        >
          {
            ParkingFloorList.map((parkingFloor) =>
              <MenuItem key={parkingFloor._id} value={parkingFloor._id}>{parkingFloor.floorName}</MenuItem>)
          }
        </Select>
      </FormControl>
      <TextField
        fullWidth
        size="small"
        sx={{ marginBottom: 2.5 }}
        label={t("plate-number")}
        type="text"
        value={state.plateNumber}
        onChange={e => setState({ ...state, plateNumber: e.target.value })}
      />
      <TextField
        fullWidth
        size="small"
        sx={{ marginBottom: 2.5 }}
        label={t("parking-space")}
        type="text"
        value={state.parkingSpaceName}
        onChange={e => setState({ ...state, parkingSpaceName: e.target.value })}
      />


    </DialogContent>
    <DialogActions>
      <Button onClick={closeDialog}>
        {t("cancel")}
      </Button>
      <Button color="primary" variant="contained" onClick={() => onConfirm(state)}>
        {t("confirm")}
      </Button>
    </DialogActions></>)
}

const ParkingRecordFilter = ({
  filter = {
  },
  onConfirm = () => { },
}) => {
  const { openDialog, t } = useContext(GlobalContext);
  const handleOpenDialog = () => {
    openDialog({
      title: t("filter"),
      maxWidth: "sm",
      fullWidth: true,
      section: <ParkingRecordFilterSection filter={filter} onConfirm={onConfirm} />
    })
  }
  return (<Button onClick={handleOpenDialog}><FilterAlt /></Button>)
}

export default ParkingRecordFilter