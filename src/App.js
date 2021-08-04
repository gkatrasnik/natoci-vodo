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
        created: firebase.firestore.Timestamp.now(),
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    alert(
      "You added location: " + globalPosition[0] + " - " + globalPosition[1]
    );
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
      </Container>
    </CssBaseline>
  );
}

export default App;
