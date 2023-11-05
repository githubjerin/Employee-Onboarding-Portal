import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown';
import {BiLogOut} from 'react-icons/bi';
import {BsBriefcaseFill} from 'react-icons/bs';
import {FaPeopleGroup} from 'react-icons/fa6';
import {Landing} from './welcomeUser.page';

const st={
  backgroundColor: "transparent" 
};
function ShowNavigationBar(){
    return <Navbar expand="lg" style={st} className="bg-body-tertiary">
        <Container>
        <Navbar.Brand href="#home" className = 'fst-italic'>Essential Weeds</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav fill variant="tabs" defaultActiveKey=" " lassName="me-auto">  
            <Nav.Link href="/WelcomePage" className='fw-bold'>Dashboard</Nav.Link>
            <Nav.Link href="/FormInput" className='fw-bold'>Onboarding<BsBriefcaseFill style = {{marginLeft : '5px'}}/></Nav.Link>
            <Nav.Link href="#link" className='fw-bold'>Members<FaPeopleGroup style = {{marginLeft : '5px'}}/></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href = "/" className='fw-bold'>Logout<BiLogOut style = {{fontSize : '20px',marginLeft : '5px'}}/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>    
    </Navbar>
}
export default ShowNavigationBar;   