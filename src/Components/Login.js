import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  TextField,
  FormControl,
  Container,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
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
      history.push("/pitna-voda");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className="paper">
          <h2>Log in</h2>
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

            <Button
              className="submit"
              disabled={loading}
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </form>

          <div className="w-100 text-center mt-2">
            Forgot password?{" "}
            <Link to="/pitna-voda/forgot-password">Change it</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/pitna-voda/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
