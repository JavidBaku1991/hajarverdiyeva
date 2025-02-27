import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import '../css/titles.css';

// Import PDF files
import title1 from '../pdf/title1.pdf';
import title2 from '../pdf/title2.pdf';
import title3 from '../pdf/title3.pdf';

const titles = [
  { name: 'Title 1', url: title1 },
  { name: 'Title 2', url: title2 },
  { name: 'Title 3', url: title3 },
  { name: 'Title 4', url: title1 },
  { name: 'Title 5', url: title2 },
  { name: 'Title 6', url: title3 },
];

const Titles = () => {
  const [show, setShow] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (title) => {
    setSelectedTitle(title);
    setShow(true);
  };

  return (
    <div className="titles-page">
      <Container>
        <Row>
          <Col>
            <h1 className="titles-title">My Titles</h1>
            <Row>
              {titles.map((title, index) => (
                <Col md={6} key={index} className="d-flex justify-content-center">
                  <div className="title-item">
                    <Button variant="link" onClick={() => handleShow(title)}>
                      {title.name}
                    </Button>
                    <a href={title.url} download className="download-link">
                      Download
                    </a>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedTitle?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTitle && (
            <iframe
              src={selectedTitle.url}
              title={selectedTitle.name}
              width="100%"
              height="500px"
            ></iframe>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Titles;