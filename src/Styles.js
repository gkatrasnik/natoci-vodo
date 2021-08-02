import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100%",
  },
  AddLocation: {
    zIndex: 500,
    position: "absolute",
    bottom: "8%",
    right: "8%",
  },
  CurrentLocation: {
    zIndex: 500,
    position: "absolute",
    bottom: "22%",
    right: "8%",
  },
  MapComponent: {
    zIndex: 0,
    height: "92%",
    width: "100%",
  },
  BottomNavigation: {
    height: "8%",
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default useStyles;
