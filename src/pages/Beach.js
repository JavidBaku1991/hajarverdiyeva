// filepath: /d:/Portfolio projects/hajar/src/pages/Beach.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import image1 from '../photos/10.jpg';
const Beach = () => {
  const photos = [image1, image1, image1, image1, image1, image1];

  return (
    <div className="photo-folder-page">
      <Container>
        <Row>
          <Col>
            <h1>Beach Photos</h1>
            <Row>
              {photos.map((photo, index) => (
                <Col key={index} md={4}>
                  <img src={photo} alt={`Beach ${index + 1}`} className="img-fluid" />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Beach;