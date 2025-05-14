import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const Setting = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("setting") })}</h5>
  );
}


export default Setting;