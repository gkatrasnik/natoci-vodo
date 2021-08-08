import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  FormControl,
  TextField,
} from "@material-ui/core";
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
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <CardContent>
          <CardActionArea>
            <h2 className="text-center mb-4">Sign up</h2>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  inputRef={emailRef}
                  type="email"
                />
              </FormControl>
              <FormControl id="password">
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  inputRef={passwordRef}
                  type="password"
                />
              </FormControl>
              <FormControl id="password.confirm">
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="passwordConfirm"
                  label="Password Confirmation"
                  name="passwordConfirm"
                  inputRef={passwordConfirmRef}
                  type="password"
                />
              </FormControl>
              <Button disabled={loading} className="w-100" type="submit">
                Sign Up
              </Button>
            </form>
          </CardActionArea>
        </CardContent>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
