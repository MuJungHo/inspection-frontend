import * as React from "react";
function SvgDataTable(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      viewBox="0 -960 960 960"
      width={24}
      fill="currentColor"
      {...props}
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200zm0-507h560v-133H200v133zm0 214h560v-134H200v134zm0 213h560v-133H200v133zm40-454v-80h80v80h-80zm0 214v-80h80v80h-80zm0 214v-80h80v80h-80z" />
    </svg>
  );
}
export default SvgDataTable;
