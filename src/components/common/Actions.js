import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { MoreHoriz } from "../../images/icons";
import { Button } from "./index";
const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    boxShadow: theme.palette.boxShadow[1],
    backgroundColor: theme.palette.select.background,
    color: theme.palette.select.color,
    '& span': {
      color: theme.palette.select.color,
    },
  },
  "& .MuiList-root": {
    padding: theme.spacing(0.625),
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  height: 40,
  minWidth: 60,
  paddingLeft: theme.spacing(1),
  '& svg': {
    // fill: theme.grey.medium
    marginRight: theme.spacing(2.5),
  },
}));

export default ({ actions = [], row = {} }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleActionClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleItemClick = (event, action) => {
    setAnchorEl(null);
    action.onClick(event, row);
  };

  const filteredActions = actions.filter(action =>
    typeof action.showMenuItem === "function"
      ? action.showMenuItem(row)
      : true
  );

  if (filteredActions.length === 0) {
    return <>--</>;
  }

  if (filteredActions.length === 1) {
    const action = filteredActions[0];
    return (
      <Button
        disabled={action.disabled}
        color="inherit"
        onClick={(event) => action.onClick(event, row)}
        size="small"
      >
        {action.icon}
      </Button>
    );
  }

  return (
    <div onClick={e => e.stopPropagation()}>
      <Button
      color="inherit"
        onClick={handleActionClick}
        size="small"
      >
        <MoreHoriz />
      </Button>
      <StyledMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {filteredActions.map(action => (
          <StyledMenuItem
            key={action.name}
            onClick={(event) => handleItemClick(event, action)}
            disabled={action.disabled}
          >
            {action.icon}
            <Typography color="textSecondary" variant="caption">
              {action.name}
            </Typography>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};