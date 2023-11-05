import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown';
import {BiSolidUser,BiSolidUserPlus} from 'react-icons/bi';
import {BsBriefcaseFill} from 'react-icons/bs';
import {FaPeopleGroup} from 'react-icons/fa6';

const st={
  backgroundColor: "transparent" 
};
function ShowNavigationBar(){
    return <Navbar expand="lg" style={st} className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="#home" className = 'fst-italic'>Essential Weeds</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav fill variant="tabs" defaultActiveKey="/PageRender" className="me-auto">  
            <Nav.Link href="/PageRender" className='fw-bold'>Dashboard</Nav.Link>
            <Nav.Link href="/FormInput" className='fw-bold'>Onboarding<BsBriefcaseFill style = {{marginLeft : '5px'}}/></Nav.Link>
            <Nav.Link href="#link" className='fw-bold'>Members<FaPeopleGroup style = {{marginLeft : '5px'}}/></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href = "/" className='fw-bold'>Login<BiSolidUser style = {{fontSize : '20px',marginLeft : '5px'}}/></Nav.Link>
            <Nav.Link href = "/signup" className='fw-bold'>Signup<BiSolidUserPlus style = {{fontSize : '27px',marginLeft : '5px'}}/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
}
export default ShowNavigationBar;