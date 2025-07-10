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

const AuthorizationSection = ({
  authorization = {
    name: "",
    description: "",
    scope: "",
    isEnabled: true
  },
  onConfirm = () => { },
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState(authorization);
  const { closeDialog, t, authedApi } = useContext(GlobalContext);
  const [AuthorizationNameList, setAuthorizationNameList] = React.useState([]);

  React.useEffect(() => {
    getAuthorizationNames();
  }, [])

  const getAuthorizationNames = async () => {
    const { data } = await authedApi.authorization.getAuthorizationNames();

    const _rows = data.map(a => ({ _id: a, name: a }));

    setAuthorizationNameList(_rows);

  }


  return (
    <>
      <DialogContent
        dividers
        className={classes.content}
      >
        <FormControl>
          <InputLabel>{t("name")}</InputLabel>
          <Select
            value={state.name}
            label={t("name")}
            onChange={e => setState({
              ...state,
              name: e.target.value
            })}
          >
            {
              AuthorizationNameList
                .map(data => <MenuItem
                  key={data.name}
                  value={data.name}>
                  {data.name}
                </MenuItem>)
            }
          </Select>
        </FormControl>
        <TextField
          label={t("description")}
          type="text"
          value={state.description}
          onChange={e => setState({ ...state, description: e.target.value })}
        />
        <FormControl>
          <InputLabel>{t("scope")}</InputLabel>
          <Select
            value={state.scope}
            label={t("scope")}
            onChange={e => setState({
              ...state,
              scope: e.target.value
            })}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Create">Create</MenuItem>
            <MenuItem value="Read">Read</MenuItem>
            <MenuItem value="Update">Update</MenuItem>
            <MenuItem value="Delete">Delete</MenuItem>
          </Select>
        </FormControl>
        <div>
          <FormControlLabel
            value="end"
            control={<Checkbox
              checked={state.isEnabled}
              color="default"
              onChange={e => setState({ ...state, isEnabled: e.target.checked })} />}
            label={t("enable")}
            labelPlacement="end"
          />
        </div>
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

export default AuthorizationSection