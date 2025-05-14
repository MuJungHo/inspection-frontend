import React from "react";
import { styled } from '@mui/material/styles';
import MuiDialogContent from '@mui/material/DialogContent';

const StyledDialogContent = styled(MuiDialogContent)(({ theme }) => ({
  color: theme.palette.paper.color,
  backgroundColor: theme.palette.paper.background,
}));

export default StyledDialogContent;
