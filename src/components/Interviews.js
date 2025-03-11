import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../css/interviews.css';

const Interviews = ({ interviews }) => {
  return (
    <Row>
      
      {interviews.map((interview, index) => (
        <Col md={4} key={index} className="mb-4 d-flex mt-5">
          <Card className="interview-card w-100">
            <Card.Img variant="top" src={interview.image} />
            <Card.Body className="interview-card-body">
              <Card.Title>{interview.name}</Card.Title>
              <Card.Text>
                <a href={interview.url} target="_blank" rel="noopener noreferrer">
                  Read more
                </a>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

Interviews.propTypes = {
  interviews: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Interviews;