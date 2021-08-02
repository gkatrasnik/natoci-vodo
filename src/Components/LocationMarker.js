import React, { useState, useEffect, useRef, useMemo } from "react";
import { useMap, Marker, Popup } from "react-leaflet";

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
      setPosition(newPos);
      map.flyTo(newPos, map.getZoom());
      props.globalPositionHandler(newPos);
    });
  };

  // on marker drag set component and global position
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPos = marker.getLatLng();
          setPosition(newPos);
          props.globalPositionHandler(newPos);
        }
      },
    }),
    []
  );

  return position === null ? null : (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationMarker;
