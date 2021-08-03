import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Add } from "@material-ui/icons";
import { Fab } from "@material-ui/core";

import useStyles from "../Styles";
import LocationMarker from "./LocationMarker";

function MapComponent(props) {
  const classes = useStyles();

  return (
    <MapContainer
      className={classes.MapComponent}
      center={[46, 14]}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker globalPositionHandler={props.globalPositionHandler} />
      <Fab className={classes.AddLocation}>
        <Add />
      </Fab>
    </MapContainer>
  );
}

export default MapComponent;
