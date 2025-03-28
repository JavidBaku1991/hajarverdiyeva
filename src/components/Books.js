import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../css/books.css';

const Books = ({ books }) => {
  const handleDownload = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', title || 'book'); // Fallback name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Row>
      {books.map((book, index) => (
        <Col key={index} xs={6} sm={6} md={4} lg={3} className="mb-4 d-flex">
          <Card className="book-card w-100 mt-5">
            <div className="book-card-img-container">
              <Card.Img variant="top" src={book.image} className="book-card-img" />
              <div className="book-card-overlay">
                <Card.Body className="book-card-body">
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.description}</Card.Text>
                  <Button variant="primary" onClick={() => handleDownload(book.url, book.title)}>
                    Download
                  </Button>
                </Card.Body>
              </div>
            </div>
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
      description: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Books;
