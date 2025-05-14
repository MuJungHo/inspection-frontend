import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Tracking = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("tracking") })}</h5>
  );
}


export default Tracking;