import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  AddLocation: {
    zIndex: "1",
    position: "fixed",
    bottom: "20vh",
    right: "8vw",
  },
  CurrentLocation: {
    zIndex: "1",
    position: "fixed",
    bottom: "30vh",
    right: "10vw",
  },
  MapComponent: {
    zIndex: 0,
    height: "92vh",
    width: "100%",

    marginBottom: "50px",
  },
  BottomNavigation: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default useStyles;
