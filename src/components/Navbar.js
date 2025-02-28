import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import '../css/navbar.css';
import { GiGreekTemple } from "react-icons/gi";
import { SiAcademia } from "react-icons/si";

const NavigationBar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Navbar
      bg={scrolled ? 'light' : 'dark'}
      variant={scrolled ? 'light' : 'dark'}
      expand="lg"
      fixed="top"
      className={scrolled ? 'navbar-scrolled' : ''}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className={scrolled ? 'text-dark' : 'text-light'}>
          <GiGreekTemple className='logo' />Həcər Verdiyeva
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={scrolled ? 'text-dark' : 'text-light'} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={scrolled ? 'text-dark' : 'text-light'}>{t('navbar.home')}</Nav.Link>
            <Nav.Link as={Link} to="/photos" className={scrolled ? 'text-dark' : 'text-light'}>{t('navbar.photos')}</Nav.Link>
            <Nav.Link as={Link} to="/about" className={scrolled ? 'text-dark' : 'text-light'}>{t('navbar.about')}</Nav.Link>
            <Nav.Link as={Link} to="/titles" className={scrolled ? 'text-dark' : 'text-light'}>{t('navbar.titles')}</Nav.Link>
          </Nav>
          <Nav className="social-icons">
            <Nav.Link href="https://www.facebook.com/profile.php?id=100008438296052" target="_blank" className={scrolled ? 'text-dark' : 'text-light'} title="Facebook">
              <FaFacebook />
            </Nav.Link>
            <Nav.Link href="https://twitter.com" target="_blank" className={scrolled ? 'text-dark' : 'text-light'} title="Twitter">
              <FaTwitter />
            </Nav.Link>
            <Nav.Link href="https://linkedin.com" target="_blank" className={scrolled ? 'text-dark' : 'text-light'} title="LinkedIn">
              <FaLinkedin />
            </Nav.Link>
            <Nav.Link href="https://bakustate.academia.edu/HajarVerdiyeva" target="_blank" className={scrolled ? 'text-dark' : 'text-light'} title="Academia">
              <SiAcademia />
            </Nav.Link>
            <NavDropdown title="Language" id="basic-nav-dropdown" className={scrolled ? 'text-dark' : 'text-light'}>
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