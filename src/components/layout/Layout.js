import React from 'react';
import { styled } from '@mui/material/styles';
import Appbar from './Appbar'; // Updated import
import Siderbar from './Siderbar'; // Updated import

const RootStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  paddingTop: 80, // This might need adjustment if Appbar height changes
  color: theme.palette.layout.color,
  backgroundColor: theme.palette.layout.background,
  height: '100vh',
}));

const MainStyled = styled('main')({
  flexGrow: 1,    // 允許元件擴展以填滿可用空間
  flexShrink: 1,  // 允許元件在空間不足時收縮
  width: '100%',  // 初始嘗試佔據父容器的100%寬度，flexbox會再調整
  minWidth: 0, // 確保內容過多時，元件可以正確縮小
  overflow: 'auto',
  paddingTop: 6, // Consider using theme.spacing or ensure this is intentional
});

const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(true);

  return (
    <RootStyled>
      <Appbar open={open} />
      <Siderbar open={open} setOpen={setOpen} />
      <MainStyled>
        {children}
      </MainStyled>
    </RootStyled>)
}

export default Layout;