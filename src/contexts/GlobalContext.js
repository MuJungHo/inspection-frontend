import React, { useState, createContext, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CustomProvider } from 'rsuite';
import { AuthContext } from './AuthContext';
import Alert from '@mui/material/Alert';
import {
  Snackbar,
  Dialog,
  DialogTitle,
  // DialogContent,
  // DialogActions,
  IconButton,
  Typography,
  // Button
  // DialogContentText
} from '@mui/material';

import Close from '@mui/icons-material/Close';

import { lighten_palette, dark_palette } from "../customTheme";

import i18n from '../i18n';
import { api } from '../utils/apis';
import WarningSection from '../components/WarningSection';
import { instance as axiosInstance } from "../utils/apis"; // Renamed for clarity
import "../style/normalize.css";
import 'rsuite/dist/rsuite.min.css';

// Import rsuite locales dynamically
const rsuiteLocales = {
  enUS: () => import('rsuite/locales/en_US'),
  zhTW: () => import('rsuite/locales/zh_TW'),
};

const light = createTheme({
  palette: {
    mode: 'light',
    ...lighten_palette
  }
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    ...dark_palette
  }
});

const GlobalContext = createContext();

function GlobalProvider({ children, ...rest }) {
  const { logout, token } = useContext(AuthContext);
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'zh-TW');
  const [themeMode, setThemeMode] = useState(localStorage.getItem("theme") || "light");
  const [rsuiteLocaleData, setRsuiteLocaleData] = useState(null); // State to hold loaded rsuite locale data

  const [snackBar, setSnackBar] = useState({
    open: false,
    severity: 'info',
    message: ''
  })

  const [dialog, setDialog] = useState({
    title: "",
    open: false,
    warning: false,
    section: <></>
  })
  // console.log(dialog)

  const currentTheme = themeMode === "dark" ? dark : light;
  const dialogStyle = themeMode === "dark" ? dark_palette.paper : lighten_palette.paper;

  // Provide the t function based on the current locale
  const t = React.useCallback((key, arg) => i18n(locale)(key, arg), [locale]);


  const changeTheme = (themeName) => {
    setThemeMode(themeName);
    localStorage.setItem('theme', themeName)
  };

  const changeLocale = (locale) => {
    setLocale(locale);
    localStorage.setItem('locale', locale)
  };

  const openWarningDialog = ({
    title = "",
    message = "",
    onConfirm = () => { }
  }) => {
    setDialog({
      title,
      open: true,
      warning: true,
      section: <WarningSection message={message} onConfirm={onConfirm} />
    })
  }

  const openDialog = (_dialog) => {
    setDialog({
      open: true,
      ..._dialog
    })
  }

  const closeDialog = () => {
    setDialog({
      title: "",
      open: false,
      warning: false,
      section: <></>
    })
  }

  const openSnackbar = (_snackbar) => {
    setSnackBar({
      open: true,
      severity: 'info',
      message: '',
      ..._snackbar
    })
  }

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar({
      open: false,
      severity: 'info',
      message: ''
    })
  };

  React.useEffect(() => {
    // Load rsuite locale data when locale changes
    const loadRsuiteLocale = async () => {
      try {
        const localeModule = await (locale === "zh-TW" ? rsuiteLocales.zhTW() : rsuiteLocales.enUS());
        setRsuiteLocaleData(localeModule.default || localeModule);
      } catch (e) {
        console.warn("Rsuite locales could not be loaded. Ensure 'rsuite' includes locales or install them separately. Falling back to minimal locale objects.", e);
        setRsuiteLocaleData(locale === "zh-TW" ? { locale: 'zh-TW' } : { locale: 'en-US' }); // Minimal fallback
      }
    };
    loadRsuiteLocale();
  }, [locale]);

  React.useEffect(() => {
    if (token) {
      // api.defaults.headers.common['Authorization'] = token; // Incorrect: api is a function
      axiosInstance.defaults.headers.common['Authorization'] = token; // Correct: use the imported axios instance
    }
  }, [token])


  // console.log(theme)
  return (
    <GlobalContext.Provider
      value={{
        locale,
        changeLocale,
        themeMode, // Use themeMode
        changeTheme,
        snackBar,
        openSnackbar,
        closeSnackbar,
        dialog,
        openDialog,
        closeDialog,
        openWarningDialog,
        logout,
        token,
        t,
        // theme,
        authedApi: api(logout)
      }}
    >
      <ThemeProvider theme={currentTheme}>
        {/* Wait for rsuiteLocaleData to be loaded before rendering CustomProvider */}
        {rsuiteLocaleData && (
          <CustomProvider locale={rsuiteLocaleData} theme={themeMode === "dark" ? "dark" : "light"}>
            <Snackbar
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              open={snackBar.open}
              autoHideDuration={3000}
              onClose={() => setSnackBar({
                ...snackBar,
                open: false,
              })}>
              <Alert
                elevation={6}
                variant="filled"
                onClose={() => setSnackBar({
                  ...snackBar,
                  open: false,
                })} severity={snackBar.severity}>
                {snackBar.message}
              </Alert>
            </Snackbar>
            <Dialog
              // {...dialog}
              // title=""
              // warning=""
              maxWidth={dialog.maxWidth}
              onClose={() => setDialog({ ...dialog, open: false })}
              open={dialog.open}
            >
              {dialog.title && <DialogTitle
                disableTypography
                style={{
                  backgroundColor: dialogStyle.background,
                  color: dialogStyle.color
                }}
              >
                <span style={{
                  fontSize: dialog.titleFontSize || 16
                }}>{dialog.title}</span>
                <IconButton style={{
                  color: dialogStyle.color,
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }} onClick={() => setDialog({ ...dialog, open: false })}>
                  <Close style={{
                    fontSize: dialog.titleFontSize || 21
                  }} />
                </IconButton>
              </DialogTitle>}
              {dialog.section}
            </Dialog>
            {children}
          </CustomProvider>
        )}
      </ThemeProvider>
    </GlobalContext.Provider>
  );
}
const useGlobalContext = () => useContext(GlobalContext)
export { GlobalProvider, GlobalContext, useGlobalContext };