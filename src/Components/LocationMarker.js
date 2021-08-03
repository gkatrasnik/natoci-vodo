import React, { useState, useEffect, useRef, useMemo } from "react";
import { useMap, Marker, Popup } from "react-leaflet";

import { Fab } from "@material-ui/core";
import { MyLocation } from "@material-ui/icons";
import "./../App.css";

function LocationMarker(props) {
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
      map.flyTo(newPos, map.getZoom());
      setPosition([newPos.lat, newPos.lng]);
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
        <Fab className="currentLocationStyle" onClick={locate} key={"fab"}>
          <MyLocation />
        </Fab>,

        <Marker
          key={"marker"}
          draggable={true}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}
        >
          <Popup>You are here</Popup>
        </Marker>,
      ];
}

export default LocationMarker;
