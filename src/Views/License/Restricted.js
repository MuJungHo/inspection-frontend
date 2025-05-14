import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Restricted = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("restricted") })}</h5>
  );
}


export default Restricted;