import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';

function ShowNavigationBar(){
    return <Navbar expand="lg" bg = "warning" className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="#home"><span style = {{fontFamily : 'cursive', fontWeight : 'bold'}}>Essential Weeds</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Dashboard</Nav.Link>
            <Nav.Link href="#link">Employees</Nav.Link>
            <NavDropdown title="Activities" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Onboarding</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Schedule</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href = "/signup">Signup</Nav.Link>
            <Nav.Link href = "/">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
}

export default ShowNavigationBar;