// filepath: /d:/Portfolio projects/hajar/src/components/PhotoFolder.js
import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/photoFolder.css';

const PhotoFolder = ({ title, imageUrl, route }) => {
  return (
    <Card className="photo-folder">
      <Link to={route}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default PhotoFolder;