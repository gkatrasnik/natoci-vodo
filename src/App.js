import React from "react";
import MapComponent from "./components/MapComponent";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CssBaseline, Container, makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import "./App.css";

export const customTheme = createTheme({
  palette: {
    primary: {
      main: "#2196f3", //blue
    },
    secondary: {
      main: "#ffc400", //amber
    },
  },
});

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={customTheme}>
        <Container disableGutters={true} className="container">
          <BrowserRouter>
            <AuthProvider>
              <Navbar />
              <Switch>
                <PrivateRoute
                  exact
                  path="/pitna-voda"
                  component={MapComponent}
                />

                <Route path="/pitna-voda/signup" component={Signup} />
                <Route path="/pitna-voda/login" component={Login} />
                <Route
                  path="/pitna-voda/forgot-password"
                  component={ForgotPassword}
                />
              </Switch>
            </AuthProvider>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
