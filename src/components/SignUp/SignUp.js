import React, { useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function SignUp() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const phoneRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/")
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography>Sign Up</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              id="standard"
              label="First Name"
              inputRef={firstNameRef}
            />
            <TextField id="standard" label="Last Name" inputRef={lastNameRef} />
            <TextField
              required
              id="standard"
              label="Email"
              type="email"
              inputRef={emailRef}
            />
            <TextField
              required
              id="standard-password-input"
              label="Password"
              type="password"
              inputRef={passwordRef}
            />
            <TextField
              required
              id="standard-password-input"
              label="Password Confirmation"
              type="password"
              inputRef={passwordConfirmRef}
            />
            <TextField id="standard" label="Phone Number" inputRef={phoneRef} />
            <Button variant="contained" type="submit" disabled={loading}>
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      <div>
        Already have an account? <Link to="/login">
          Login
        </Link>
      </div>
    </div>
  );
}
