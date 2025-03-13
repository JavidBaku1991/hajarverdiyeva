import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/about.css';
import { useTranslation } from 'react-i18next';
import about from '../photos/15.jpg';

const About = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="about-page">
      <Container>
        <Row>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <img src={about} alt="About" className="about-image" />
          </Col>
          <Col md={8}>
            <h1 className="about-title">{t('about.brand')}</h1>
            <p className="about-description">
              I am a dedicated scientist with a passion for research and discovery. My work focuses on advancing our understanding of the natural world through rigorous experimentation and analysis.
            </p>
            <h2 className="about-subtitle">Research Interests</h2>
            <ul className="about-list">
              <li>Quantum Mechanics</li>
              <li>Particle Physics</li>
              <li>Astrophysics</li>
              <li>Biochemistry</li>
            </ul>
          
          </Col>  <h2 className="about-subtitle">Publications</h2>
            <p className="about-description">
              I have published numerous papers in prestigious journals, contributing to the body of knowledge in my field.
            </p>
        </Row>
      </Container>
    </div>
  );
};

export default About;