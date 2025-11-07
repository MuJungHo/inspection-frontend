import React, { useContext } from 'react';
import clsx from 'clsx';
import { NavLink, useLocation } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthContext } from "../../contexts/AuthContext";
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import {
  ArrowBack,
  ArrowForward,
  ExpandLess,
  ExpandMore,
  FiberManualRecord
} from '@mui/icons-material'; // Changed from @material-ui/icons

import routes from '../../routers/routes';
import { version, git_short_sha } from "../../../package.json";
import { Button } from "../common";

const drawerWidth = 240;

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const openedMixin = (theme) => ({
  paddingTop: 90,
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.sidebar.background,
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  paddingTop: 90,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`, // Adjusted from theme.spacing(9) for MUI v5
  },
  backgroundColor: theme.palette.sidebar.background,
});


const ListItemStyled = styled(ListItem)(({ theme }) => ({
  color: theme.palette.sidebar.color,
  cursor: 'pointer',
  // padding: 16,
  '&:hover': {
    color: theme.palette.sidebar.color,
    backgroundColor: theme.palette.sidebar.hover,
  },
}));

const ListItemActiveStyled = styled(ListItemStyled)(({ theme }) => ({
  color: theme.palette.sidebar.color,
  backgroundColor: theme.palette.sidebar.active
}));


const CloseMutiLevel = ({ route }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { children } = route;
  const { t } = useContext(GlobalContext); // Ensure t is available
  const { canAccessRoute } = useContext(AuthContext);
  const location = useLocation();
  // const theme = useTheme(); // theme might not be needed directly here

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isActive = children.some(route => location.pathname === route.path); // Active if any child is active
  const NodeComponent = isActive ? ListItemActiveStyled : ListItemStyled;


  return (
    <div>
      <NodeComponent
        button="true"
        onClick={handleClick}
      >
        <route.icon style={{ margin: 'auto', height: 24, width: 24 }} />
      </NodeComponent>
      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {
          children
            .filter(route => canAccessRoute(route.authName))
            .filter(route => route.sidebar !== false)
            .map((route, key) => (
              <NavLink key={key} to={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <MenuItem onClick={handleClose}>
                  {t(route.name)}
                </MenuItem>{/* Use t() for child names */}
              </NavLink>
            ))
        }
      </Menu>
    </div>
  );

}

const OpenMultiLevel = ({ route }) => {
  const location = useLocation();
  const { children } = route;
  const { t } = useContext(GlobalContext);
  const { canAccessRoute } = useContext(AuthContext);
  // const theme = useTheme();
  const [open, setOpen] = React.useState(route.children.findIndex(route => route.path === location.pathname) > -1);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  // console.log(children)
  return (
    <React.Fragment>
      <ListItemStyled button="true" onClick={handleClick}>
        <route.icon style={{ margin: 'auto', height: 24, width: 24 }} />
        <ListItemText
          sx={{
            ml: 1,
            "span": { fontSize: '16px' }
          }}
          primary={t(route.name)}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemStyled>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            children
              .filter(route => canAccessRoute(route.authName))
              .filter(route => route.sidebar !== false)
              .map((route, key) => {
                const isActive = location.pathname === route.path;
                const NodeComponent = isActive ? ListItemActiveStyled : ListItemStyled;
                return (
                  <NavLink key={key} to={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <NodeComponent button="true">
                      <FiberManualRecord sx={{ width: 10, mr: 1.25, fontSize: '0.6rem', ml: 2 }} />
                      <ListItemText
                        primary={t(route.name)}
                      />
                    </NodeComponent>
                  </NavLink>
                )
              })}
        </List>
      </Collapse>
    </React.Fragment >
  );
};
const SingleLevel = ({ route, open }) => {
  const location = useLocation();
  const { t } = useContext(GlobalContext);
  const isActive = location.pathname === route.path;
  const NodeComponent = isActive ? ListItemActiveStyled : ListItemStyled;

  return (
    <NavLink to={route.path} style={{ textDecoration: 'none', color: 'inherit' }}>
      <NodeComponent button="true">
        <route.icon style={{ margin: 'auto', height: 24, width: 24 }} />
        {open && <ListItemText
          sx={{
            ml: 1,
            "span": { fontSize: '16px' }
          }}
          primary={t(route.name)}
        />}
      </NodeComponent>
    </NavLink>
  );
};
const Siderbar = ({ open, setOpen }) => {
  const theme = useTheme();
  const { canAccessRoute } = useContext(AuthContext);

  return (
    <StyledDrawer variant="permanent" open={open}>
      <List sx={{ height: 'calc(100vh - 175px)', overflow: 'auto', paddingTop: 0 }}> {/* Removed style, added paddingTop 0 */}
        {
          routes
            .filter(route => canAccessRoute(route.authName))
            .filter(route => route.sidebar !== false)
            .map(route => Array.isArray(route.children)
              ?
              open
                ? <OpenMultiLevel key={route.name} route={route} />
                : <CloseMutiLevel key={route.name} route={route} />
              : <SingleLevel key={route.name} route={route} open={open} />)
        }
      </List>
      {/* <div style={{ flex: 1 }}></div> */}
      <div
        style={{
          position: 'fixed',
          width: open ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
          display: 'flex',
          justifyContent: 'space-between',
          padding: open ? '0 20px' : '',
          alignItems: 'center',
          bottom: 20,
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}>
        {open && <span style={{ color: '#fff' }}>v{version}({git_short_sha})</span>} {/* Use theme color */}
        <Button
          size="small"
          color="inherit"
          onClick={() => setOpen(!open)}
          sx={{ margin: open ? '' : 'auto' }}
        >
          {open ? <ArrowBack /> : <ArrowForward />}
        </Button>
      </div>
    </StyledDrawer>)
}

export default Siderbar;