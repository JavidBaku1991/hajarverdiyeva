// filepath: /d:/Portfolio projects/hajar/src/pages/Photos.js
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PhotoFolder from '../components/PhotoFolder';
import '../css/photoFolder.css';

const photoFolders = [
  { title: 'Beach', imageUrl: '/photos/1.jpg', route: '/photos/beach' },
  { title: 'Mountains', imageUrl: '/photos/2.jpg', route: '/photos/mountains' },
  { title: 'City', imageUrl: '/photos/3.jpg', route: '/photos/city' },
  { title: 'Forest', imageUrl: '/photos/4.jpg', route: '/photos/forest' },
  { title: 'Desert', imageUrl: '/photos/5.jpg', route: '/photos/desert' },

];

const Photos = () => {
  return (
    <div className="photos-page">
      <Container>
        <Row>
          {photoFolders.map((folder, index) => (
            <Col key={index} md={4} lg={3}>
              <PhotoFolder title={folder.title} imageUrl={folder.imageUrl} route={folder.route} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Photos;