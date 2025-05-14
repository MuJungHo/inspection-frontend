import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const Device = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("device") })}</h5>
  );
}


export default Device;