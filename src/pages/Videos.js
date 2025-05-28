import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import YouTubeVideo from '../components/YouTubeVideo';
import axios from 'axios';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videosPerPage = 6;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        console.log('Starting to fetch videos in Videos component...');
        
        const response = await axios.get('http://localhost:5000/api/videos', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Raw response in Videos:', response);
        
        if (response.data && Array.isArray(response.data)) {
          console.log('Number of videos received in Videos:', response.data.length);
          
          // Filter out invalid videos and sort by createdAt
          const validVideos = response.data
            .filter(video => {
              const isValid = video && video.videoId && video.videoId.trim();
              if (!isValid) {
                console.log('Invalid video found in Videos:', video);
              }
              return isValid;
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          console.log('Valid videos after filtering in Videos:', validVideos);
          setVideos(validVideos);
        } else {
          console.error('Invalid response format in Videos:', response.data);
          setError('Invalid response format from server');
        }
      } catch (error) {
        console.error('Error fetching videos in Videos:', {
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

  // Calculate the total number of pages
  const totalPages = Math.ceil(videos.length / videosPerPage);

  // Get the videos for the current page
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="text-center">Loading videos...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <Container className='videos-container'>
      <Row>
        {currentVideos.map((video) => (
          <Col md={4} key={video._id} className="d-flex justify-content-center mt-2 mb-5">
            <YouTubeVideo videoId={video.videoId} title={video.title} />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md="auto">
          <div className="pagination mt-5">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? 'dark' : 'outline-secondary'}
                onClick={() => handlePageChange(index + 1)}
                className="mb-5"
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Videos;