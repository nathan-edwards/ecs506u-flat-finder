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
        setMessage("")
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for a reset link")
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography>Password Reset</Typography>
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              required
              id="standard"
              label="Email"
              type="email"
              inputRef={emailRef}
            />
            <Button variant="contained" type="submit" disabled={loading}>
              Reset Password
            </Button>
          </form>
          <div>
              <Link to="/login">Login</Link>
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
