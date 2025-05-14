import React from "react";
import { styled } from '@mui/material/styles';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';


const StyledBreadcrumbs = styled(MuiBreadcrumbs)(({ theme }) => ({
  '& p': {
    color: theme.palette.breadcrumbs.color
  },
  '& .MuiBreadcrumbs-separator': {
    color: theme.palette.breadcrumbs.color
  }
  // width: '30%',
  // boxShadow: theme.palette.boxShadow[1],
  // borderTopLeftRadius: 10,
  // borderTopRightRadius: 10,
  // "& .MuiOutlinedInput-notchedOutline": {
  //   borderColor: 'rgba(190, 190, 190, 0.4)'
  // }
}));

export default StyledBreadcrumbs;
