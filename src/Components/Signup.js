import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  TextField,
  Grid,
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

export default function Signup() {
  const classes = useStyles();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/pitna-voda");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <h2>Sign up</h2>
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

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="passwordConfirm"
              label="Password Confirmation"
              name="passwordConfirm"
              inputRef={passwordConfirmRef}
              type="password"
            />

            <Button
              className={classes.submit}
              disabled={loading}
              fullWidth
              margin="normal"
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign Up
            </Button>
          </form>

          <Grid container>
            <Grid item>
              <Link to="/pitna-voda/login" variant="body2">
                Have an account? Log In
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
