import { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Image } from "../common";
import { host } from "../../utils/api/axios";
import Typography from '@mui/material/Typography';

const ParkingSpacePopup = ({
  space
}) => {
  const { t, 
  } = useContext(GlobalContext);

  // console.log(space)
  return (<>{
    space.occupied
      ? <>
        <Typography variant="h6" component="div">{`${t("name")}: ${space.spaceNumber}`}</Typography>
        <Typography variant="h6" component="div">{`${t("type")}: ${space.spaceType}`}</Typography>
        <Typography variant="h6" component="div">{`${t("plate-number")}: ${space.licensePlate}`}</Typography>
        <Typography variant="h6" component="div">{`${t("create-time")}: ${space.occupiedStart}`}</Typography>
        <Typography variant="h6" component="div">{`${t("snapshot-image")}: ${space.snapshotAt}`}</Typography>
        {
          space.snapshots.map(snapshot => <Image
            key={snapshot}
            name={t('snapshot-image')}
            src={`${host}/api/v1/Image/${snapshot}`}
          />)
        }

      </>
      : <>
        <Typography variant="h6" component="div">{`${t("name")}: ${space.spaceNumber}`}</Typography>
        <Typography variant="h6" component="div">{`${t("type")}: ${space.spaceType}`}</Typography>
      </>
  }
  </>
  );
};

export default ParkingSpacePopup;