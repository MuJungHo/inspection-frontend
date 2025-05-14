import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Overstay = () => {
  const { t } = useContext(GlobalContext);
  return (
    <h5>{t("current-location", { page: t("overstay") })}</h5>
  );
}


export default Overstay;