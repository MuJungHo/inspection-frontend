import * as React from "react";
function SvgIdCard(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={24}
      viewBox="0 -960 960 960"
      width={24}
      fill="currentColor"
      {...props}
    >
      <path d="M560-440h200v-80H560v80zm0-120h200v-80H560v80zM200-320h320v-22q0-45-44-71.5T360-440q-72 0-116 26.5T200-342v22zm160-160q33 0 56.5-23.5T440-560q0-33-23.5-56.5T360-640q-33 0-56.5 23.5T280-560q0 33 23.5 56.5T360-480zM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160zm0-80h640v-480H160v480zm0 0v-480 480z" />
    </svg>
  );
}
export default SvgIdCard;
