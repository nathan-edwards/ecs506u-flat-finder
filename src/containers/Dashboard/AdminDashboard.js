import React, { useState } from "react";
import {
  Card,
  Button,
  Alert,
  Form,
  FormControl,
  Container,
} from "react-bootstrap";
import "./AdminDashboard.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "85vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 id="profile_title" className="text-center mb-4">
                <b>Profile</b>
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <p id="admin_name">
                <strong>Name:</strong> <br></br> {currentUser.displayName}
              </p>
              <p id="admin_email">
                <strong>Email:</strong> <br></br> {currentUser.email}
              </p>
              <p id="admin_user_type">
                <strong>User Type:</strong> <br></br> {currentUser.photoURL}
              </p>
              <Link
                id="admin_update_profile"
                to="/profile/update"
                className="btn btn-primary w-100 mt-3"
                style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
              >
                Update Profile
              </Link>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                <b>Admin Tools</b>
              </h2>
              <Form
                id="search_user_form"
                onSubmit={""}
                inline
                className="col-xs-4 mx-auto"
              >
                <FormControl
                  style={{ width: 575 }}
                  type="text"
                  placeholder="Search User"
                  className="mr-sm-2"
                />
                <Button
                  id="search_1"
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
                >
                  Search
                </Button>
              </Form>
              <br></br>
              <Form
                id="search_property_form"
                onSubmit={""}
                inline
                className="col-xs-4 mx-auto"
              >
                <FormControl
                  style={{ width: 575 }}
                  type="text"
                  placeholder="Search Property"
                  className="mr-sm-2"
                />
                <Button
                  id="search_2"
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
                >
                  Search
                </Button>
              </Form>
              <br></br>
              <Button
                id="manage_user_reports"
                href={"/manage-report"}
                style={{ backgroundColor: "#4DB790", borderColor: "#4DB790" }}
              >
                Manage User Reports
              </Button>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
