import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { firestore, auth } from "../../firebase";

export default function SignUp() {
  const displayNameRef = useRef();
  const emailRef = useRef();
  const userTypeRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const phoneRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const ref = firestore.collection("users");
  let user = auth.currentUser;

  function addUserInfo(submission) {
    ref
      .doc(submission.id)
      .set(submission)
      .catch((err) => {
        setError(err);
      });
  }

  async function submitUserInfo() {
    addUserInfo({
      id: user.uid,
      name: user.displayName,
      email: user.email,
      photoUrl: user.photoURL,
      phoneNumber: phoneRef.current.value,
      userType: userTypeRef.current.value,
    });
    try {
      await user.updateProfile({
        displayName: displayNameRef.current.value,
        photoURL: userTypeRef.current.value,
      });
    } catch {
      setError("Failed to create an account");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      try {
        await submitUserInfo();
      } catch {
        setError("Failed to create an account");
      }
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="display-name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" ref={displayNameRef} required />
                </Form.Group>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="user-type">
                  <Form.Label>User Type</Form.Label>
                  <Form.Control custom as="select" ref={userTypeRef} required>
                    <option>Guest</option>
                    <option>Host</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group id="phone-number">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" ref={phoneRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100"
                  type="submit"
                  style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?{" "}
            <Link style={{ color: "#4DB790" }} to="/login">
              Log In
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
