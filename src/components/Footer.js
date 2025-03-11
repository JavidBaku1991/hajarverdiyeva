import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/footer.css';
import footerBg from '../photos/footer.jpg'; // Replace with the actual image path
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SiAcademia } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={3} className="footer-image-col">
            <img src={footerBg} alt="Footer Background" className="footer-image" />
          </Col>
          <Col md={9} className="footer-content">
            <Row>
           
              <Col md={4} className="footer-col">
                <h5>Contact</h5>
                <p>Email: hacar2002@yahoo.com</p>
                <p>Phone: +123 456 7890</p>
              </Col>
              <Col md={4} className="footer-col">
                <h5>Follow Us</h5>
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
            <Row>
             
            </Row>
          </Col>
        </Row>
        <Col className="text-center mt-3">
                <p>&copy; {new Date().getFullYear()} Həcər Verdiyeva. All rights reserved.</p>
              </Col>
      </Container>
    </footer>
  );
};

export default Footer;