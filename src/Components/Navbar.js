import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Autorenew, InvertColors } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  toolbarStyle: {
    display: "flex",
  },
  titleStyle: {
    flexGrow: 1,
    textAlign: "center",
    marginRight: "48px",
  },
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

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.push("/pitna-voda/login");
    } catch {
      setError("Failed to log out");
    }
  };

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="fixed">
        <Toolbar className={classes.toolbarStyle}>
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
            {currentUser && <MenuItem disabled>{currentUser.email}</MenuItem>}
          </Menu>

          <Typography className={classes.titleStyle} variant="h4">
            Natoči vodo
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
