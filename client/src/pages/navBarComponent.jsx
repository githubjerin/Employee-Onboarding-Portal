import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BiSolidUser,BiSolidUserPlus} from 'react-icons/bi';
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaPeopleGroup} from 'react-icons/fa6'
const st={
  backgroundColor: "#ff8c00"
};
function ShowNavigationBar(){
    return <Navbar expand="lg" style={st} className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="#home">Essential Weeds</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Onboarding<BsBriefcaseFill style = {{marginLeft : '5px'}}/></Nav.Link>
            <Nav.Link href="#link">Members<FaPeopleGroup style = {{marginLeft : '5px'}}/></Nav.Link>
            <NavDropdown title="Activities" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href = "/">Login<BiSolidUser style = {{fontSize : '20px',marginLeft : '5px'}}/></Nav.Link>
            <Nav.Link href = "/signup">Signup<BiSolidUserPlus style = {{fontSize : '27px',marginLeft : '5px'}}/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
}
export default ShowNavigationBar;