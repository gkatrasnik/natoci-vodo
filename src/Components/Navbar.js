import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { InvertColors } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbarStyle: {},
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
      <AppBar color="primary" position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                history.push("/pitna-voda");
              }}
            >
              Map
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                history.push("/pitna-voda/info");
              }}
            >
              Info
            </MenuItem>
            {currentUser && (
              <MenuItem
                onClick={() => {
                  handleClose();
                  handleLogout();
                }}
              >
                Logout
              </MenuItem>
            )}
          </Menu>
          <InvertColors />
          {currentUser && (
            <Typography variant="body1" className={classes.title}>
              {currentUser.email}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
