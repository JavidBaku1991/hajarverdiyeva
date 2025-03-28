
import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import YouTubeVideo from '../components/YouTubeVideo'; // Assuming you have a YouTubeVideo component

const Videos = ({ videos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

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

  return (
    <Container>
      <Row>
        <h1 className='mt-4 d-flex justify-content-center'>My videos</h1>
        {currentVideos.map((video, index) => (
          <Col md={4} key={index} className="d-flex justify-content-center mt-2 mb-5">
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
                className="mx-1"
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