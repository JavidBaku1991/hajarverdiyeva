import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/about.css';
import { useTranslation } from 'react-i18next';
import about from '../photos/hajar1.png';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="about-page">
      <Container>
        <Row className="about-content align-items-center">
          <Col md={4} className="about-image-container">
            <img src={about} alt="About" className="about-image" />
          </Col>
          <Col md={8}>
            <h1 className="about-title">{t('about.brand')}</h1>
            <p className="about-description">{t('hero.description')}</p>
            <h5 className="section-title">{t('about.education.title')}</h5>
            <p className="section-description">{t('about.education.description')}</p>
            <h5 className="section-title">{t('about.teaching.title')}</h5>
            <p className="section-description">{t('about.teaching.description')}</p>
          </Col>
         
         
      <Row className='mt-5'>
      <Col md={6} className="about-section">
            <h5 className="section-title">{t('about.research.title')}</h5>
            <p className="section-description">{t('about.research.description')}</p>
          </Col>
          <Col md={6} className="about-section">
            <h5 className="section-title">{t('about.otherActivities.title')}</h5>
            <p className="section-description">{t('about.otherActivities.description')}</p>
          </Col>
      </Row>
          
        </Row>
      </Container>
    </div>
  );
};

export default About;
