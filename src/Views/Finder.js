import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

const Finder = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("finder") })}</h5>
  );
}


export default Finder;