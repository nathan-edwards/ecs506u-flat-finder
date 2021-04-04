import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Image,
  Dropdown,
  NavItem,
  NavLink,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";

function Header() {
  const { currentUser } = useAuth();

  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">myPlace</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="col-xs-4">
            <Nav.Link href="#rent">Rent</Nav.Link>
            <Nav.Link href="#share">Flat Share</Nav.Link>
          </Nav>
          <Form inline className="col-xs-4 mx-auto">
            <FormControl style={{width: 575}} type="text" placeholder="Enter Location" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Dropdown as={NavItem} id="basic-dropdown">
            <Dropdown.Toggle as={NavLink}>
              <Image src={currentUser.photoURL} rounded />
              {currentUser.displayName}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Account Settings</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
