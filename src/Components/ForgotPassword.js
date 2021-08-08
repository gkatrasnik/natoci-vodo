import React, { useRef, useState } from "react";
import { Button, Container, TextField, FormControl } from "@material-ui/core";
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
              className="submit"
              variant="contained"
              color="primary"
              type="submit"
            >
              Reset Password
            </Button>
          </form>
          <div className="w-100 text-center mt-3">
            Have an account? <Link to="/pitna-voda/login">Login</Link>
          </div>

          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/pitna-voda/signup">Sign Up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
