import React, { useContext } from 'react';
import { AuthContext } from "../../contexts/AuthContext";
import { GlobalContext } from "../../contexts/GlobalContext";
import { styled, useTheme } from '@mui/material/styles';
import LanguageSharpIcon from '@mui/icons-material/LanguageSharp';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Logo from '../../images/delta.svg?react';
import { DarkMode, LightMode } from "../../images/icons";
import { Button, IconButton, Image } from "../common";

import * as signalR from "@microsoft/signalr";

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  boxShadow: 'unset',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  color: theme.palette.appbar.color,
  backgroundColor: theme.palette.appbar.background,
  backgroundImage: "unset",
  '& .MuiToolbar-root': {
    height: 80,
  },
  '& svg': {
    // color: theme.palette.appbar.svg,
  },
  borderBottom: '6px solid rgb(100, 215, 215)',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    height: 6,
    width: '60%',
    left: 0,
    top: 80,
    backgroundColor: 'rgb(0, 135, 220)',
  },
  '&::after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    height: 6,
    right: 0,
    top: 80,
    width: '20%',
    backgroundColor: 'rgb(185, 235, 95)',
  },
}));

const Appbar = ({ open }) => {
  const { logout, account, token } = useContext(AuthContext);
  const { locale, changeLocale, t, changeTheme, themeMode, authedApi, openSnackbar } = useContext(GlobalContext);
  const [anchor, setAnchor] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);


  const languageMenuOpen = !!anchor;

  const handleChangeLocale = (newLocale) => {
    changeLocale(newLocale);
    setAnchor(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    logout();
  };

  // const postTestNotify = async () => {
  //   await authedApi.statistics.postTestNotify({
  //     data: {
  //       type: "BlacklistHit",
  //       message: "車牌黑名單：ABC-123",
  //       time: "2025-10-21T04:30:12.3456789Z",
  //       imageFileId: "7ff7b448-2890-49e4-8791-ad6dfa8465fc"
  //     }
  //   })
  // }

  return (
    <AppBarStyled position="fixed" open={open}>
      <Toolbar sx={{ display: 'flex' }}>
        <Logo style={{ cursor: 'pointer', height: 32, width: 106 }} />
        <div style={{ flex: 1 }} />
        <Button
          size="small"
          color="inherit"
          onClick={(e) => setAnchor(e.currentTarget)}
        >
          <LanguageSharpIcon />
          {locale}
        </Button>
        <Button
          size="small"
          color="inherit"
          onClick={() => changeTheme(themeMode === "dark" ? "light" : "dark")}
        >
          {themeMode === "dark" ? <LightMode /> : <DarkMode />}
        </Button>
        <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0 }}>
          <Avatar style={{ width: 32, height: 32 }}>{account?.slice(0, 3)}</Avatar>
        </IconButton>
        {/* <IconButton size="small" onClick={postTestNotify}>
          <Avatar style={{ width: 32, height: 32 }}>{account?.slice(0, 3)}</Avatar>
        </IconButton> */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
        </Menu>
        <Menu
          open={languageMenuOpen}
          anchorEl={anchor}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={() => setAnchor(null)}
        >
          <MenuItem selected={locale === 'en'} onClick={() => handleChangeLocale('en')}>
            English
          </MenuItem>
          <MenuItem selected={locale === 'zh-TW'} onClick={() => handleChangeLocale('zh-TW')}>
            繁體中文
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBarStyled>
  );
};

export default Appbar;