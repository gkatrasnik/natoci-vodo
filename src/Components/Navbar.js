import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { InvertColors } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/pitna-voda/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <InvertColors />
          <Typography variant="body1" className={classes.title}>
            {currentUser.email}
          </Typography>
          {currentUser && (
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={handleLogout}
            >
              Log Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
