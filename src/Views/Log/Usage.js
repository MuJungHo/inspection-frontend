import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Usage = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("usage") })}</h5>
  );
}


export default Usage;