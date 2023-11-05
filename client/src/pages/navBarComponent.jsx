import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown';
import {BiLogOut} from 'react-icons/bi';
import {BsBriefcaseFill} from 'react-icons/bs';
import {FaPeopleGroup} from 'react-icons/fa6';
import {WelcomePage} from './welcomeUser.page';
import EssentialWeeds from '../res/images/EssentialWeeds.png';

const st={
  backgroundColor: "transparent" 
};
function ShowNavigationBar(){
    return <Navbar expand="lg" style={st} className="bg-body-tertiary">
        <Container s>
        <Navbar.Brand href="#home" className = 'fst-italic fw-bold' style = {{color : 'green'}}><img src = {EssentialWeeds} alt = 'Logo' style = {{borderRadius : '50%', width : '50px', height : '50px'}}/>Essential Weeds</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav fill variant="tabs" className="me-auto" >  
            <Nav.Link href="/WelcomePage" className='fw-bold' eventKey = "/WelcomePage">Dashboard</Nav.Link>
            <Nav.Link href="/FormInput" className='fw-bold' eventKey = "/FormInput">Onboarding<BsBriefcaseFill style = {{marginLeft : '5px'}}/></Nav.Link>
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