import React, { useState, useEffect } from "react";
import {
  CssBaseline,
  Typography,
  Container,
  Fab,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import { Add, Restore, LocationOn, Folder } from "@material-ui/icons";
import useStyles from "./Styles";
import "./App.css";

function App() {
  const classes = useStyles();

  return (
    <CssBaseline>
      <Container className={classes.root}>
        <Fab className={classes.fab}>
          <Add />
        </Fab>
        <BottomNavigation className={classes.BottomNavigation}>
          <BottomNavigationAction
            label="Recents"
            value="recents"
            icon={<Restore />}
          />
          <BottomNavigationAction
            label="Nearby"
            value="nearby"
            icon={<LocationOn />}
          />
          <BottomNavigationAction
            label="Folder"
            value="folder"
            icon={<Folder />}
          />
        </BottomNavigation>
      </Container>
    </CssBaseline>
  );
}

export default App;
