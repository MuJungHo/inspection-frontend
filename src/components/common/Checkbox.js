import React from "react";
import { styled } from '@mui/material/styles';
import MuiCheckbox from '@mui/material/Checkbox';


const StyledCheckbox = styled(MuiCheckbox)(({ theme }) => ({
  color: theme.palette.input.color,
  "&.Mui-disabled": {
    color: theme.palette.disabled.color,
  },
}));

export default StyledCheckbox;
