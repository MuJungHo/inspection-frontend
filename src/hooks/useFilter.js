import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { initFilters } from "../utils/constant";

export const useFilter = (key) => {
  const { globalFilter, applyGlobalFilter } = useContext(GlobalContext);
  const setFilter = (data) => applyGlobalFilter(key, data);
  const clearFilter = () => applyGlobalFilter(key, initFilters[key]);
  return [globalFilter[key], setFilter, clearFilter];
};