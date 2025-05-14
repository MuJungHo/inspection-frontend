import React from "react";
import { styled } from '@mui/material/styles';
import MuiPaper from '@mui/material/Paper'; // Renamed to avoid conflict

const StyledPaper = styled(MuiPaper)(({ theme }) => ({
  color: theme.palette.paper.color,
  transition: 'unset',
  backgroundColor: theme.palette.paper.background,
  boxShadow: theme.shadows[1],
  borderRadius: theme.shape.borderRadius,
  backgroundImage: 'unset'
  //   borderRadius: 10, 
}));

export default StyledPaper;
