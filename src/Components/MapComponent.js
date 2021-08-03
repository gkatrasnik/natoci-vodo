import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";
=======
import { MapContainer, TileLayer } from "react-leaflet";
>>>>>>> ecca7762bf4fcb0ac20e9693823f82966a2768d5

import useStyles from "../Styles";
import LocationMarker from "./LocationMarker";

function MapComponent(props) {
  const classes = useStyles();

  return (
    <MapContainer
      className={classes.MapComponent}
      center={[46.056946, 14.505751]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker globalPositionHandler={props.globalPositionHandler} />
    </MapContainer>
  );
}

export default MapComponent;
