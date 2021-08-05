import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AddLocationModal from "./AddLocationModal";

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
      zoom={16}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker globalPositionHandler={props.globalPositionHandler} />
      {markersData &&
        markersData.map((marker, i) => {
          return (
            <Marker key={i} position={[marker.lat, marker.lng]}>
              <Popup>{marker.description}</Popup>{" "}
            </Marker>
          );
        })}
      <AddLocationModal
        addLocation={props.addLocation}
        globalPosition={props.globalPosition}
      />
    </MapContainer>
  );
}

export default MapComponent;
