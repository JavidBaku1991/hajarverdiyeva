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

const Home = () => {
  const { t } = useTranslation();
  const [videos, setVideos] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const books = [
    { title: 'Немцы  в Северном  Азербайджане', image: kitab2, url: nem },
    { title: 'Немцы в Азербайджане', image: kitab3, url: cin },
    { title: '«РОДОСЛОВНАЯ» АРМЯН И ИХ МИГРАЦИЯ НА КАВКАЗ С БАЛКАН', image: rodos1, url: rodos },
    { title: 'Докавказская история армян ', image: kitab1, url: dok },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Starting to fetch data...');
        
        const [videosRes, interviewsRes, titlesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/videos'),
          axios.get('http://localhost:5000/api/interviews'),
          axios.get('http://localhost:5000/api/titles')
        ]);
        
        // Handle videos
        if (videosRes.data && Array.isArray(videosRes.data)) {
          const validVideos = videosRes.data
            .filter(video => video && video.videoId && video.videoId.trim())
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setVideos(validVideos);
        }

        // Handle interviews
        if (interviewsRes.data && Array.isArray(interviewsRes.data)) {
          const validInterviews = interviewsRes.data
            .filter(interview => interview && interview.title && interview.url)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
          setInterviews(validInterviews);
        }

        // Handle titles
        if (titlesRes.data && Array.isArray(titlesRes.data)) {
          const validTitles = titlesRes.data
            .filter(title => title && title.name && title.url && title.image)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setTitles(validTitles);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            {loading ? (
              <div className="text-center w-100">Loading titles...</div>
            ) : titles.length === 0 ? (
              <div className="text-center w-100">No titles available</div>
            ) : (
              <TitleComponent titles={titles} />
            )}
          </Col>
        </Row>

        <Row>
          <Col className='mt-5'>
            <TitleLine title={t('interviews-title')} />
            {loading ? (
              <div className="text-center w-100">Loading interviews...</div>
            ) : interviews.length === 0 ? (
              <div className="text-center w-100">No interviews available</div>
            ) : (
              <Interviews interviews={interviews} />
            )}
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
            videos.map((video, index) => (
              <Col md={4} key={video._id} className="d-flex justify-content-center mt-2 mb-5">
                <div style={{ width: '100%', maxWidth: '400px' }}>
                  <YouTubeVideo 
                    videoId={video.videoId} 
                    title={video.title}
                    description={video.description}
                  />
                </div>
              </Col>
            ))
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