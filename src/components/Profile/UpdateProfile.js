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

export default function UpdateProfile() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const phoneRef = useRef();
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
    <div>
      <Card>
        <CardContent>
          <Typography>Update Profile</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              id="standard"
              label="First Name"
              inputRef={firstNameRef}
              //   defaultValue={currentUser.firstName}
            />
            <TextField id="standard" label="Last Name" inputRef={lastNameRef} />
            <TextField
              required
              id="standard"
              label="Email"
              type="email"
              inputRef={emailRef}
              defaultValue={currentUser.lastName}
            />
            <TextField
              required
              id="standard-password-input"
              label="Password"
              type="password"
              inputRef={passwordRef}
              placeholder="Leave blank to keep the same"
            />
            <TextField
              required
              id="standard-password-input"
              label="Password Confirmation"
              type="password"
              inputRef={passwordConfirmRef}
              placeholder="Leave blank to keep the same"
            />
            <TextField id="standard" label="Phone Number" inputRef={phoneRef} />
            <Button variant="contained" type="submit" disabled={loading}>
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
      <div>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
}
