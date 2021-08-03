import React, { useState, useEffect } from "react";
import MapComponent from "./Components/MapComponent";
import {
  CssBaseline,
  Container,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { Home, Map, Info } from "@material-ui/icons";
import "./App.css";
import firebase from "./Components/Firebase.js";
import "firebase/auth";
import "firebase/firestore";
import { Marker, Popup } from "react-leaflet";

function App() {
  const [globalPosition, setGlobalPosition] = useState(null);

  useEffect(() => {
    console.log("global pos: " + globalPosition);
  }, [globalPosition]);

  //on app load download markers data from firestore

  const addLocation = () => {
    firebase
      .firestore()
      .collection("vode")
      .add({
        lat: globalPosition[0],
        lng: globalPosition[1],
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const globalPositionHandler = (position) => {
    setGlobalPosition(position);
  };

  return (
    <CssBaseline>
      <Container disableGutters={true} className="container">
        <MapComponent
          globalPositionHandler={globalPositionHandler}
          addLocation={addLocation}
        />

        <BottomNavigation className="bottomNavigationStyle">
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<Home />}
          />
          <BottomNavigationAction
            label="Nearby"
            value="nearby"
            icon={<Map />}
          />
          <BottomNavigationAction
            label="Folder"
            value="folder"
            icon={<Info />}
          />
        </BottomNavigation>
      </Container>
    </CssBaseline>
  );
}

export default App;
