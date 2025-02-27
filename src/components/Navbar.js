// filepath: /d:/Portfolio projects/hajar/src/components/Navbar.js
import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import '../css/navbar.css';

const NavigationBar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">My Portfolio</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">{t('navbar.home')}</Nav.Link>
            <Nav.Link as={Link} to="/photos">{t('navbar.photos')}</Nav.Link>
            <Nav.Link as={Link} to="/about">{t('navbar.about')}</Nav.Link>
            <Nav.Link as={Link} to="/titles">{t('navbar.titles')}</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="https://www.facebook.com/profile.php?id=100008438296052" target="_blank"><FaFacebook /></Nav.Link>
            <Nav.Link href="https://twitter.com" target="_blank"><FaTwitter /></Nav.Link>
            <Nav.Link href="https://linkedin.com" target="_blank"><FaLinkedin /></Nav.Link>
            <NavDropdown title="Language" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('az')}>Azerbaycan</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;