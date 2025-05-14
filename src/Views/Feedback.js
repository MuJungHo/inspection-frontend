import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import {
  Text,
  Paper,
  Button,
  DialogContent,
  DialogActions,
  TextField
} from "../components/common";

import {
  Divider
} from '@mui/material';

const DialogSection = ({
  onConfirm = () => { }
}) => {
  const [state, setState] = React.useState("")
  const { closeDialog } = useContext(GlobalContext);
  return (
    <>
      <DialogContent
        dividers
        sx={{
          width: 500
        }}>
        <Text variant="h5">
          Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
          lacus vel augue laoreet rutrum faucibus dolor auctor.
        </Text>
        <TextField autoFocus
          margin="dense"
          label="Email Address"
          type="email"
          fullWidth
          value={state} onChange={e => setState(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>
          Cancel
        </Button>
        <Button onClick={() => onConfirm(state)}>
          Confirm
        </Button>
      </DialogActions>
    </>)
}

const Feedback = () => {
  const { openDialog, openSnackbar } = useContext(GlobalContext);

  const handleSetDialog = () => {
    openDialog({
      title: "Dialog Title",
      section: <DialogSection onConfirm={state => console.log(state)} />
    })
  }

  const handleSetSnackbar = (severity) => {
    openSnackbar({
      message: "Snackbar Message",
      severity
    })
  }

  return (
    <div style={{ padding: 20 }}>
      <Paper sx={{ width: '100%', padding: 2, marginBottom: 2.5 }}>
        <Text variant="h5">Dialog</Text>
        <Divider sx={{ marginY: 2 }} />
        <Button onClick={handleSetDialog}>Button</Button>
      </Paper>
      <Paper sx={{ width: '100%', padding: 2, marginBottom: 2.5 }}>
        <Text variant="h5">Snackbar</Text>
        <Divider sx={{ marginY: 2 }} />
        <Button color="primary" sx={{ marginRight: 2 }} onClick={() => handleSetSnackbar("success")}>Button</Button>
        <Button color="secondary" onClick={() => handleSetSnackbar("error")}>Button</Button>
      </Paper>
    </div>
  );
}


export default Feedback;