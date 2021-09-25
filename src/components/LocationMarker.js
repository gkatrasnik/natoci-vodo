import React, { useState, useEffect, useRef, useMemo } from "react";
import { useMap, Marker, Popup, Circle } from "react-leaflet";
import Alert from "@material-ui/lab/Alert";
import { Fab, makeStyles, Typography, Button } from "@material-ui/core";
import { MyLocation } from "@material-ui/icons";
import "./../App.css";

const useStyles = makeStyles({
  currentLocationStyle: {
    zIndex: 500,
    position: "absolute !important",
    bottom: "200px",
    right: "25px",
  },
  currentMarkerStyle: {
    zIndex: "1500!important",
  },
  locationAlert: {
    width: "90%",
    justifyContent: "center",
    zIndex: 500,
    position: "absolute !important",
    top: "64px",
    left: "5%",
  },
  refreshButton: {
    marginTop: "10px",
  },
});

function LocationMarker(props) {
  const classes = useStyles();
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const map = useMap();
  const markerRef = useRef(null);

  //on locate set component and global position
  useEffect(() => {
    locate();
  }, []);

  const locate = () => {
    map
      .locate({ enableHighAccuracy: true })
      .on("locationfound", function (e) {
        let radius = e.accuracy;
        const newPos = e.latlng;
        map.setView(newPos, 16, {
          animate: true,
          duration: 1,
        });
        setAccuracy(radius);
        setPosition([newPos.lat, newPos.lng]);
        props.globalPositionHandler([newPos.lat, newPos.lng]);
        setErrorMessage(null);
      })
      .on("locationerror", function (e) {
        setErrorMessage(
          `${e.message}\nTurn on and Allow Location Services, then restart the App!`
        );
      });
  };

  // on marker drag set component and global position
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setPosition([newPos.lat, newPos.lng]);
          props.globalPositionHandler([newPos.lat, newPos.lng]);
        }
      },
    }),
    []
  );

  return position === null ? (
    <Alert className={classes.locationAlert} severity="error" variant="filled">
      <Typography>{errorMessage}</Typography>
      <Button
        variant="contained"
        className={classes.refreshButton}
        onClick={locate}
      >
        Refresh
      </Button>
    </Alert>
  ) : (
    <>
      <Fab className={classes.currentLocationStyle} onClick={locate}>
        <MyLocation />
      </Fab>
      <Circle center={position} radius={accuracy} />

      <Marker
        draggable={true}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup>
          <Typography>Your location</Typography>
        </Popup>
      </Marker>
    </>
  );
}

export default LocationMarker;
