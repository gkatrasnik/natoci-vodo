import React, { useState, useEffect } from "react";
import MapComponent from "./Components/MapComponent";
import AddLocationModal from "./Components/AddLocationModal";
import Navbar from "./Components/Navbar";
import { CssBaseline, Container } from "@material-ui/core";
import "./App.css";
import firebase from "./Components/Firebase.js";
import "firebase/auth";
import "firebase/firestore";

function App() {
  const [globalPosition, setGlobalPosition] = useState([]);
  //const [desc, setDesc] = useState("");

  //on app load download markers data from firestore

  const addLocation = (description) => {
    firebase
      .firestore()
      .collection("vode")
      .add({
        lat: globalPosition[0],
        lng: globalPosition[1],
        description: description,
        created: firebase.firestore.Timestamp.now(),
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
    <CssBaseline>
      <Container disableGutters={true} className="container">
        <Navbar></Navbar>

        <MapComponent
          globalPositionHandler={globalPositionHandler}
          globalPosition={globalPosition}
          addLocation={addLocation}
        />
      </Container>
    </CssBaseline>
  );
}

export default App;
