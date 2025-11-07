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
  Text,
  IconButton
} from "../common";

import {
  BorderColorSharp,
  Delete,
} from '@mui/icons-material';

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
  onConfirm = () => { },
}) => {
  const classes = useStyles();
  // console.log(edgeServer)
  const [state, setState] = React.useState({
    file: null,
    name: "",
    description: ""
  });
  const { closeDialog, t, authedApi } = useContext(GlobalContext);


  return (
    <>
      <DialogContent
        dividers
        style={{ width: 300 }}
      >
        <input
          style={{ display: 'none' }}
          id="contained-button-file"
          // multiple
          onChange={e => {
            setState({
              ...state,
              name: e.target.files[0].name,
              file: e.target.files[0]
            })
            e.target.value = null
          }}
          type="file"
        />
        {
          state.file
            ? <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center' }}>
              <TextField
                style={{ flex: 1 }}
                onChange={e => setState({
                  ...state,
                  name: e.target.value
                })}
                value={state.name} />
              <IconButton onClick={() => {
                setState({
                  ...state,
                  file: null
                })
              }}><Delete /></IconButton>
            </div>
            : <label htmlFor="contained-button-file">
              <Button
                style={{ marginBottom: 12 }}
                fullWidth color="primary" variant="outlined" component="span">
                {t("upload")}
              </Button>
            </label>
        }
        <TextField
          label={t("description")}
          type="text"
          fullWidth
          value={state.description}
          onChange={e => setState({ ...state, description: e.target.value })}
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