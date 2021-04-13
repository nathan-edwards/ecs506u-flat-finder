import React, { useRef, useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";

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
    history.push("/?location=" + locationRef.current.value);
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
      <Navbar style={{ backgroundColor: "#1c212d" }} variant="dark" expand="lg">
        <Navbar.Brand href="/">
          <div>
            <span style={{ fontWeight: 400, font: "Roboto" }}>my</span>
            <span style={{ color: "#30d69a", fontWeight: 700, font: "Roboto" }}>
              Place
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="col-xs-4">
            <Nav.Link style={{ color: "#8c97ab" }} href="/?type=rent">
              Rent
            </Nav.Link>
            <Nav.Link style={{ color: "#8c97ab" }} href="/?type=flatshare">
              Flat Share
            </Nav.Link>
          </Nav>
          <Form onSubmit={handleSubmit} inline className="col-xs-4 mx-auto">
            <FormControl
              style={{ width: 575 }}
              type="text"
              placeholder="Enter Location"
              className="mr-sm-2"
              ref={locationRef}
            />
            <Button variant="light" disabled={loading} type="submit">
              Search
            </Button>
          </Form>
          <NavDropdown
            alignRight={true}
            title={currentUser.displayName}
            id="nav-dropdown"
          >
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/new-report">Report Problem</NavDropdown.Item>
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
