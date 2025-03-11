import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import YouTubeVideo from '../components/YouTubeVideo';
import '../css/videos.css';

const videos = [
  { videoId: 'K-wCck8Vkbw', title: '"Multikulturalizm" verilişi 23' },
  { videoId: 'X0IB02XbXXQ', title: 'Французское издание о попытках арменизации албанского храма в Карабахе' },
  { videoId: '5GSeEaKEqi8', title: 'Хроники переселения армян на Кавказ' },
  { videoId: '3jnJmZS1qNc', title: '«Просто о сложном» : переселение армян на Кавказ. Передача вторая' },
  { videoId: 'qsP-kGrf1MI', title: '«Просто о сложном»: переселение армян на Кавказ. Передача первая' },
  { videoId: 'IVUfwIkdfoA', title: '«Просто о сложном»: переселение армян на Кавказ. Передача четвёртая' },
  { videoId: 'KFJAqsjZVQw', title: '«Просто о сложном»: переселение армян на Кавказ. Передача третья' },
  { videoId: 'OQp3ifptP2k', title: '«Просто о сложном» переселение армян на Кавказ' },
];

const Videos = () => {
  return (
    <Container className="videos-page">
      <Row>
        <Col>
          <h1 className="videos-title">My YouTube Videos</h1>
        </Col>
      </Row>
      <Row>
        {videos.map((video, index) => (
          <Col md={4} key={index} className="d-flex justify-content-center mt-4">
            <YouTubeVideo videoId={video.videoId} title={video.title} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Videos;