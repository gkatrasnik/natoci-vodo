import React, { useState, useEffect, useRef, useMemo } from "react";
import { useMap, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { Fab } from "@material-ui/core";
import { LocationSearching, MyLocation } from "@material-ui/icons";
import "./../App.css";

function LocationMarker(props) {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);

  const map = useMap();
  const markerRef = useRef(null);

  //custom current location icon
  const LeafIcon = L.Icon.extend({
    options: {},
  });
  const greenIcon = new LeafIcon({
    iconUrl: process.env.PUBLIC_URL + "/icons/myLocation.png",
  });
  const [icon, setIcon] = useState(greenIcon);

  //on locate set component and global position
  useEffect(() => {
    locate();
  }, []);

  const locate = () => {
    map.locate().on("locationfound", function (e) {
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
        <Circle key={"acccuracy"} center={position} radius={accuracy} />,
      ];
}

export default LocationMarker;
