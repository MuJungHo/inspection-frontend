import React from "react";
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField'; // Renamed to avoid conflict
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from "@mui/icons-material/Search";

const StyledTextField = styled(MuiTextField)(({ theme }) => ({
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.textfield.borderColor
  },
  "& .MuiInput-underline:before": {
    borderColor: theme.palette.textfield.borderColor
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    transition: 'border-color ease-in-out 0.3s'
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink": {
    top: 3,
    color: theme.palette.layout.color,
  },
  "& .MuiInputLabel-root": {
    // top: 7,
  },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
    borderColor: theme.palette.primary.main,
    borderWidth: 1
  },
  '& .MuiInputBase-input::placeholder': {
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  '& .MuiFormLabel-root': {
    borderColor: theme.palette.textfield.color
  },
  '& span': {
    // color: theme.palette.error.main // Consider if this is still needed or handled by MUI default error styles
  },
  '& .MuiInputBase-root': {
    color: theme.palette.layout.color,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    // borderRadius: 5
  },
  '& svg': {
    // Styles for SVG icons within the TextField, if any general styling is needed
  },
  '& .MuiInputLabel-formControl': {
    // color: theme.palette.layout.color
  }
}));

const CustomTextField = (props) => (
  <StyledTextField
    size={props.size || "small"}
    {...props}
    inputProps={{
      // style: {
      //   height: 53,
      //   padding: '0 14px',
      // },
      ...props.inputProps,
    }}
    InputProps={{
      ...props.InputProps,
      startAdornment: props.InputProps?.startAdornment
        ? props.InputProps?.startAdornment
        : props.type === "search"
          ? (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ) : undefined
    }}
  />
);

export default CustomTextField;