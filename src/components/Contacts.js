import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import contactImage from '../photos/titles/home2.jpg';
import '../css/contacts.scss';

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
    
    // Create template parameters to ensure proper data mapping
    const templateParams = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      message: formData.message,
      reply_to: formData.email, // This sets the reply-to address
    };

    emailjs
      .send('service_ursknit', 'template_64qmekz', templateParams, 'RV22WzPhD0vnOR09L')
      .then((res) => {
        console.log('Email sent successfully:', res);
        alert('Message sent successfully!');
        // Reset form
        setFormData({
          name: '',
          surname: '',
          email: '',
          message: '',
        });
      })
      .catch((err) => {
        console.error('Email sending failed:', err);
        alert('Failed to send message. Please try again.');
      });
    navigate('/');
  };

  return (
    <Box className="contacts-page" sx={{ padding: '2rem' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t('contacts.title')}
          </Typography>
          <Box component="form" onSubmit={sendEmail} noValidate autoComplete="off">
            <TextField
              fullWidth
              margin="normal"
              label={t('contacts.name')}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label={t('contacts.surname')}
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label={t('contacts.email')}
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label={t('contacts.message')}
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: '1rem', padding: '0.75rem 2rem' }}
            >
              {t('contacts.send')}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className="d-flex justify-content-center align-items-center">
          <img src={contactImage} className="contact-image" alt="Contact" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Contacts;