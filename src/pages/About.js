import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/about.css';

const About = () => {
  return (
    <div className="about-page">
      <Container>
        <Row>
          <Col>
            <h1 className="about-title">About Me</h1>
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
            <ul className="about-list">
              <li>Quantum Mechanics</li>
              <li>Particle Physics</li>
              <li>Astrophysics</li>
              <li>Biochemistry</li>
            </ul>
            <h2 className="about-subtitle">Publications</h2>
            <p className="about-description">
              I have published numerous papers in prestigious journals, contributing to the body of knowledge in my field.
            </p>
            <h2 className="about-subtitle">Publications</h2>
            <p className="about-description">
              I have published numerous papers in prestigious journals, contributing to the body of knowledge in my field.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;