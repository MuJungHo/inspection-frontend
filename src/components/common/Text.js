import React from "react";
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.layout.color,
}));

const RequiredSpan = styled('span')(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const Text = (props) => {
  return (
    <StyledTypography {...props}>
      {props.required && <RequiredSpan>*&nbsp;</RequiredSpan>}
      {props.children}
    </StyledTypography>
  );
};

export default Text;