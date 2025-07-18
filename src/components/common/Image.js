import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

const Image = ({
  style = {},
  name = "",
  src = ""
}) => {
  const { openDialog } = useContext(GlobalContext);

  const imageStyle = {
    height: 32,
    cursor: 'pointer'
  }

  const openImageDialog = () => {
    openDialog({
      title: name,
      maxWidth: "sm",
      fullWidth: true,
      section: <img src={src} alt={name} />
    })
  }

  return (
    <img
      onClick={openImageDialog}
      style={{ ...imageStyle, ...style }}
      src={src} alt={name} />
  );
};

export default Image;