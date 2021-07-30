import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Typography,
  Container,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { Add, Home, Map, Info, MyLocation } from "@material-ui/icons";
import useStyles from "./Styles";
import "./App.css";
import Geolocation from "./Components/Geolocation";

function App() {
  const classes = useStyles();
  const [currentLocation, setCurrentLocation] = useState(null);

  //get current location
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    console.log([position.coords.latitude, position.coords.longitude]);
    setCurrentLocation([position.coords.latitude, position.coords.longitude]);
  }

  return (
    <CssBaseline>
      <Container className={classes.root}>
        <Typography>{currentLocation}</Typography>
        <Fab className={classes.CurrentLocation} onClick={getLocation}>
          <MyLocation />
        </Fab>
        <Fab className={classes.AddLocation}>
          <Add />
        </Fab>
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
