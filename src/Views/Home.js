import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const Home = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("home") })}</h5>
  );
}


export default Home;