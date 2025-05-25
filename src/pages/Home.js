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
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BakRabochiyPdf from '../pdf/kitablar/bakrabochiy.pdf';
import BakRabochiy from '../pdf/kitablar/BakRabochiy.png'

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

  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const books = [
    { 
      title: 'Немцы в Северном Азербайджане', 
      image: kitab2, 
      url: nem,
      description: 'Research on German communities in Northern Azerbaijan'
    },
    { 
      title: 'Немцы в Азербайджане', 
      image: kitab3, 
      url: cin,
      description: 'Comprehensive study of German presence in Azerbaijan'
    },
    { 
      title: '«РОДОСЛОВНАЯ» АРМЯН И ИХ МИГРАЦИЯ НА КАВКАЗ С БАЛКАН', 
      image: rodos1, 
      url: rodos,
      description: 'Study of Armenian genealogy and migration from the Balkans to the Caucasus'
    },
    { 
      title: 'Докавказская история армян', 
      image: kitab1, 
      url: dok,
      description: 'Pre-Caucasian history of Armenians'
    },
    { 
      title: 'На матрице истины: армяне - аллохтонына Кавказе', 
      image: BakRabochiy, // Temporarily using dok.jpg as placeholder
      url: BakRabochiyPdf,
      description: 'Research on Armenians as allochthons in the Caucasus'
    },
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

        // Fetch articles
        const articlesResponse = await axios.get('http://localhost:5000/api/articles');
        console.log('Raw articles data:', articlesResponse.data);
        
        if (!Array.isArray(articlesResponse.data)) {
          console.error('Articles data is not an array:', articlesResponse.data);
          setArticles([]);
          return;
        }

        // Sort articles by date and take the last 5
        const sortedArticles = articlesResponse.data
          .filter(article => {
            // Check for required fields based on article type
            const hasRequiredFields = 
              article.title && // Title is required for all articles
              (
                // Type 1: Articles with PDF and image files (new format)
                (article.pdfFile && article.imageFile) ||
                // Type 2: Articles with URL and image
                (article.url && article.image) ||
                // Type 3: Articles with file and image (old format)
                (article.file && article.image)
              );

            if (!hasRequiredFields) {
              console.error('Invalid article data:', article);
              return false;
            }
            return true;
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        
        console.log('Sorted articles:', sortedArticles);
        setArticles(sortedArticles);

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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/logo512.png';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('D:/')) {
      // Convert absolute path to relative URL
      const relativePath = imagePath.split('server')[1].replace(/\\/g, '/');
      return `http://localhost:5000${relativePath}`;
    }
    return `http://localhost:5000${imagePath}`;
  };

  return (
    <div className="bg-light text-dark">
      <div className="hero-container">
        <img src={heroImg} alt="Hajar Verdiyeva" className="hero-image" />
        <div className="hero-content">
          <h1 className="hero-title">Hajar Verdiyeva</h1>
          <h2 className="hero-subtitle">Doctor of Historical Sciences</h2>
          <p className="hero-description">
            The website presents the historian's activities, scientific research, publications, and other information.
          </p>
        </div>
      </div>
      <Container>
        <Row className="mb-5">
          <Col>
            <TitleLine title={t('publications')} />
            <Books books={books} />
          </Col>
        </Row>

        <Row className='home-articles-container mb-5'>
          <Col>
            <TitleLine title={t('articles')} />
            {loading ? (
              <p>Loading articles...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : articles.length === 0 ? (
              <p>No articles available</p>
            ) : (
              <Slider {...sliderSettings}>
                {articles.map((article) => {
                  const imageUrl = getImageUrl(article.imageFile || article.image);
                  return (
                    <div key={article._id} className="px-2">
                      <div className="title-card">
                        <div className="title-image-container">
                          <img 
                            src={imageUrl}
                            alt={article.title}
                            className="title-image"
                            onError={(e) => {
                              console.error('Image failed to load:', imageUrl);
                              e.target.onerror = null;
                              e.target.src = '/logo512.png';
                            }}
                          />
                        </div>
                        <div className="title-content">
                          <h6 className="title-text">{article.title}</h6>
                          {(article.pdfFile || article.file || article.url) && (
                            <a 
                              href={article.url || getImageUrl(article.pdfFile || article.file)}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="btn btn-primary"
                            >
                              {article.url ? t('view') : t('read-more')}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            )}
          </Col>
        </Row>

        <Row className='mb-5'>
          <Col>
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

        <Row className='mb-5'>
          <Col>
            <TitleLine title={t('videos-title')} />
            {error && <div className="alert alert-danger">{error}</div>}
            {loading ? (
              <div className="text-center w-100">Loading videos...</div>
            ) : videos.length === 0 ? (
              <div className="text-center w-100">No videos available</div>
            ) : (
              <>
                <Row>
                  {videos.slice(0, 3).map((video, index) => (
                    <Col md={4} key={video._id} className="d-flex justify-content-center mt-2 mb-5">
                      <div style={{ width: '100%', maxWidth: '400px' }}>
                        <YouTubeVideo 
                          videoId={video.videoId} 
                          title={video.title}
                          description={video.description}
                        />
                      </div>
                    </Col>
                  ))}
                </Row>
                <div className="d-flex justify-content-center">
                  <Button
                    component={RouterLink}
                    to="/videos"
                    variant="contained"
                    color="primary"
                    className="more-link"
                  >
                    {t('read-more')}
                  </Button>
                </div>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <SocialSpeedDial />
    </div>
  );
};

export default Home;