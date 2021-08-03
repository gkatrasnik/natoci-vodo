import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import "./../App.css";
import firebase from "./Firebase.js";
import "firebase/firestore";
import LocationMarker from "./LocationMarker";
import MarkersData from "./MarkersData";

function MapComponent(props) {
  const [markersData, setMarkersData] = useState(null);

  return (
    <MapContainer
      className="mapStyle"
      center={[46.056946, 14.505751]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker globalPositionHandler={props.globalPositionHandler} />

      <Fab className="addLocationStyle" onClick={props.addLocation}>
        <Add />
      </Fab>
    </MapContainer>
  );
}

export default MapComponent;
