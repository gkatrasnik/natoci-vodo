import React, { useState } from "react";
import { useMapEvents, Marker, Popup } from "react-leaflet";

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      console.log(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker draggable={true} position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default LocationMarker;
