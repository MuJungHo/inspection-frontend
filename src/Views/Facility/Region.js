import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Blacklist = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("blacklist") })}</h5>
  );
}


export default Blacklist;