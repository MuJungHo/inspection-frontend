import React, {
  // useContext
} from "react";
// import { GlobalContext } from "../contexts/GlobalContext";
import {
  Paper
} from "../components/common";

const Layout = () => {
  // const { t } = useContext(GlobalContext);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-between', padding: 20 }}>
      <div style={{ display: 'flex', width: '100%', height: "calc(33% - 12px)" }}>
        <Paper style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ display: 'flex', width: '100%', height: "calc(33% - 12px)", justifyContent: 'space-between' }}>
        <Paper style={{ width: "calc(50% - 8px)" }} />
        <Paper style={{ width: "calc(50% - 8px)" }} />
      </div>
      <div style={{ display: 'flex', width: '100%', height: "calc(33% - 12px)", justifyContent: 'space-between' }}>
        <Paper style={{ width: "calc(25% - 12px)" }} />
        <Paper style={{ width: "calc(25% - 12px)" }} />
        <Paper style={{ width: "calc(25% - 12px)" }} />
        <Paper style={{ width: "calc(25% - 12px)" }} />
      </div>
    </div >
  );
}


export default Layout;