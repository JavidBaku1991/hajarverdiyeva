import React from 'react';
import { Helmet } from 'react-helmet-async'; // Import Helmet
import { Container, Row, Col } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom'; // Import RouterLink for MUI Button
import { Button } from '@mui/material'; // Import MUI Button
import YouTubeVideo from '../components/YouTubeVideo';
import TitleComponent from '../components/TitleComponent';
import Interviews from '../components/Interviews';
import Books from '../components/Books';
import '../css/home.css';
import heroImg from '../photos/hajar12.png';
import TitleLine from '../components/TitleLine';
import SocialSpeedDial from '../components/SocialSpeedDial';



import nem from '../pdf/monoqrafiyalar/nem.pdf';
import dok from '../pdf/monoqrafiyalar/dok.pdf';
import cin  from '../pdf/monoqrafiyalar/cingiz.pdf';
import rodos from '../pdf/monoqrafiyalar/rodos.pdf';



// images for books
import kitab2 from '../photos/books/nem.png';
import kitab1 from '../photos/books/dok.jpg';
import kitab3 from '../photos/books/cingiz.jpg';
import rodos1 from '../photos/books/rodos.jpg';


// images for titles
import hecer1 from '../photos/titles/home1.jpg';
import hecer2 from '../photos/titles/home2.jpg';
import hecer3 from '../photos/hajar12.png';
import hecer4 from '../photos/titles/home4.jpg';
import hecer5 from '../photos/hajar11.png';
import { useTranslation } from 'react-i18next';


import hecer7 from '../photos/interview4.png';
 
const videos = [
  { videoId: 'X0IB02XbXXQ', title: 'Французское издание о попытках арменизации албанского храма в Карабахе' },
  { videoId: '0i23vP2xULE', title: 'Хроники переселения армян на Кавказ' },
  { videoId: '3jnJmZS1qNc', title: '«Просто о сложном» : переселение армян на Кавказ. Передача вторая' },
];

const interviews = [
  { name: 'Həcər Verdiyeva: “Tarixdə “Böyük Ərməniyyə” olmayıb.', url: 'https://1905.az/hecer-verdiyeva-tarixde-boyuk-ermeniyye-olmayib/', image: hecer5 },
  { name: '“Erməni-qriqoryan kilsəsi XIX əsr ərzində alban irsini məhv edib, qarət edirdi”', url: 'https://1905.az/erm%C9%99ni-qriqoryan-kils%C9%99si-xix-%C9%99sr-%C9%99rzind%C9%99-alban-irsini-m%C9%99hv-edib-qar%C9%99t-edirdi/', image: hecer2 },
  { name: 'Развязывая «узлы» истории', url: 'https://br.az/politics/63227/razvyazyvaya-uzly-istorii/', image: hecer4 },
  { name: 'Архитектура вне времени', url: 'https://baki-baku.az/%D0%B0%D1%80%D1%85%D0%B8%D1%82%D0%B5%D0%BA%D1%82%D1%83%D1%80%D0%B0-%D0%B2%D0%BD%D0%B5-%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B8/?fbclid=IwZXh0bgNhZW0CMTEAAR7T2upPLZLKcAh2Xop5Jp_vUT4IdCPoqCrUoCMSxmyQI-tL9OgETARdpQ3WqA_aem_RCNz06CnFG1sO8bN70pjMg', image: hecer7 }
];

const titles = [
  { name: 'Первая мировая война и беженцы — мусульмане Кавказа', url: 'https://1905.az/ru/%D0%BF%D0%B5%D1%80%D0%B2%D0%B0%D1%8F-%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%8F-%D0%B2%D0%BE%D0%B9%D0%BD%D0%B0-%D0%B8-%D0%B1%D0%B5%D0%B6%D0%B5%D0%BD%D1%86%D1%8B-%D0%BC%D1%83%D1%81%D1%83%D0%BB%D1%8C/', image: hecer1 },
  { name: '“Erməni-qriqoryan kilsəsi XIX əsr ərzində alban irsini məhv edib, qarət edirdi”', url: 'https://1905.az/erm%C9%99ni-qriqoryan-kils%C9%99si-xix-%C9%99sr-%C9%99rzind%C9%99-alban-irsini-m%C9%99hv-edib-qar%C9%99t-edirdi/', image: hecer2 },
  { name: '“На матрице истины”', url: 'https://br.az/politics/71069/na-matrice-istiny/', image: hecer3 },
];

const books = [
  { title: 'Немцы  в Северном  Азербайджане', image: kitab2, url: nem},
  { title: 'Немцы в Азербайджане', image: kitab3 , url: cin},
  { title: '«РОДОСЛОВНАЯ» АРМЯН И ИХ МИГРАЦИЯ НА КАВКАЗ С БАЛКАН', image:rodos1,  url: rodos},
  { title: 'Докавказская история армян ', image: kitab1 , url: dok},
];

const Home = () => {

  const { t, i18n } = useTranslation();



  return (
    <div className="bg-light text-dark">
      <Helmet>
        <title>Hajar Verdiyeva - Home</title>
        <meta name="description" content="Doctor of Historical Sciences. The website presents the historian's activities, scientific research, publications, and other information." />
        <meta property="og:title" content="Hajar Verdiyeva - Home" />
        <meta property="og:description" content="The website presents the historian's activities, scientific research, publications, and other information." />
        <meta property="og:image" content="https://hajarverdiyeva.az/hajar12.png" />
        <meta property="og:url" content="https://hajarverdiyeva.az" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="hero-container">
        <img src={heroImg} alt="Hero" className="hero-image" />
        <div className="hero-content">
        <h1 className="hero-title">{t('hero.title')}</h1>
        <h2 className="hero-subtitle">{t('hero.subtitle')}</h2>
        <p className="hero-description">{t('hero.description')}</p>
        </div>
      </div>
      <Container>
      
        <Row>
          <Col >
            <Books books={books} />
          </Col>
        </Row>
        <TitleLine title={t('titles-title')} />

         <Row className='home-titles-container mt-5'>
          <Col>
        
            <TitleComponent titles={titles} /> 
          </Col>
        </Row>
       
        <Row>
          <Col className='mt-5' >
          <TitleLine title={t('interviews-title')} />

            <Interviews interviews={interviews} >
              
            </Interviews>
          </Col>
        </Row>
       
        <Row className='mb-5 mt-5'>
        <TitleLine title={t('videos-title')} />
<div className='mb-4'></div>
          {videos.map((video, index) => (
            <Col md={4} key={index} className="d-flex justify-content-center mt-2 mb-5">

              <YouTubeVideo videoId={video.videoId} title={video.title} />
            </Col>
          ))}
          <p className="d-flex justify-content-center">
            <Button
              component={RouterLink}
              to="/videos"
              variant="contained"
              color="primary"
              className="more-link"
            >
              {t('read-more')}
            </Button>
          </p>
        </Row>
      </Container>
      <SocialSpeedDial /> {/* Add the Speed Dial */}
    </div>
  );
};

export default Home;