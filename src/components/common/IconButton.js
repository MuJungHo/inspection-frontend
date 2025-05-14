import React from "react";
import { styled } from '@mui/material/styles';
import MuiIconButton from '@mui/material/IconButton';


const StyledIconButton = styled(MuiIconButton)(({ theme }) => ({
  color: theme.palette.input.color,
  "&.Mui-disabled": {
    color: theme.palette.disabled.color,
  },
}));

export default StyledIconButton;
