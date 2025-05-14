import React from "react";
import { styled } from '@mui/material/styles';
import MuiSwitch from '@mui/material/Switch';


const StyledSwitch = styled(MuiSwitch)(({ theme }) => ({
  '& .MuiSwitch-track': {
    backgroundColor: theme.palette.input.background,
  },
}));

export default StyledSwitch;
