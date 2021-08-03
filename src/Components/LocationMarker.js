import React, { useState, useEffect, useRef, useMemo } from "react";
import { useMap, Marker, Popup } from "react-leaflet";
import { Fab } from "@material-ui/core";
import { MyLocation } from "@material-ui/icons";
import useStyles from "../Styles";

function LocationMarker(props) {
  const classes = useStyles();
  const [position, setPosition] = useState(null);
  const map = useMap();
  const markerRef = useRef(null);

  //on locate set component and global position
  useEffect(() => {
    locate();
  }, [map]);

  const locate = () => {
    map.locate().on("locationfound", function (e) {
      const newPos = e.latlng;
      setPosition([newPos.lat, newPos.lng]);
      map.flyTo(newPos, map.getZoom());
      props.globalPositionHandler([newPos.lat, newPos.lng]);
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

  return position === null
    ? null
    : [
        <Fab className={classes.CurrentLocation} onClick={locate} key={"fab"}>
          <MyLocation />
        </Fab>,

        <Marker
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
          key={"marker"}
        >
          <Popup>You are here</Popup>
        </Marker>,
      ];
}

export default LocationMarker;
