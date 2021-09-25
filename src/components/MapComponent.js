import { React, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import AddLocationModal from "./AddLocationModal";
import { makeStyles, Button, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { firestore, timestamp } from "./Firebase";
import LocationMarker from "./LocationMarker";
import { useAuth } from "../contexts/AuthContext";
import blueIcon from "../icons/drop-blue.png";
import greenIcon from "../icons/drop-green.png";
import "./../App.css";

const useStyles = makeStyles({
  mapStyle: {
    height: "100%",
    width: "100%",
  },
});

function MapComponent(props) {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const [markersData, setMarkersData] = useState([]);
  const [globalPosition, setGlobalPosition] = useState([]);
  const [map, setMap] = useState(null);

  //closes popup when deleting marker
  const closePopups = () => {
    map.closePopup();
  };

  useEffect(() => {
    //load markers on app start
    getMarkersData();

    //listen to firestore changes and update markers
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
  };

  //handles current marker location
  const globalPositionHandler = (position) => {
    setGlobalPosition(position);
  };

  //custom map icons
  let blueWaterIcon = L.icon({
    iconUrl: blueIcon,
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
  });

  let greenWaterIcon = L.icon({
    iconUrl: greenIcon,
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // point from which the popup should open relative to the iconAnchor
  });

  return (
    <MapContainer
      className={classes.mapStyle}
      center={[46.056946, 14.505751]}
      zoom={16}
      zoomControl={false}
      whenCreated={setMap}
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
              <Marker
                key={i}
                position={[marker.lat, marker.lng]}
                icon={blueWaterIcon}
              >
                <Popup>
                  <Typography>{marker.description} </Typography>

                  <Button
                    marker={marker}
                    size="small"
                    variant="contained"
                    color="primary"
                    startIcon={<Delete />}
                    onClick={() => {
                      closePopups();
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
              <Marker
                key={i}
                position={[marker.lat, marker.lng]}
                icon={greenWaterIcon}
              >
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
