import React, { useState } from "react";
import { Card, Alert, Container } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function UserProfile() {
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                <b>Profile</b>
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <p>
                <strong>Name:</strong> {currentUser.displayName}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p>
                <strong>User Type:</strong> {currentUser.photoURL}
              </p>
              <Link
                style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
                id="update_user_profile"
                to="/profile/update"
                className="btn btn-primary w-100 mt-3"
              >
                Update Profile
              </Link>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
