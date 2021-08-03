import { React, useState, useEffect } from "react";

import { useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import firebase from "./Firebase.js";

import "firebase/firestore";

function MarkersData() {
  const [markersData, setMarkersData] = useState(null);
  const map = useMap();
  useEffect(() => {
    getMarkersData();
  }, []);

  const getMarkersData = async () => {
    firebase
      .firestore()
      .collection("vode")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setMarkersData([...markersData, doc.data()]);
          L.marker([46, 14]).addTo(map);
        });
      });
  };
}

export default MarkersData;
