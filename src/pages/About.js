import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/about.css';
import { useTranslation } from 'react-i18next';
import about from '../photos/hajar12.jpg';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="about-page">
      <Container>
        <Row className="about-content">
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <div className="about-image-container">
              <img src={about} alt="About" className="about-image" />
            </div>
          </Col>
          <Col md={8}>
            <h1 className="about-title">{t('about.brand')}</h1>
            <h2 className="about-subtitle">{t('about.researchInterests.title')}</h2>
            <ul className="about-list">
              <li>{t('about.researchInterests.item1')}</li>
              <li>{t('about.researchInterests.item2')}</li>
              <li>{t('about.researchInterests.item3')}</li>
              <li>{t('about.researchInterests.item4')}</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <div className="about-section">
            <h3 className="section-title">{t('about.education.title')}</h3>
            <p className="section-description">{t('about.education.description')}</p>
          </div>
          <div className="about-section">
            <h3 className="section-title">{t('about.teaching.title')}</h3>
            <p className="section-description">{t('about.teaching.description')}</p>
          </div>
          <div className="about-section">
            <h3 className="section-title">{t('about.research.title')}</h3>
            <p className="section-description">{t('about.research.description')}</p>
          </div>
          <div className="about-section">
            <h3 className="section-title">{t('about.otherActivities.title')}</h3>
            <p className="section-description">{t('about.otherActivities.description')}</p>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default About;
