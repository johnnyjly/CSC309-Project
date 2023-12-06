
import React from 'react';
import { ReactDOM } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css'

const Header = () => (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="./">PetPal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#link">Search</Nav.Link>
            <Nav.Link href="#link">Profile</Nav.Link>
            <Nav.Link href="./notifications">Notifications</Nav.Link>
            <Nav.Link href="#link">Applications</Nav.Link>
            {/* <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Edit Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              Notifications
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            <Nav.Link href="#link">Log In</Nav.Link>
            <Nav.Link href="#link">Log Out</Nav.Link>
            
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
);

export default Header;