import { useContext, useCallback } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
export const useFilter = (key) => {
  const { globalFilter, applyGlobalFilter } = useContext(GlobalContext);
  const setFilter = useCallback((data) => applyGlobalFilter(key, data), []);
  
  return [globalFilter[key], setFilter];
};