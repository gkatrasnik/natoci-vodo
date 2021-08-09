import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  FormControl,
  Typography,
  Container,
  Grid,
  Box,
  makeStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <h2>Log in</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              inputRef={emailRef}
              type="email"
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              inputRef={passwordRef}
              type="password"
            />

            <Button
              className={classes.submit}
              fullWidth
              margin="normal"
              disabled={loading}
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </form>

          <Grid container>
            <Grid item xs>
              <Link to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                Need an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
