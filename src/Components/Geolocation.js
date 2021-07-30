import React from "react";
import { Container, BottomNavigation, Fab } from "@material-ui/core";
import {} from "@material-ui/icons";

function Geolocation() {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position) {
    console.log(position.coords.latitude + position.coords.longitude);
    return position;
  }
  getLocation();
}

export default Geolocation;
