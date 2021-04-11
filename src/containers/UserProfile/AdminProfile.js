import React, { useState } from "react";
import { Card, Button, Alert, Form, FormControl} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";


export default function UserProfile() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.pushState("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <p>
            <strong>Name:</strong> {currentUser.displayName}
          </p>
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Admin Tools</h2>
          <Form onSubmit={""} inline className="col-xs-4 mx-auto">
            <FormControl
              style={{ width: 575 }}
              type="text"
              placeholder="Search User"
              className="mr-sm-2"
            />
            <Button variant="light" type="submit">
              Search
            </Button>
          </Form>
          <br></br>
          <Form onSubmit={""} inline className="col-xs-4 mx-auto">
            <FormControl
              style={{ width: 575 }}
              type="text"
              placeholder="Search Property"
              className="mr-sm-2"
            />
            <Button variant="light" type="submit">
              Search
            </Button>
          </Form>
          <br></br>
            <Button variant="link" onClick={""}>
              Manage User Reports
            </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
