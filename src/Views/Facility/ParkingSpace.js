import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { Progress, Button } from "../../components/common";
import { useParams } from "react-router-dom";
// import { Add } from "../../images/icons";
import { useLocation } from "react-router";
import {
  Search,
  ArrowBack
} from '@mui/icons-material';
// import { host } from "../../utils/api/axios";
// import Vehicle from "../../components/vehicle/Vehicle";
// import { DateRangePicker } from 'rsuite';
import dayjs from "dayjs";
import { initFilters } from "../../utils/constant";
import { useFilter } from "../../hooks/useFilter";
import { MapContainer, Marker, Popup, TileLayer, ImageOverlay, ZoomControl } from "react-leaflet";
import L, { CRS } from "leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import Control from 'react-leaflet-custom-control';
import ButtonGroup from '@mui/material/ButtonGroup';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import ParkingSpacePopup from "../../components/Facility/ParkingSpacePopup";
import "leaflet/dist/leaflet.css";
import 'react-leaflet-markercluster/styles';
import { host } from "../../utils/api/axios";
const size = 20;
const red = "#E53B2F"
const greed = "#81c784"
const occupied = L.divIcon({
  className: '',
  html: `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <circle fill=${red} cx="12" cy="12" r="8" opacity=".5"></circle>
  <path fill=${red} d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"></path>  
  </svg>`,
  iconSize: [size * 2, size * 2],
  iconAnchor: [size, size]
});

const avaliable = L.divIcon({
  className: '',
  html: `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <circle fill=${greed} cx="12" cy="12" r="8" opacity=".5"></circle>
  <path fill=${greed} d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8"></path>  
  </svg>`,
  iconSize: [size * 2, size * 2],
  iconAnchor: [size, size]
});

const NAME = "parking-space";


const ParkingFloor = () => {
  const { t, authedApi,
    // openDialog,
    // closeDialog,
    // openSnackbar,
    // openWarningDialog,
  } = useContext(GlobalContext);
  const pollingRef = useRef(null);

  const [progress, setProgress] = React.useState(0);
  const { parkingFacilityId, parkingFloorId } = useParams();
  const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });

  const [ParkingFloor, setParkingFloor] = React.useState({})
  const [ParkingSpaceList, setParkingSpaceList] = React.useState([]);
  // const lastPage = location.pathname.split("/")[1];

  const prevPages =
    [
      { name: t("parking-facility"), path: `/#/parking-facility` },
      { name: t("parking-floor"), path: `/#/parking-floor/${parkingFacilityId}` }
    ]

  React.useEffect(() => {
    getAllParkingSpacesByFloor();
  }, [])

  const getImageSize = (src) => new Promise((resolve, reject) => {
    let img = new Image()
    img.onload = () => resolve({ height: img.height, width: img.width })
    img.onerror = reject
    img.src = src
  })

  const getAllParkingSpacesByFloor = async () => {
    let totalParkingSpaces = 0;

    let skip = 0;
    const amount = 200;

    const { data: _ParkingFloor } = await authedApi.
      parkingFloors.getParkingFloor({ parkingFloorId });

    const { width, height } = await getImageSize(`${host}/api/v1/Image/${_ParkingFloor.imageFileId}`);

    setImageSize({
      width, height
    })

    totalParkingSpaces = _ParkingFloor.totalParkingSpaces;

    let spacePromiseList = [];
    let statusPromiseList = [];
    let statusList = [];
    let spaceList = [];

    while (skip < totalParkingSpaces) {
      const spaces = await authedApi
        .parkingFloors
        .getParkingSpacesByFloor({ amount, skip, parkingFloorId });
      spacePromiseList.push(spaces);

      const status = await authedApi
        .parkingFloors
        .getParkingSpacesStatusByFloor({ amount, skip, parkingFloorId });
      statusPromiseList.push(status)
      skip = skip + amount;

      setProgress(Math.round(skip / totalParkingSpaces * 100))
    }

    await Promise.all(spacePromiseList).then(promise => {
      promise.forEach(item => {
        if (item.success) {
          spaceList = spaceList.concat(item.data)
        }
      })
    })

    await Promise.all(statusPromiseList).then(promise => {
      promise.forEach(item => {
        if (item.success) {
          statusList = statusList.concat(item.data)
        }
      })
    })

    const _status = new Map(statusList.map(d => [d.parkingSpaceId, d]));

    const _rows = spaceList.map(a => ({
      ...a,
      _id: a.parkingSpaceId,
      ..._status.get(a.parkingSpaceId),
    }));

    setParkingFloor(_ParkingFloor);
    setParkingSpaceList(_rows);

  }
  const bounds = [[0, 0], [imageSize.height, imageSize.width]];

  if (!ParkingFloor.imageFileId) return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Progress value={progress} />
  </div>;

  return (
    <MapContainer
      crs={CRS.Simple}
      bounds={bounds}
      maxBounds={bounds}
      minZoom={-5}
      maxZoom={5}
      zoomSnap={.2}
      zoomControl={false}
      style={{ width: "100%", height: "100%" }}
    >
      <ImageOverlay
        url={`${host}/api/v1/Image/${ParkingFloor.imageFileId}`}
        bounds={bounds}
        opacity={1}
        interactive={false}
      />
      <ZoomControl position='bottomright' />
      <Control prepend position='topleft'>
        <Breadcrumbs aria-label="breadcrumb">
          {
            prevPages.map(prevPage => <Link
              underline="hover"
              variant="h6"
              // color="inherit"
              key={prevPage.name}
              href={prevPage.path}
            >
              {prevPage.name}
            </Link>)
          }
          <Typography variant="h6" component="div">
            {t(NAME)}
          </Typography>
        </Breadcrumbs>
      </Control>
      <MarkerClusterGroup>
        {
          ParkingSpaceList.map(space => <Marker
            icon={space.occupied ? occupied : avaliable}
            key={space.parkingSpaceId}
            position={[space.position.y * imageSize.height, space.position.x * imageSize.width]}
          >
            <Popup>
              <ParkingSpacePopup space={space} />
            </Popup>
          </Marker>)
        }
      </MarkerClusterGroup>

    </MapContainer>
  );
}


export default ParkingFloor;