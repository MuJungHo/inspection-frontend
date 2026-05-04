import React, { useContext } from "react";

// import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../../contexts/AuthContext";

import {
  Button,
  DialogContent,
  DialogActions,
  TextField
} from "../../components/common";

export default ({
  onConfirm = () => { },
  message = ""
}) => {
  const { closeDialog, t, classes } = useContext(GlobalContext);
  const [state, setState] = React.useState({});


  return (
    <>
      <DialogContent
        dividers
        className={classes.content}
        style={{
        }}>
        <TextField
          label={t("name")}
          type="text"
          value={state.name}
          onChange={e => setState({ ...state, name: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          {t("cancel")}
        </Button>
        <Button color="primary" variant="contained" onClick={onConfirm}>
          {t("confirm")}
        </Button>
      </DialogActions>
    </>
  )
}