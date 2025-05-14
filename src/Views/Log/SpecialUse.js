import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Specialuse = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("specialuse") })}</h5>
  );
}


export default Specialuse;