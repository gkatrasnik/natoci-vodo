import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    height: "100vh",
  },
  AddLocation: {
    position: "fixed",
    bottom: "15vh",
    right: "10vw",
  },
  CurrentLocation: {
    position: "fixed",
    bottom: "30vh",
    right: "10vw",
  },
  BottomNavigation: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
  },
});

export default useStyles;
