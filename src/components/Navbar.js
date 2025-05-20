import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import '../css/navbar.css';
import { GiGreekTemple } from "react-icons/gi";
import { SiAcademia } from "react-icons/si";

const NavigationBar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false); // State to track if the menu is expanded

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

      // Close the menu on scroll
      if (expanded) {
        setExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [expanded]);

  return (
    <Navbar
      bg={scrolled ? 'light' : 'dark'}
      variant={scrolled ? 'light' : 'dark'}
      expand="lg"
      fixed="top"
      className={scrolled ? 'navbar-scrolled' : ''}
      expanded={expanded} // Control the expanded state
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className={scrolled ? 'text-dark' : 'text-light'}>
          <GiGreekTemple className='logo' />{t('navbar.brand')}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={scrolled ? 'text-dark' : 'text-light'}
          onClick={() => setExpanded(!expanded)} // Toggle the menu
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={scrolled ? 'text-dark' : 'text-light'} onClick={() => setExpanded(false)}>
              {t('navbar.home')}
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={scrolled ? 'text-dark' : 'text-light'} onClick={() => setExpanded(false)}>
              {t('navbar.about')}
            </Nav.Link>
            <NavDropdown
              title={t('navbar.publications')}
              id="publications-dropdown"
              className={scrolled ? 'text-dark' : 'text-light'}
            >
              <NavDropdown.Item as={Link} to="/dissertations" onClick={() => setExpanded(false)}>
                {t('navbar.dissertations')}
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/monographies" onClick={() => setExpanded(false)}>
                {t('navbar.monographies')}
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/articles" onClick={() => setExpanded(false)}>
                {t('navbar.articles')}
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/videos" className={scrolled ? 'text-dark' : 'text-light'} onClick={() => setExpanded(false)}>
              {t('navbar.videos')}
            </Nav.Link>
            <Nav.Link as={Link} to="/contacts" className={scrolled ? 'text-dark' : 'text-light'} onClick={() => setExpanded(false)}>
              {t('navbar.contact')}
            </Nav.Link>
          </Nav>
          <Nav className="social-icons">
            <Nav.Link href="https://www.facebook.com/profile.php?id=100008438296052" target="_blank" className={scrolled ? 'text-dark' : 'text-light'} title="Facebook">
              <FaFacebook />
            </Nav.Link>
            <Nav.Link href="https://twitter.com" target="_blank" className={scrolled ? 'text-dark' : 'text-light'} title="Twitter">
              <FaTwitter />
            </Nav.Link>
            <Nav.Link href="https://bakustate.academia.edu/HajarVerdiyeva" target="_blank" className={scrolled ? 'text-dark' : 'text-light'} title="Academia">
              <SiAcademia />
            </Nav.Link>
            <NavDropdown title={<FaGlobe className={scrolled ? 'text-dark' : 'text-light'} />} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('az')}>Azərbaycanca</NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('ru')}>Русский</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;