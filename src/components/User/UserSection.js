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

const UserSection = ({
  user = {
    username: "",
    roleName: "",
    roleIds: [],
    isEnabled: true,
    password: ""
  },
  onConfirm = () => { },
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState(user);
  const { closeDialog, t, authedApi } = useContext(GlobalContext);
  const [RoleList, setRoleList] = React.useState([]);

  React.useEffect(() => {
    getRoles();
  }, [])

  const getRoles = async () => {
    const { data } = await authedApi.role.getRoles();

    const _rows = data.map(a => ({ ...a, _id: a.roleId }));

    setRoleList(_rows);

  }


  return (
    <>
      <DialogContent
        dividers
        className={classes.content}
      >
        <TextField
          label={t("username")}
          type="text"
          value={state.username}
          onChange={e => setState({ ...state, username: e.target.value })}
        />
        <TextField
          label={t("displayName")}
          type="text"
          value={state.displayName}
          onChange={e => setState({ ...state, displayName: e.target.value })}
        />
        <TextField
          label={t("password")}
          type="password"
          value={state.password}
          onChange={e => setState({ ...state, password: e.target.value })}
        />
        <FormControl>
          <InputLabel>{t("role")}</InputLabel>
          <Select
            value={state.roleIds}
            label={t("role")}
            multiple
            onChange={e => setState({
              ...state,
              roleIds: e.target.value
            })}
          >
            {
              RoleList
                .map(data => <MenuItem
                  key={data._id}
                  value={data._id}>
                  {data.roleName}
                </MenuItem>)
            }
          </Select>
        </FormControl>
        <div>
          <FormControlLabel
            value="end"
            control={<Checkbox
              checked={state.isEnabled}
              color="default"
              onChange={e => setState({ ...state, isEnabled: e.target.checked })} />}
            label={t("is-enabled")}
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

export default UserSection