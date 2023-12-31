import React from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {useState} from 'react';
import { useRef } from 'react';
import axios from "axios";
import ShowNavigationBar from "./navBarComponent.jsx";
//import { Form, Button } from 'react-bootstrap';
import bg from "../res/images/2947.jpg";




import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
const st={
    marginTop:"70px",

    
};

//const [file, setFile] = useState('');
//const [uploadedFileURL, setUploadedFileURL] = useState('');


function FormInput() {
    const [formData, setFormData] = useState({
        fname: '',
        lname:'',
        phone:'',
        dob:'',
      address1: '',
      address2:'',
      city:'',
      state:'',
      zip:'',
      pan:'',
      aadhar:'',
      image:null,
      });
    
      const handleInputChange = (e) => {
        e.preventDefault();
        const { name, value, files } = e.target;

    
        if (name === 'image') {
          setFormData({ ...formData, [name]: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);

  try { 
    const response = await axios.post('http://localhost:2003/user/formupdate', formData,{
        headers: {
            'Content-Type': `multipart/form-data`,
          }, 
          withCredentials:true,
    });
     /*   const response = await fetch('http://localhost:2003/user/formupdate', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            credentials: 'include',
            body: JSON.stringify(formData)
        });
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
        } 
        */
      console.log('Form data submitted successfully');
      // You can reset the form or perform other actions here
  } catch (error) {
    console.error('Error submitting form data:', error);
  }
};
  return (
    <div style={{backgroundImage :`url(${bg})` ,backgroundSize : 'cover'}}><ShowNavigationBar /> 
    <Container style={st}>
  
    <Form onSubmit={handleSubmit} >
    <div>
     <h5>Personal Details</h5>
     <Row className="mb-3">


        <Form.Group as={Col} controlId="formGridFirstName">
          <FloatingLabel controlId="floatingInput"
        label="First Name"
        className="mb-3">
          <Form.Control  placeholder="First Name" onChange={handleInputChange} name="fname" value={formData.fname}/>
          </FloatingLabel>
        </Form.Group>


        <Form.Group as={Col} controlId="formGridLastName">
          <FloatingLabel controlId="floatingInput"
        label="Last Name"
        className="mb-3">
          <Form.Control  placeholder="Last Name" onChange={handleInputChange} name="lname" value={formData.lname}/>
          </FloatingLabel>
        </Form.Group>



      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <FloatingLabel
        label="Email Id"
        controlId="floatingInput"
        className="mb-3">
          <Form.Control type="email" placeholder="Email" value="haresh66@gmail.com" disabled={true} />
          </FloatingLabel>
        </Form.Group>

       
        <Form.Group as={Col} controlId="formGridEmpid">
          <FloatingLabel controlId="floatingInput"
        label="Employee Id"
        className="mb-3">
          <Form.Control  placeholder="EmpID"  value="002"  disabled={true}/>
          </FloatingLabel>
        </Form.Group>



      </Row>
      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridPhone">
          <FloatingLabel controlId="floatingInput"
        label="Phone Number"
        className="mb-3">
          <Form.Control  placeholder="Phone Number" onChange={handleInputChange} name="phone" value={formData.phone}/>
          </FloatingLabel>
        </Form.Group>


        <Form.Group as={Col} controlId="formGriddob">
        <FloatingLabel controlId="floatingInput" 
         label="Date of Birth (mm/dd/yyyy)"
        className="mb-3"> 
        <Form.Control type="Date" placeholder="Date of Birth" onChange={handleInputChange} name="dob" value={formData.dob}/>
        </FloatingLabel> 
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <FloatingLabel controlId="floatingInput"
        label="Address (Street,Landmark)"
        className="mb-3">
        <Form.Control placeholder="1234 Main St" name="address1" value={formData.address1} onChange={handleInputChange}/>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <FloatingLabel controlId="floatingInput"
        label="Address (floor,Apartment)"
        className="mb-3"
           >
        <Form.Control placeholder="Apartment, studio, or floor" name="address2" value={formData.address2} onChange={handleInputChange}/>
        </FloatingLabel>
      </Form.Group>
      
      <Row className="mb-3">
         
        <Form.Group as={Col} controlId="formGridCity">
           <FloatingLabel controlId="floatingInput"
        label="City"
        className="mb-3">
          <Form.Control placeholder="City" name="city" onChange={handleInputChange} value={formData.city} />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <FloatingLabel>
          <Form.Select defaultValue="Choose..." name="state" value={formData.state} onChange={handleInputChange}>
            <option >Karnataka</option>
            <option>Tamil Nadu</option>
            <option>Kerala</option>
            <option>Andhra Pradesh</option>
            <option>Maharastra</option>
            <option>Telangana</option>
            <option>Madhya Pradesh</option>
          </Form.Select>
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <FloatingLabel controlId="floatingInput"
        label="Zip"
        className="mb-3">
          <Form.Control placeholder="Zip" onChange={handleInputChange} name="zip" value={formData.zip}/>
          </FloatingLabel>
          
        </Form.Group>
      </Row>
      </div>
      <div>
        <h5>Official Documents</h5>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail" >
        <FloatingLabel
        controlId="floatingInput"
        label="Pan Number"
        className="mb-3">
          <Form.Control  placeholder="Enter Pan Number" onChange={handleInputChange} name="pan" value={formData.pan}/>
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword" name='aadhar'>
          <FloatingLabel controlId="floatingInput"
        label="Aadhar Number "
        className="mb-3">
          <Form.Control  placeholder="Enter AAdhar Number" name="aadhar" className='aadhar' value={formData.aadhar} onChange={handleInputChange}/>
          </FloatingLabel>
        </Form.Group>
      </Row>
      </div>
      <div className="mb-3">
      <h6>Aadhar Card/Pan Card (Upload)</h6>
      <Form.Control id="image" type="file" name="image" onChange={handleInputChange}/>

      </div>
  

      <Button variant="white" type="submit">
        Submit
      </Button>

    </Form>
    </Container>
    </div>
  );
}

export default FormInput;