import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Override = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("override") })}</h5>
  );
}


export default Override;