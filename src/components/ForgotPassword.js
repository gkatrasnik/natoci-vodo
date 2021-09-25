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
import { Link } from "react-router-dom";

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

export default function ForgotPassword() {
  const classes = useStyles();
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <h2>Password reset</h2>
          {error && <Alert variant="error">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              inputRef={emailRef}
              required
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
              Reset password
            </Button>
          </form>

          <Grid container>
            <Grid item xs>
              <Link to="/login" variant="body2">
                Log in
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                Need an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
