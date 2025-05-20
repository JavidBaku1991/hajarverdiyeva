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

// Initial state values
const initialVideos = [];
const initialInterviews = [];

const Home = () => {
  const { t } = useTranslation();
  const [videos, setVideos] = useState(() => {
    const savedVideos = localStorage.getItem('videos');
    if (savedVideos) {
      try {
        const parsed = JSON.parse(savedVideos);
        return parsed.map(video => {
          if (video.videoId.startsWith('blob:')) {
            const matchingVideo = initialVideos.find(v => v.videoId === video.videoId);
            if (matchingVideo) {
              return { ...video, videoId: matchingVideo.videoId };
            }
          }
          return video;
        });
      } catch (e) {
        console.error('Error parsing saved videos:', e);
        return initialVideos;
      }
    }
    return initialVideos;
  });

  const [interviews, setInterviews] = useState(() => {
    const savedInterviews = localStorage.getItem('interviews');
    if (savedInterviews) {
      try {
        const parsed = JSON.parse(savedInterviews);
        return parsed.map(interview => {
          if (interview.image.startsWith('blob:')) {
            const matchingInterview = initialInterviews.find(i => i.name === interview.name);
            if (matchingInterview) {
              return { ...interview, image: matchingInterview.image };
            }
          }
          return interview;
        });
      } catch (e) {
        console.error('Error parsing saved interviews:', e);
        return initialInterviews;
      }
    }
    return initialInterviews;
  });

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
        
        // Fetch videos
        const videosResponse = await axios.get('http://localhost:5000/api/videos');
        setVideos(videosResponse.data);

        // Fetch interviews
        const interviewsResponse = await axios.get('http://localhost:5000/api/interviews');
        setInterviews(interviewsResponse.data);

        // Fetch titles from articles endpoint
        const titlesResponse = await axios.get('http://localhost:5000/api/articles');
        setTitles(titlesResponse.data);

        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Save interviews to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('interviews', JSON.stringify(interviews));
  }, [interviews]);

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

        {/* Videos Section */}
        <section className="mb-5">
          <h2>{t('home.videos')}</h2>
          <div className="row">
            {videos.map((video, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.videoId}`}
                      title={video.title}
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{video.title}</h5>
                    <p className="card-text">{video.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Titles Section */}
        <section className="mb-5">
          <h2>{t('home.titles')}</h2>
          <div className="row">
            {titles.map((title, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img 
                    src={title.image} 
                    className="card-img-top" 
                    alt={title.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{title.title}</h5>
                    <a href={title.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      {t('home.readMore')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Container>
      <SocialSpeedDial />
    </div>
  );
};

export default Home;