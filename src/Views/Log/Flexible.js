import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Flexible = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("flexible") })}</h5>
  );
}


export default Flexible;