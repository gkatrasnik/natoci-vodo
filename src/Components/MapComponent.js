import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import AddLocationModal from "./AddLocationModal";
import { makeStyles, Button } from "@material-ui/core";
import { firestore, timestamp } from "./Firebase";
import LocationMarker from "./LocationMarker";
import { useAuth } from "../contexts/AuthContext";
import "./../App.css";

const useStyles = makeStyles({
  mapStyle: {
    height: "95vh",
    width: "100%",
  },
});

function MapComponent(props) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [markersData, setMarkersData] = useState([]);
  const [globalPosition, setGlobalPosition] = useState([]);

  useEffect(() => {
    getMarkersData();
    const unsubscribe = firestore.collection("vode").onSnapshot(getMarkersData);
    return unsubscribe;
  }, []);

  //get markers from Firestore
  const getMarkersData = async () => {
    let array = [];
    firestore
      .collection("vode")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          array.push(doc.data());
        });
        setMarkersData(array);
      });
  };

  //add location to firestore
  const addLocation = (description) => {
    let newLocationRef = firestore.collection("vode").doc();
    let dataObject = {
      lat: globalPosition[0],
      lng: globalPosition[1],
      description: description,
      created: timestamp,
      uid: currentUser.uid,
      docid: newLocationRef.id,
    };
    newLocationRef
      .set(dataObject)
      .then(() => {
        console.log("Document successfully written");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    alert(`you successfully added Location \n${description}`);
  };

  //delete marker from firestore
  const deleteLocation = (marker) => {
    firestore
      .collection("vode")
      .doc(marker.docid)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    alert(`you deleted Location \n${marker.description}`);
  };

  //handles current marker location
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
          if (currentUser.uid === marker.uid) {
            return (
              <Marker key={i} position={[marker.lat, marker.lng]}>
                <Popup>
                  {marker.description}
                  <Button
                    marker={marker}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      deleteLocation(marker);
                    }}
                  >
                    Delete
                  </Button>
                </Popup>
              </Marker>
            );
          } else {
            return (
              <Marker key={i} position={[marker.lat, marker.lng]}>
                <Popup>{marker.description}</Popup>
              </Marker>
            );
          }
        })}
      <AddLocationModal
        addLocation={addLocation}
        globalPosition={globalPosition}
      />
    </MapContainer>
  );
}

export default MapComponent;
