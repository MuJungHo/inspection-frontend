import React, { useContext, useCallback } from "react";
import { makeStyles } from '@mui/styles';


// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import FormControlLabel from '@mui/material/FormControlLabel';


// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import {
  // TextField,
  // Checkbox,
  // Radio,
  Text,
  Button,
  DialogContent,
  DialogActions,
} from "../common";


const useStyles = makeStyles({
  content: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // '& > *': {
    //   width: 'calc(50% - 10px)',
    //   height: '100%',
    //   marginBottom: 10,
    //   marginTop: 10
    // },
    '& > *:nth-child(even)': {
      marginBottom: 20,
      fontSize: 18
    }
  },
});

const Vehicle = ({
  plateNumber = "",
  // onConfirm = () => { },
}) => {
  // console.log(edgeServer)
  const classes = useStyles();
  const [state, setState] = React.useState({
    // "vehicleId": "0014fc86-6ba0-4117-a1b2-c6f98940f9f4",
    // "plateNumber": "AXT-1738",
    // "vehicleType": "CAR",
    // "parkingPermits": [
    //   "GENERAL"
    // ],
    // "owner": {
    //   "vehicleOwnerId": "fd6ffcaf-5912-46f5-9aaa-df94a4c709c5",
    //   "name": "Grace",
    //   "phone": null,
    //   "employeeId": "106294"
    // }
  });
  const { closeDialog, t, authedApi, openSnackbar } = useContext(GlobalContext);

  React.useEffect(() => {
    getVehicleDataByPlateNumber()
  }, [])
  const getVehicleDataByPlateNumber = async () => {
    try {
      const vehicle = await authedApi.vehicle.getVehicleDataByPlateNumber({ plateNumber });
      setState(vehicle);
    } catch (error) {
      // closeDialog();
      openSnackbar({
        severity: "error",
        message: t(error.response.data.message)
      });
    }
  }

  return (
    <>
      <DialogContent
        dividers
        className={classes.content}
      >
        <Text>{t("plate-number")}</Text>
        <Text>{plateNumber}</Text>
        <Text>{t("vehicle-type")}</Text>
        <Text>{state.vehicleType || '--'}</Text>
        <Text>{t("parking-permits")}</Text>
        <Text>{state.parkingPermits?.join(',') || '--'}</Text>
        <Text>{t("owner-name")}</Text>
        <Text>{state.owner?.name || '--'}</Text>
        <Text>{t("owner-phone")}</Text>
        <Text>{state.owner?.phone || '--'}</Text>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("close")}
        </Button>
        {/* <Button color="primary" variant="contained" onClick={() => onConfirm(state)}>
          {t("confirm")}
        </Button> */}
      </DialogActions>
    </>)
}

export default Vehicle