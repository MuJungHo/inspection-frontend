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

const SettingSection = ({
  setting = {
    name: "",
    content: ""
  },
  onConfirm = () => { },
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState(setting);
  const { closeDialog, t, authedApi } = useContext(GlobalContext);


  return (
    <>
      <DialogContent
        dividers
      // className={classes.content}
      >
        <TextField
          label={t("name")}
          style={{ marginBottom: 12 }}
          type="text"
          fullWidth
          value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        />
        <TextField
          label={t("content")}
          type="text"
          fullWidth
          value={state.content}
          onChange={e => setState({ ...state, content: e.target.value })}
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

export default SettingSection