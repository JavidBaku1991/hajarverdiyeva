import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../css/contacts.css';
import { useNavigate } from 'react-router-dom'

// import emailjs from 'emailjs-com';

import contactImage from '../photos/titles/home2.jpg';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate=useNavigate();


  const sendEmail =(e)=>{

    e.preventDefault()
    emailjs.sendForm('service_ursknit','template_64qmekz',e.target,'RV22WzPhD0vnOR09L').then(res=>{
      console.log(res);
    }).catch(err=>console.log(err))
    navigate('/')
}



  return (
    <Container className="contacts-page">
      <Row>
        <Col>
          <h1 className="contacts-title">Contact Us</h1>
          <div className='contact-form'>
              <Form onSubmit={sendEmail} className='contact-form-left'>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                required
              />
            </Form.Group>
            <button type="submit" className='contact-button'>
              Send
            </button>
          </Form>
          <img src={contactImage}  className='contact-image'/>

          </div>
        
        </Col>
      </Row>
    </Container>
  );
};

export default Contacts;