import React from "react";
import { styled } from '@mui/material/styles';
import MuiRadio from '@mui/material/Radio';


const StyledRadio = styled(MuiRadio)(({ theme }) => ({
  color: theme.palette.input.color,
  "&.Mui-disabled": {
    color: theme.palette.disabled.color,
  },
}));

export default StyledRadio;
