import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import "./../App.css";
import firebase from "./Firebase.js";
import "firebase/firestore";
import LocationMarker from "./LocationMarker";

function MapComponent(props) {
  const [markersData, setMarkersData] = useState([]);

  useEffect(() => {
    getMarkersData();
  }, []);

  //get markers from Firestore
  const getMarkersData = async () => {
    firebase
      .firestore()
      .collection("vode")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setMarkersData((markersData) => [...markersData, doc.data()]);
        });
      });
  };

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
      {markersData &&
        markersData.map((marker, i) => {
          return <Marker key={i} position={[marker.lat, marker.lng]} />;
        })}

      <LocationMarker globalPositionHandler={props.globalPositionHandler} />

      <Fab className="addLocationStyle" onClick={props.addLocation}>
        <Add />
      </Fab>
    </MapContainer>
  );
}

export default MapComponent;
