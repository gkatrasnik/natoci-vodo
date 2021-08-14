import React from "react";
import { Typography, makeStyles, Container, Box } from "@material-ui/core";
import blueIcon from "../icons/drop-blue.png";
import greenIcon from "../icons/drop-green.png";
import currentLocationIcon from "../icons/current-location.png";

const useStyles = makeStyles((theme) => ({
  contentStyle: {
    paddingTop: 100,
  },
}));

function Info() {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.contentStyle}>
      <Typography
        component="h3"
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Info
      </Typography>
      <Typography variant="h6" gutterBottom>
        Make sure you have enabled location services before use.
      </Typography>

      <div className={classes.heroButtons}>
        <Box display="flex" alignItems="center" mt={3}>
          <img
            src={currentLocationIcon}
            width="25"
            height="40"
            alt="blue-icon"
          />
          <Box ml={4.5}>
            <Typography>Your current location</Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={3}>
          <svg height="40" width="40">
            <circle
              cx="20"
              cy="20"
              r="17"
              stroke="#3388ff"
              stroke-width="3"
              fill="#3388ff"
              fill-opacity="0.2"
            />
          </svg>
          <Box ml={3}>
            <Typography>GPS Accuracy</Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={3}>
          <img src={blueIcon} width="40" height="40" alt="blue-icon" />
          <Box ml={3}>
            <Typography>Locations you added (you can delete them)</Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" mt={3}>
          <img src={greenIcon} width="40" height="40" alt="blue-icon" />
          <Box ml={3}>
            <Typography>Locations others added</Typography>
          </Box>
        </Box>
        <Box mt={3}>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          and{" "}
          <a
            href="https://www.flaticon.com/authors/smartline"
            title="Smartline"
          >
            Smartline
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </Box>
      </div>
    </Container>
  );
}

export default Info;
