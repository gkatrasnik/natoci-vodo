import React, { useState } from "react";
import MapComponent from "./Components/MapComponent";

import Navbar from "./Components/Navbar";
import { CssBaseline, Container } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";
import firebase from "./Components/Firebase.js";
import "firebase/auth";
import "firebase/firestore";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", //blue
    },
    secondary: {
      main: "#ffc400", //amber
    },
  },
});

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
      <ThemeProvider theme={customTheme}>
        <Container disableGutters={true} className="container">
          <Navbar></Navbar>

          <MapComponent
            globalPositionHandler={globalPositionHandler}
            globalPosition={globalPosition}
            addLocation={addLocation}
          />
        </Container>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
