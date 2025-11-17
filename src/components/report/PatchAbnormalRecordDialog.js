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
  onConfirm = () => { },
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    newStatus: "new",
  });
  const { closeDialog, t } = useContext(GlobalContext);


  return (
    <>
      <DialogContent
        dividers
        // className={classes.content}
      >
        <FormControl fullWidth>
          <InputLabel>{t("type")}</InputLabel>
          <Select
            size="small"
            value={state.newStatus}
            label={t("type")}
            onChange={e => setState({
              ...state,
              newStatus: e.target.value
            })}
          >
            {/* <MenuItem value="">All</MenuItem> */}
            <MenuItem value="new">{t("new")}</MenuItem>
            <MenuItem value="ignore">{t("ignore")}</MenuItem>
            <MenuItem value="done">{t("dnoe")}</MenuItem>
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