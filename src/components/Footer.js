// filepath: /d:/Portfolio projects/hajar/src/components/Footer.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2025 My Portfolio. All Rights Reserved.</p>
            <p>Contact: email@example.com</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;