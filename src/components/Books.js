import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../css/books.css';

const Books = ({ books }) => {
  return (
    <Row>
      {books.map((book, index) => (
        <Col key={index} xs={6} sm={6 }md={4} lg={3} className="mb-4 d-flex">
          <Card className="book-card w-100 mt-5">
            <Card.Img variant="top" src={book.image} />
            <Card.Body className="book-card-body">
              <Card.Title>{book.title}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

Books.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Books;