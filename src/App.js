import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Typography,
  Container,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { Add, Home, Map, Info } from "@material-ui/icons";
import useStyles from "./Styles";
import "./App.css";
import MapComponent from "./Components/MapComponent";

function App() {
  const classes = useStyles();
  const [globalPosition, setGlobalPosition] = useState([51.505, 14.09]);

  const globalPositionHandler = (position) => {
    setGlobalPosition(position);
    console.log(position);
  };

  return (
    <CssBaseline>
      <Container disableGutters={true} className={classes.root}>
        <MapComponent globalPositionHandler={globalPositionHandler} />

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
