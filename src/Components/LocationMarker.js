import React, { useState, useEffect, useRef, useMemo } from "react";
import { useMap, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { Fab, makeStyles } from "@material-ui/core";
import { LocationSearching, MyLocation } from "@material-ui/icons";
import "./../App.css";

const useStyles = makeStyles({
  currentLocationStyle: {
    zIndex: 500,
    position: "absolute !important",
    bottom: "200px",
    right: "8%",
  },
});

function LocationMarker(props) {
  const classes = useStyles();
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  const map = useMap();
  const markerRef = useRef(null);

  //on locate set component and global position
  useEffect(() => {
    locate();
  }, []);

  const locate = () => {
    map.locate({ enableHighAccuracy: true }).on("locationfound", function (e) {
      let radius = e.accuracy;
      const newPos = e.latlng;
      map.flyTo(newPos, 16);
      setAccuracy(radius);
      setPosition([newPos.lat, newPos.lng]);
      props.globalPositionHandler([newPos.lat, newPos.lng]);
    });

    map.locate().on("locationerror", function (e) {
      alert(`${e.message}\nTurn on Location Services!`);
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

  return position === null ? null : (
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
        <Popup>You are here</Popup>
      </Marker>
    </>
  );
}

export default LocationMarker;
