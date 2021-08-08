//NOT IN USE!

import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Input,
  InputLabel,
  FormGroup,
  FormControl,
  TextField,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <CardContent>
          <CardActionArea>
            <h2 className="text-center mb-4">Update Profile</h2>
            {error && <Alert variant="error">{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <FormControl id="email">
                <TextField
                  label="Email"
                  type="email"
                  inputRef={emailRef}
                  required
                  defaultValue={currentUser.email}
                />
              </FormControl>
              <FormControl id="password">
                <Input
                  label="Passwors"
                  type="password"
                  inputRef={passwordRef}
                  placeholder="Leave blank to keep the same"
                />
              </FormControl>
              <FormControl id="password-confirm">
                <TextField
                  label="Password Confirmation"
                  type="password"
                  inputRef={passwordConfirmRef}
                  placeholder="Leave blank to keep the same"
                />
              </FormControl>
              <Button disabled={loading} className="w-100" type="submit">
                Update
              </Button>
            </form>
          </CardActionArea>
        </CardContent>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
