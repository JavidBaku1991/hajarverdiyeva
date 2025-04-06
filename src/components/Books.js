import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../css/books.css';
import { useTranslation } from 'react-i18next';

const Books = ({ books }) => {
  const { t } = useTranslation();

  const handleDownload = (url, title) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', title || 'book'); // Fallback name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Row className="g-4"> {/* Add spacing between rows */}
      {books.map((book, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex"> {/* Adjust column sizes */}
          <Card className="book-card w-100 mt-3">
            <div className="book-card-img-container">
              <Card.Img variant="top" src={book.image} className="book-card-img" />
              <div className="book-card-overlay">
                <Card.Body className="book-card-body">
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>{book.description}</Card.Text>
                  <Button variant="primary" onClick={() => handleDownload(book.url, book.title)}>
                    {t('download')}
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
