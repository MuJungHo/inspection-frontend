import React, { useContext, useCallback } from "react";
// import { makeStyles } from '@mui/material/styles';

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

const UserSection = ({
  user = {
    email: "",
    name: "",
    account: "",
    password: ""
  },
  onConfirm = () => { },
}) => {
  const [state, setState] = React.useState(user);
  const { closeDialog, t } = useContext(GlobalContext);
  

  return (
    <>
      <DialogContent
        dividers
        sx={{
          width: 500
        }}>
        <TextField
          label={t("account")}
          required
          type="text"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          value={state.account}
          onChange={e => setState({ ...state, account: e.target.value })}
        />
        <TextField
          label={t("password")}
          required
          type="password"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          value={state.password}
          onChange={e => setState({ ...state, password: e.target.value })}
        />
        <TextField
          label={t("name")}
          type="text"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        />
        <TextField
          label={t("email")}
          type="text"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          value={state.email}
          onChange={e => setState({ ...state, email: e.target.value })}
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

export default UserSection