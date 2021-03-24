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

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/")
    } catch {
      setError("Failed to login");
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography>Login</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
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
            <Button variant="contained" type="submit" disabled={loading}>
              Login
            </Button>
          </form>
          <div>
              <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </CardContent>
      </Card>
      <div>
        Don't have an account?{" "}
        <Link to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
