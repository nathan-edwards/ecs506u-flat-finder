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
  const [setError] = useState("");
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
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <div>
            <span style={{ fontWeight: 400, font: "Roboto" }}>my</span>
            <span style={{ color: "#519E8A", fontWeight: 900, font: "Roboto" }}>
              Place
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="col-xs-4">
            <Nav.Link href="/?type=rent">Rent</Nav.Link>
            <Nav.Link href="/?type=flatshare">Flat Share</Nav.Link>
          </Nav>
          <Form onSubmit={handleSubmit} inline className="col-xs-4 mx-auto">
            <FormControl
              style={{ width: 575 }}
              type="text"
              placeholder="Enter Location"
              className="mr-sm-2"
              ref={locationRef}
            />
            <Button variant="outline-success" disabled={loading} type="submit">
              Search
            </Button>
          </Form>
          <NavDropdown
            alignRight="right"
            title={currentUser.displayName}
            id="nav-dropdown"
          >
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
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
