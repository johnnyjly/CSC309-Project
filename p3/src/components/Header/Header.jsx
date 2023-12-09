
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image'

import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const token = localStorage.getItem("access");
  return <>
    <Navbar expand="lg" className="bg-body-tertiary" style={{background: "#F1F1F1"}}>
      <Container>
        <Navbar.Brand href="/" style={{ marginRight: '10px' }}>
          <Image src="/icons8-dog-64.png" alt="Logo" fluid width={24} height={24} />
        </Navbar.Brand>
        <Navbar.Brand href="/" >PetPal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="/listings/">Pet Listings</Nav.Link>
            <Nav.Link href='/shelters/?page=1'> Shelter Listings</Nav.Link>
            {(token !== null) ?
              <>
                <Nav.Link href="/notifications">Notifications</Nav.Link>
                <Nav.Link href="/applications">Applications</Nav.Link>
              </>
              :
              <>
              </>}
          </Nav>
        </Navbar.Collapse>
        {(token === null) ?
          <>
            <Nav.Link href="/Login">Log in </Nav.Link>
            <Nav.Link href="/Signup">Sign up</Nav.Link>
          </>
          :
          <>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href={"/profile/" + jwtDecode(token).username} style={{ textDecoration: "none" }}>{jwtDecode(token).username}</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </>}
      </Container>
    </Navbar>
  </>;
};

export default Header;
