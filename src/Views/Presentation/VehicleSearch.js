import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
// import { AuthContext } from "../contexts/AuthContext";
import { Paper, Text, TextField, Button, Image } from "../../components/common";
import { Add } from "../../images/icons";
import {
  // BorderColorSharp,
  // Delete,
  // CheckCircle,
  // Cancel
  ArrowLeftSharp
} from '@mui/icons-material';
import dayjs from "dayjs";

const VehicleSearch = () => {
  const { t, authedApi,
    // openDialog, closeDialog, openSnackbar, openWarningDialog, 
  } = useContext(GlobalContext);
  const [plateNumber, setPlateNumber] = React.useState("");
  const [vehicles, setVehicles] = React.useState([]);
  const [status, setStatus] = React.useState(true);
  const handleSearch = async (event) => {

    event.preventDefault();

    const { data, success } = await authedApi.vehicle.getVehicleDataSearchByPlateNumber({ plateNumber });
    const _data = data.slice(0, 4);
    setStatus(false)
    setVehicles(_data)
  }
  return (
    <>
      {
        status
          ?
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <form onSubmit={handleSearch} style={{ width: '50%', height: '60%' }}>
              <Text style={{ fontSize: 64 }}>{t("vehicle-search")}</Text>
              <Text style={{ fontSize: 36, color: '#bebebe' }}>{t("input-plate-number")}</Text>
              <TextField label={t("plate-number")} value={plateNumber} onChange={e => setPlateNumber(e.target.value)} style={{ marginTop: 16 }} fullWidth />
              <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                marginTop: 20
              }}>
                <Button type="submit" style={{ width: 150 }} variant="contained">{t("search")}</Button>
              </div>
            </form>
          </div>
          :
          <div style={{
            height: '100%',
            padding: 8,
            // display: 'flex',
            // flexDirection: 'column'
          }} >
            <Button
              style={{ position: 'sticky', top: 8 }}
              variant="contained"
              onClick={() => setStatus(true)}><ArrowLeftSharp />{t("re-search")}</Button>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              flex: 1
            }}>
              {
                vehicles.map((vehicle, i) => <div
                  key={i}
                  style={{
                    padding: 8,
                    width: 'calc(50% - 0px)',
                    // height: 'calc(50% - 16px)',
                    display: 'flex',
                    flexDirection: 'column',
                    // marginRight: 16,
                    // marginLeft: i % 2 === 0 ? 16 : 0
                  }}>
                  <Text>{`${t("plate-number")}: ${vehicle.plateNumber}`}</Text>
                  <Text>{`${t("parking-space")}: ${vehicle.spaceNumber}`}</Text>
                  <Text>{`${t("type")}: ${vehicle.spaceType}`}</Text>
                  {/* <Text>{`${t("datetime")}: ${dayjs(vehicle.occupiedStart).format("YYYY/MM/DD HH:mm")}`}</Text> */}
                  <Text>{`${t("create-time")}: ${dayjs(vehicle.snapshotAt).format("YYYY/MM/DD HH:mm")}`}</Text>
                  <Image
                    style={{
                      margin: 'auto',
                      maxWidth: '100%',
                      maxHeight: '100%',
                      height: '100%',
                      width: '100%'
                    }}
                    name={t('snapshot-image')}
                    src={vehicle.snapshotUrl}
                  />
                </div>)
              }
            </div>
          </div>
      }
    </>
  );
}


export default VehicleSearch;