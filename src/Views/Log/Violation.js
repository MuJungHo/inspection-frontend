import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Violation = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("violation") })}</h5>
  );
}


export default Violation;