import React, { useRef, useState } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function Header() {
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, logout } = useAuth();
  const locationRef = useRef();
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (locationRef.current.value !== "") {
      history.push("/?location=" + locationRef.current.value);
      window.location.reload(false);
    } else {
      history.push("/");
    }
    setLoading(false);
  }

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
    <header>
      <style type="text/css">
        {`
        a {
          color: #fff
        }
        a:hover {
          color: #4DB790
        }
        .nav-link:focus, .nav-link:hover {
          color: #4DB790
        }
        `}
      </style>
      <Navbar style={{ backgroundColor: "#1c212d" }} variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <div>
            <span style={{ fontWeight: 400, font: "Roboto" }}>my</span>
            <span style={{ color: "#4DB790", fontWeight: 700, font: "Roboto" }}>
              Place
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form onSubmit={handleSubmit} inline className="col-xs-4 mx-auto">
            <FormControl
              style={{
                width: 575,
                backgroundColor: "#333742",
                borderColor: "#cccccc",
                color: "#cccccc",
                textShadow: "#cccccc",
              }}
              type="text"
              placeholder="Enter Location"
              className="mr-sm-2"
              ref={locationRef}
            />
            <Button
              variant="light"
              disabled={loading}
              type="submit"
              style={{
                backgroundColor: "#333742",
                color: "#a2a2a2",
                borderColor: "#a2a2a2",
              }}
            >
              Search
            </Button>
          </Form>
          <NavDropdown
            alignRight={true}
            title={currentUser.displayName}
            id="nav-dropdown"
          >
            {currentUser.photoURL === "Admin" ? (
              <NavDropdown.Item href="/admin">Admin Dashboard</NavDropdown.Item>
            ) : currentUser.photoURL === "Host" ? (
              <NavDropdown.Item href="/host">Host Dashboard</NavDropdown.Item>
            ) : (
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            )}
            <NavDropdown.Item href="/new-report">
              Report Problem
            </NavDropdown.Item>
            <NavDropdown.Item href="#" onClick={handleLogout}>
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
