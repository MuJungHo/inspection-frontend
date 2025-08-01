import React, { useContext, useCallback } from "react";
import { makeStyles } from '@mui/styles';

// import {
//   FormGroup,
//   RadioGroup
// } from '@mui/material';

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import {
  TextField,
  // Checkbox, Radio, 
  Button,
  DialogContent,
  DialogActions,
} from "../common";

import { DatePicker } from 'rsuite';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


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

const ManualRecordDialog = ({
  AbnormalRecord = {},
  onConfirm = () => { },
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    parkingAbnormalRecordId: AbnormalRecord.parkingAbnormalRecordId,
    Type: "Exit",
    Time: new Date()
  });
  const { closeDialog, t } = useContext(GlobalContext);


  return (
    <>
      <DialogContent
        dividers
        className={classes.content}
      >
        <DatePicker
          format="yyyy/MM/dd  HH:mm:ss"
          value={state.Time} onChange={Time => setState({ ...state, Time })} />
        <FormControl fullWidth>
          <InputLabel>{t("record-type")}</InputLabel>
          <Select
            size="small"
            value={state.Type}
            label={t("type")}
            onChange={e => setState({
              ...state,
              Type: e.target.value
            })}
          >
            {/* <MenuItem value="">All</MenuItem> */}
            <MenuItem value="Entry">{t("TYPE.Entry")}</MenuItem>
            <MenuItem value="Exit">{t("TYPE.Exit")}</MenuItem>
            <MenuItem value="IGNORE">{t("TYPE.IGNORE")}</MenuItem>
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

export default ManualRecordDialog