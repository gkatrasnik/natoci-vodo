import React, { useState, useEffect } from "react";
import MapComponent from "./Components/MapComponent";
import {
  CssBaseline,
  Container,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { Add, Home, Map, Info } from "@material-ui/icons";
import useStyles from "./Styles";
import "./App.css";
import firebase from "./Components/Firebase.js";
import "firebase/auth";
import "firebase/firestore";

function App() {
  const classes = useStyles();
  const [globalPosition, setGlobalPosition] = useState(null);

  useEffect(() => {
    console.log("global pos: " + globalPosition);
  }, [globalPosition]);

  const globalPositionHandler = (position) => {
    setGlobalPosition(position);
  };

  return (
    <CssBaseline>
      <Container disableGutters={true} className={classes.root}>
        <MapComponent globalPositionHandler={globalPositionHandler}>
          <Fab className={classes.AddLocation}>
            <Add />
          </Fab>
        </MapComponent>
        <BottomNavigation className={classes.BottomNavigation}>
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
