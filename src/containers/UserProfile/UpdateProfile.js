import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Col, Row } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

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

    if (
      displayNameRef.current.value !== currentUser.displayName ||
      photoURLRef.current.value !== currentUser.photoURL
    ) {
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
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <Card style={{ borderColor: "transparent" }}>
            <Card.Body>
              <h2 className="text-center mb-4">
                <b>Update Profile</b>
              </h2>
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
                    custom
                    as="select"
                    ref={photoURLRef}
                    defaultValue={currentUser.photoURL}
                    required
                  >
                    <option>Host</option>
                    <option>Guest</option>
                  </Form.Control>
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
                <Row>
                  <Col>
                    <Button
                      id="cancel"
                      disabled={loading}
                      variant="danger"
                      className="w-100 mt-3"
                      href="/"
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      id="update"
                      style={{
                        backgroundColor: "#4DB790",
                        borderColor: "#4DB790",
                      }}
                      disabled={loading}
                      className="w-100 mt-3"
                      type="submit"
                    >
                      Update
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2"></div>
        </div>
      </Container>
    </>
  );
}
