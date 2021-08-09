import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AddLocationModal from "./AddLocationModal";
import { makeStyles } from "@material-ui/core";
import { firestore, timestamp } from "./Firebase";
import LocationMarker from "./LocationMarker";
import "./../App.css";

const useStyles = makeStyles({
  mapStyle: {
    height: "95vh",
    width: "100%",
  },
});

function MapComponent(props) {
  const classes = useStyles();
  const [markersData, setMarkersData] = useState([]);

  useEffect(() => {
    getMarkersData();
  }, []);

  //get markers from Firestore
  const getMarkersData = async () => {
    firestore
      .collection("vode")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setMarkersData((markersData) => [...markersData, doc.data()]);
        });
      });
  };

  const [globalPosition, setGlobalPosition] = useState([]);

  //on app load download markers data from firestore

  const addLocation = (description) => {
    firestore
      .collection("vode")
      .add({
        lat: globalPosition[0],
        lng: globalPosition[1],
        description: description,
        created: timestamp,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    alert(`you successfully added Location \n${description}`);
  };

  const globalPositionHandler = (position) => {
    setGlobalPosition(position);
  };

  return (
    <MapContainer
      className={classes.mapStyle}
      center={[46.056946, 14.505751]}
      zoom={16}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker globalPositionHandler={globalPositionHandler} />
      {markersData &&
        markersData.map((marker, i) => {
          return (
            <Marker key={i} position={[marker.lat, marker.lng]}>
              <Popup>{marker.description}</Popup>{" "}
            </Marker>
          );
        })}
      <AddLocationModal
        addLocation={addLocation}
        globalPosition={globalPosition}
      />
    </MapContainer>
  );
}

export default MapComponent;
