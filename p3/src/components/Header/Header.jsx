
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css'
import Image from 'react-bootstrap/Image'

const Header = () => (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="./" style={{ marginRight: '10px' }}>
          <Image src="/icons8-dog-64.png" alt="Logo" fluid width={24} height={24} />
        </Navbar.Brand>
        <Navbar.Brand href="./" >PetPal</Navbar.Brand>
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
            <Nav.Link href="/Login">Log in</Nav.Link>
            <Nav.Link href="/Signup">Sign up</Nav.Link>
            
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
);

export default Header;
