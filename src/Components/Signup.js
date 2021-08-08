import React, { useRef, useState } from "react";
import { Button, Container, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
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
        <div className="paper">
          <h2>Sign up</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
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
              disabled={loading}
              className="submit"
              variant="contained"
              color="primary"
              type="submit"
            >
              Sign Up
            </Button>
          </form>

          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/pitna-voda/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
