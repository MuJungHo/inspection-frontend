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
  role = {
    roleName: "",
    rolesAuthorizationIds: [],
    isEnabled: true
  },
  onConfirm = () => { },
}) => {
  const classes = useStyles();
  const [state, setState] = React.useState(role);
  const { closeDialog, t, authedApi } = useContext(GlobalContext);
  const [AuthorizationList, setAuthorizationList] = React.useState([]);

  React.useEffect(() => {
    getAuthorizations();
  }, [])

  const getAuthorizations = async () => {
    const { data } = await authedApi.authorization.getAuthorizations();

    const _rows = data.map(a => ({ ...a, _id: a.authorizationId }));

    setAuthorizationList(_rows);

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
          value={state.roleName}
          onChange={e => setState({ ...state, roleName: e.target.value })}
        />
        <FormControl>
          <InputLabel>{t("authorization")}</InputLabel>
          <Select
            value={state.rolesAuthorizationIds}
            label={t("authorization")}
            multiple
            onChange={e => setState({
              ...state,
              rolesAuthorizationIds: e.target.value
            })}
          >
            {
              AuthorizationList
                .map(data => <MenuItem
                  key={data._id}
                  value={data._id}>
                  {data.name}
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