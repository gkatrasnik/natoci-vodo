import React, { useState, useEffect } from "react";
import {
  Container,
  BottomNavigation,
  Fab,
  BottomNavigationAction,
} from "@material-ui/core";
import { Add, Restore, LocationOn, Folder } from "@material-ui/icons";

import "./App.css";

function App() {
  return (
    <Container>
      <Fab className="addLocation">
        <Add />
      </Fab>
      <BottomNavigation>
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
  );
}

export default App;
