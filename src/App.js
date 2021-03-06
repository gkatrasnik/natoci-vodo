import React from "react";
import MapComponent from "./components/MapComponent";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Info from "./components/Info";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CssBaseline, Container, makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#3987b8", //blue
    },
    secondary: {
      main: "#ffc400", //amber
    },
  },
});

const useStyles = makeStyles({
  containerStyle: {
    height: "100%",
    width: "100%",
  },
});

function App() {
  const classes = useStyles();
  return (
    <CssBaseline>
      <ThemeProvider theme={customTheme}>
        <Container disableGutters={true} className={classes.containerStyle}>
          <BrowserRouter>
            <AuthProvider>
              <Navbar />
              <Switch>
                <PrivateRoute exact path="/" component={MapComponent} />

                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/info" component={Info} />
                <Route path="/forgot-password" component={ForgotPassword} />
                <Redirect to="/" />
              </Switch>
            </AuthProvider>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
