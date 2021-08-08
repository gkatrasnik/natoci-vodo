import React, { useRef, useState } from "react";
import { Button, Container, TextField, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
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
        <div className="paper">
          <h2>Password Reset</h2>
          {error && <Alert variant="error">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit}>
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
              disabled={loading}
              fullWidth
              margin="normal"
              variant="contained"
              color="primary"
              type="submit"
            >
              Reset Password
            </Button>
          </form>

          <Grid container>
            <Grid item xs>
              <Link to="/pitna-voda/login" variant="body2">
                {"Already have an account? Log in"}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/pitna-voda/signup" variant="body2">
                {"Need an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
}
