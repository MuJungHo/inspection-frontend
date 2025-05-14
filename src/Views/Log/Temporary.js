import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Temporary = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("temporary") })}</h5>
  );
}


export default Temporary;