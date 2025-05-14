import React from "react";
import { styled } from '@mui/material/styles';
import MuiDialogActions from '@mui/material/DialogActions'; // Renamed to avoid conflict

const StyledDialogActions = styled(MuiDialogActions)(({ theme }) => ({
  color: theme.palette.paper.color,
  backgroundColor: theme.palette.paper.background,
}));

export default StyledDialogActions;
