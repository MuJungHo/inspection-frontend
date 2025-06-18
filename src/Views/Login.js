import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { GlobalContext } from "../contexts/GlobalContext";
import { Navigate } from "react-router-dom";
import { api } from "../utils/apis";
import { styled } from '@mui/material/styles';
import {
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Card
} from '@mui/material';
import Logo from '../images/delta.svg?react';

const StyledContainer = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  backgroundImage: 'radial-gradient(circle at 48% 33%, #0f72a4, #1d3654 96%)',
  opacity: 0.88,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: 520,
  width: 420,
  // ['@media (max-width: 450px)']: {
  //   height: 470,
  //   width: 340,
  // },
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%', // Fix IE 11 issue.
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3)
}));

const Title = styled('h1')(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  textAlign: 'center'
}));

const StyledLogo = styled(Logo)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  height: 30,
  margin: '0 auto 24px auto',
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  height: 50
}));

const Spacer = styled('div')({
  flex: '1 1 auto'
});

const Login = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const { login, token, setKeep, keep, logout } = useContext(AuthContext);
  const { t, changeLocale, locale, openSnackbar } = useContext(GlobalContext);

  if (token) {
    return <Navigate to="/" />
  }

  const handleChagneLocale = (e) => {
    changeLocale(e.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const apiInstance = api(logout);
      const response = await apiInstance.auth.postAuthLogin({ 
        data: { 
          username: account, 
          password 
        } 
      });
      
      
      const { token, expireAt } = response;
      
      // 將 token 存放到 AuthContext 中
      login(token);
    } catch (error) {
      console.error('登入失敗:', error);
      openSnackbar({
        severity: 'error',
        message: error.response?.data?.message || error.message || t('login-failed')
      });
    }
  }

  return (
    <StyledContainer>
      <StyledCard>
        <StyledForm noValidate onSubmit={handleLogin}>
          <Title>{t('welcome')}</Title>
          <StyledLogo style={{
            height: 40, // Overriding default height from styled component if needed
          }} />

          <FormControl fullWidth sx={{ mb: 2.5 }}>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={account}
              onChange={e => setAccount(e.target.value)}
              label={t("account")}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              variant="outlined"
              required
              fullWidth
              value={password}
              onChange={e => setPassword(e.target.value)}
              name="password"
              label={t("password")}
              type="password"
              autoComplete="current-password"
            />
          </FormControl>
          <FormControlLabel
            value="end"
            style={{ marginBottom: 10 }}
            control={<Checkbox color="primary" checked={keep} onChange={e => {
              setKeep(e.target.checked)
            }} />}
            label={t("keep-me")}
            labelPlacement="end"
          />
          <FormControl variant="outlined" fullWidth>
            <Select
              value={locale}
              onChange={handleChagneLocale}
              displayEmpty
            >
              <MenuItem value={'en'}>English</MenuItem>
              <MenuItem value={'zh-TW'}>繁體中文</MenuItem>
            </Select>
          </FormControl>
          <Spacer />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {t('login')}
          </SubmitButton>
        </StyledForm>
      </StyledCard>
    </StyledContainer>
  );
};

export default Login;