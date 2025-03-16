import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import '../css/contacts.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import contactImage from '../photos/titles/home2.jpg';

const Contacts = () => {
  const { t } = useTranslation();
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

  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_ursknit', 'template_64qmekz', e.target, 'RV22WzPhD0vnOR09L')
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    navigate('/');
  };

  return (
    <Container className="contacts-page">
      <Row>
        <Col xs={12} md={6}>
          <h1 className="contacts-title">{t('contacts.title')}</h1>
          <Form onSubmit={sendEmail} className='contact-form'>
            <Form.Group controlId="formName">
              <Form.Label>{t('contacts.name')}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSurname">
              <Form.Label>{t('contacts.surname')}</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>{t('contacts.email')}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMessage">
              <Form.Label>{t('contacts.message')}</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                required
              />
            </Form.Group>
            <Button type="submit" className='contact-button mt-4' >
              {t('contacts.send')}
            </Button>
          </Form>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center align-items-center">
          <img src={contactImage} className='contact-image' alt="Contact" />
        </Col>
      </Row>
    </Container>
  );
};

export default Contacts;