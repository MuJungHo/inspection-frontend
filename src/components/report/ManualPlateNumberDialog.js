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

const ManualPlateNumberDialog = ({
  usageRecord = {},
  onConfirm = () => { },
}) => {
  const [state, setState] = React.useState(usageRecord);
  const { closeDialog, t } = useContext(GlobalContext);


  return (
    <>
      <DialogContent
        dividers
      >
        <TextField
          label={t("plate-number")}
          type="text"
          fullWidth
          sx={{ marginBottom: 2.5 }}
          value={state.plateNumber}
          onChange={e => setState({
            ...state,
            plateNumber: e.target.value
          })}
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

export default ManualPlateNumberDialog