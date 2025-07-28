import React from "react";
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';


const FinalButton = styled(MuiButton)(({ theme }) => ({
  minWidth: 'unset',
  color: theme.palette.button.color,
  borderColor: theme.palette.button.color,
  "&.MuiButton-textSecondary:not(.Mui-disabled)": {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
  },
  "&.MuiButton-textPrimary:not(.Mui-disabled)": {
    // borderColor: theme.palette.primary.main,
    // color: theme.palette.primary.main,
  },
  "&.MuiButton-outlinedSecondary:not(.Mui-disabled)": {
    borderColor: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
  },
  "&.MuiButton-outlinedPrimary:not(.Mui-disabled)": {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
  },
  "&.MuiButton-contained:not(.Mui-disabled)": {
    color: theme.palette.input.contrastText,
    backgroundColor: theme.palette.input.color,
  },
  "&.MuiButton-containedPrimary:not(.Mui-disabled)": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText || theme.palette.getContrastText?.(theme.palette.primary.main),
  },
  "&.MuiButton-containedSecondary:not(.Mui-disabled)": {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText || theme.palette.getContrastText?.(theme.palette.secondary.main),
  },
  "&.Mui-disabled": {
    color: theme.palette.disabled.color,
    borderColor: theme.palette.disabled.color,
  },
  "&.MuiButton-contained.Mui-disabled": {
    color: theme.palette.disabled.contrastText,
    backgroundColor: theme.palette.disabled.color,
  },
  
}));

export default FinalButton;
