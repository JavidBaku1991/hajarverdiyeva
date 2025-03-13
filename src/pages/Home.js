import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import YouTubeVideo from '../components/YouTubeVideo';
import TitleComponent from '../components/TitleComponent';
import Interviews from '../components/Interviews';
import Books from '../components/Books';
import '../css/home.css';
import heroImg from '../photos/hecer3.jpg';
import TitleLine from '../components/TitleLine';

// images for books
import kitab2 from '../photos/books/kitab2.jpg';
import kitab3 from '../photos/books/kitab3.jpg';
import kitab4 from '../photos/books/kitab4.jpg';
import kitab5 from '../photos/books/kitab5.jpg';

// images for titles
import hecer1 from '../photos/titles/home1.jpg';
import hecer2 from '../photos/titles/home2.jpg';
import hecer3 from '../photos/titles/home3.jpg';
import hecer4 from '../photos/titles/home4.jpg';
import hecer5 from '../photos/titles/home5.jpg';

const videos = [
  { videoId: 'X0IB02XbXXQ', title: 'Французское издание о попытках арменизации албанского храма в Карабахе' },
  { videoId: '5GSeEaKEqi8', title: 'Хроники переселения армян на Кавказ' },
  { videoId: '3jnJmZS1qNc', title: '«Просто о сложном» : переселение армян на Кавказ. Передача вторая' },
];

const interviews = [
  { name: 'Həcər Verdiyeva: “Tarixdə “Böyük Ərməniyyə” olmayıb.', url: 'https://1905.az/hecer-verdiyeva-tarixde-boyuk-ermeniyye-olmayib/', image: hecer5 },
  { name: 'Həcər Verdiyeva: “Tarixdə “Böyük Ərməniyyə” olmayıb.', url: 'https://1905.az/erm%C9%99ni-qriqoryan-kils%C9%99si-xix-%C9%99sr-%C9%99rzind%C9%99-alban-irsini-m%C9%99hv-edib-qar%C9%99t-edirdi/', image: hecer5 },
  { name: 'Развязывая «узлы» истории', url: 'https://br.az/politics/63227/razvyazyvaya-uzly-istorii/', image: hecer4 }
];

const titles = [
  { name: 'Первая мировая война и беженцы — мусульмане Кавказа', url: 'https://1905.az/ru/%D0%BF%D0%B5%D1%80%D0%B2%D0%B0%D1%8F-%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%8F-%D0%B2%D0%BE%D0%B9%D0%BD%D0%B0-%D0%B8-%D0%B1%D0%B5%D0%B6%D0%B5%D0%BD%D1%86%D1%8B-%D0%BC%D1%83%D1%81%D1%83%D0%BB%D1%8C/', image: hecer1 },
  { name: '“Erməni-qriqoryan kilsəsi XIX əsr ərzində alban irsini məhv edib, qarət edirdi”', url: 'https://1905.az/erm%C9%99ni-qriqoryan-kils%C9%99si-xix-%C9%99sr-%C9%99rzind%C9%99-alban-irsini-m%C9%99hv-edib-qar%C9%99t-edirdi/', image: hecer2 },
  { name: '“Erməni-qriqoryan kilsəsi XIX əsr ərzində alban irsini məhv edib, qarət edirdi”', url: 'https://br.az/politics/71069/na-matrice-istiny/', image: hecer3 },
];

const books = [
  { title: 'Book 2', image: kitab2 },
  { title: 'Book 3', image: kitab3 },
  { title: 'Book 4', image: kitab4 },
  { title: 'Book 5', image: kitab5 },
];

const Home = () => {
  return (
    <div className="bg-light text-dark">
      <div className="hero-container">
        <img src={heroImg} alt="Hero" className="hero-image" />
        <div className="hero-content">
          <h1>Həcər Verdiyeva</h1>
          <h3>Tarix elmləri doktoru</h3>
          <p>Veb-səhifədə tarixçinin fəaliyyətinə dair bütün məlumatları tapa bilərsiniz</p>
        </div>
      </div>
      <Container>
        <Row>
          <Col >
            <Books books={books} />
          </Col>
        </Row> <Row className='home-titles-container mt-5'>
          <Col>
          <TitleLine title='Məqalələr' />
            <TitleComponent titles={titles} /> 
          </Col>
        </Row>
       
        <Row>
          <Col className='mt-5' >
          <TitleLine title='Müsahibələr' />

            <Interviews interviews={interviews} >
              
            </Interviews>
          </Col>
        </Row>
       
        <Row>
        <TitleLine title='Videolar' />

          {videos.map((video, index) => (
            <Col md={4} key={index} className="d-flex justify-content-center mt-2 mb-5">

              <YouTubeVideo videoId={video.videoId} title={video.title} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;