import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/footer.css';
import footerBg from '../photos/footer.jpg'; // Replace with the actual image path
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SiAcademia } from 'react-icons/si';

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer absolute-bottom">
      <Container>
        <Row>
          <Col md={3} className="footer-image-col">
            <img src={footerBg} alt={t('footer.imageAlt')} className="footer-image" />
          </Col>
          <Col md={9} className="footer-content">
            <Row>
              <Col md={4} className="footer-col">
                <h5>{t('footer.contact')}</h5>
                <p>{t('footer.email')}: hacar2002@yahoo.com</p>
              </Col>
              <Col md={4} className="footer-col">
                <h5>{t('footer.follow-us')}</h5>
                <div className="social-icons">
                  <a href="https://www.facebook.com/profile.php?id=100008438296052" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href="https://bakustate.academia.edu/HajarVerdiyeva" target="_blank" rel="noopener noreferrer">
                    <SiAcademia />
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Col className="text-center mt-3">
          <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;