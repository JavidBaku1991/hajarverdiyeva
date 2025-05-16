import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@mui/material';
import YouTubeVideo from '../components/YouTubeVideo';
import TitleComponent from '../components/TitleComponent';
import Interviews from '../components/Interviews';
import Books from '../components/Books';
import '../css/home.css';
import heroImg from '../photos/hajar12.png';
import TitleLine from '../components/TitleLine';
import SocialSpeedDial from '../components/SocialSpeedDial';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// PDF imports
import nem from '../pdf/monoqrafiyalar/nem.pdf';
import dok from '../pdf/monoqrafiyalar/dok.pdf';
import cin from '../pdf/monoqrafiyalar/cingiz.pdf';
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
import hecer8 from '../photos/hajar1.jpg';
import hecer7 from '../photos/interview4.png';

const Home = ({ interviews }) => {
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const titles = [
    { name: 'Первая мировая война и беженцы — мусульмане Кавказа', url: 'https://1905.az/ru/%D0%BF%D0%B5%D1%80%D0%B2%D0%B0%D1%8F-%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D1%8F-%D0%B2%D0%BE%D0%B9%D0%BD%D0%B0-%D0%B8-%D0%B1%D0%B5%D0%B6%D0%B5%D0%BD%D1%86%D1%8B-%D0%BC%D1%83%D1%81%D1%83%D0%BB%D1%8C/', image: hecer1 },
    { name: '"Erməni-qriqoryan kilsəsi XIX əsr ərzində alban irsini məhv edib, qarət edirdi"', url: 'https://1905.az/erm%C9%99ni-qriqoryan-kils%C9%99si-xix-%C9%99sr-%C9%99rzind%C9%99-alban-irsini-m%C9%99hv-edib-qar%C9%99t-edirdi/', image: hecer2 },
    { name: '"На матрице истины"', url: 'https://br.az/politics/71069/na-matrice-istiny/', image: hecer3 },
  ];

  const books = [
    { title: 'Немцы  в Северном  Азербайджане', image: kitab2, url: nem },
    { title: 'Немцы в Азербайджане', image: kitab3, url: cin },
    { title: '«РОДОСЛОВНАЯ» АРМЯН И ИХ МИГРАЦИЯ НА КАВКАЗ С БАЛКАН', image: rodos1, url: rodos },
    { title: 'Докавказская история армян ', image: kitab1, url: dok },
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        console.log('Starting to fetch videos...');
        
        const response = await axios.get('http://localhost:5000/api/videos', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Raw response:', response);
        console.log('Response status:', response.status);
        console.log('Response data:', JSON.stringify(response.data, null, 2));
        
        if (response.data && Array.isArray(response.data)) {
          console.log('Number of videos received:', response.data.length);
          
          // Filter out invalid videos and sort by createdAt
          const validVideos = response.data
            .filter(video => {
              const isValid = video && video.videoId && video.videoId.trim();
              if (!isValid) {
                console.log('Invalid video found:', video);
              }
              return isValid;
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          console.log('Valid videos after filtering:', JSON.stringify(validVideos, null, 2));
          setVideos(validVideos);
        } else {
          console.error('Invalid response format:', response.data);
          setError('Invalid response format from server');
        }
      } catch (error) {
        console.error('Error fetching videos:', {
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data
          } : 'No response',
          request: error.request ? 'Request was made but no response received' : 'No request was made'
        });
        setError(`Failed to fetch videos: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Debug videos state changes
  useEffect(() => {
    console.log('Videos state updated:', videos);
  }, [videos]);

  return (
    <div className="bg-light text-dark">
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
          <Col>
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
          <Col className='mt-5'>
            <TitleLine title={t('interviews-title')} />
            <Interviews interviews={interviews} />
          </Col>
        </Row>

        <Row className='mb-5 mt-5'>
          <TitleLine title={t('videos-title')} />
          <div className='mb-4'></div>
          {error && <div className="alert alert-danger">{error}</div>}
          {loading ? (
            <div className="text-center w-100">Loading videos...</div>
          ) : videos.length === 0 ? (
            <div className="text-center w-100">No videos available</div>
          ) : (
            videos.map((video, index) => {
              console.log('Rendering video:', video);
              return (
                <Col md={4} key={video._id} className="d-flex justify-content-center mt-2 mb-5">
                  <div style={{ width: '100%', maxWidth: '400px' }}>
                    <YouTubeVideo 
                      videoId={video.videoId} 
                      title={video.title}
                      description={video.description}
                    />
                  </div>
                </Col>
              );
            })
          )}
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
      <SocialSpeedDial />
    </div>
  );
};

export default Home;