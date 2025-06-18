import React, { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";


const Device = () => {
  const { t, authedApi } = useContext(GlobalContext);
  
  authedApi.regions.getRegions()
    .then((regions) => {
      console.log("Regions:", regions);
    })
    .catch((error) => {
      console.error("Error fetching regions:", error);
    });

  window.api = authedApi;

  return (
    <h5>{t("current-location", { page: t("device") })}</h5>
  );
}


export default Device;