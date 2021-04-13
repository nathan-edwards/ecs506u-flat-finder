import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "./UpdateProfile.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const displayNameRef = useRef();
  const photoURLRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const photoURLRef = useRef();
  const { currentUser, updatePassword, updateEmail, updateProfile } = useAuth();
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

    // Version with photos not currently working

    // if (displayNameRef.current.value !== currentUser.displayName && photoURLRef.current.value) {
    //   promises.push(updateProfile(displayNameRef.current.value, photoURLRef));
    // } else if (displayNameRef.current.value !== currentUser.displayName) {
    //   promises.push(updateProfile(displayNameRef.current.value, undefined));
    // } else if (photoURLRef.current.value) {
    //   promises.push(updateProfile(undefined, photoURLRef))
    // }

    if (displayNameRef.current.value !== currentUser.displayName || photoURLRef.current.value !== currentUser.photoURL) {
      promises.push(
        updateProfile(displayNameRef.current.value, photoURLRef.current.value)
      );
    }

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/profile");
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
        <Card.Body>
          <h2 className="text-center mb-4"><b>Update Profile</b></h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="display-name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={displayNameRef}
                required
                defaultValue={currentUser.displayName}
              />
            </Form.Group>
            <Form.Group id="user-type">
              <Form.Label>User Type</Form.Label>
              <Form.Control
                type="text"
                ref={photoURLRef}
                required
                defaultValue={currentUser.photoURL}
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button id ="update" disabled={loading} className="w-100 mt-3" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link id="cancel" to="/">Cancel</Link>
      </div>
    </>
  );
}
