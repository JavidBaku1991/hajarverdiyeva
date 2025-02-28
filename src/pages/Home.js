import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Correct import statement
import YouTubeVideo from '../components/YouTubeVideo';
import TitleComponent from '../components/TitleComponent';
import '../css/home.css';
import heroImg from '../photos/hecer3.jpg';

// images for titles
import hecer1 from '../photos/titles/hecer1.jpg';

const videos = [
  { videoId: 'K-wCck8Vkbw', title: 'Video 1' },
  { videoId: '3JZ_D3ELwOQ', title: 'Video 2' },
  { videoId: 'L_jWHffIx5E', title: 'Video 3' },
  { videoId: 'eVTXPUF4Oz4', title: 'Video 4' },
  { videoId: 'hTWKbfoikeg', title: 'Video 5' },
  { videoId: 'kXYiU_JCYtU', title: 'Video 6' },
];

const titles = [
  { name: 'Title 1', url: 'https://1905.az/hecer-verdiyeva-tarixde-boyuk-ermeniyye-olmayib/', imageUrl: hecer1 },
  { name: 'Title 2', url: 'https://1905.az/hecer-verdiyeva-tarixde-boyuk-ermeniyye-olmayib/', imageUrl: hecer1 },
  { name: 'Title 3', url: 'https://1905.az/hecer-verdiyeva-tarixde-boyuk-ermeniyye-olmayib/', imageUrl: hecer1 },
  { name: 'Title 4', url: 'https://1905.az/hecer-verdiyeva-tarixde-boyuk-ermeniyye-olmayib/', imageUrl: hecer1 },
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
          <Col>
            <h2 className="video-section-title">My YouTube Videos</h2>
          </Col>
        </Row>
        <Row>
          {videos.map((video, index) => (
            <Col md={4} key={index} className="d-flex justify-content-center">
              <YouTubeVideo videoId={video.videoId} title={video.title} />
            </Col>
          ))}
        </Row>
        <Row>
          <Col>
            <h2 className="title-section-title">My Online Titles</h2>
            <TitleComponent titles={titles} />
            <div className="d-flex justify-content-center">
              <Link to="/titles" className="more-link">More</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;