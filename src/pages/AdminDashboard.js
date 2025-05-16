import React, { useState, useRef } from 'react';
import { Container, Row, Col, Tabs, Tab, Button, Form, Table, Modal } from 'react-bootstrap';
import '../css/admin.css';

const AdminDashboard = ({ videos, setVideos, interviews, setInterviews }) => {
  const [activeTab, setActiveTab] = useState('interviews');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [items, setItems] = useState({
    titles: [],
    monographies: []
  });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  const handleShowModal = () => {
    setPreviewImage(null);
    setFormData({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setPreviewImage(null);
    setFormData({});
    setShowModal(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the image
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setFormData(prev => ({
        ...prev,
        image: imageUrl,
        imageFile: file // Store the file object for later use
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'videos') {
      setVideos(prev => [...prev, formData]);
    } else if (activeTab === 'interviews') {
      // For interviews, only store the image URL, not the File object
      const itemToStore = { ...formData };
      delete itemToStore.imageFile; // Remove the File object
      setInterviews(prev => [...prev, itemToStore]);
    } else {
      // For interviews, only store the image URL, not the File object
      const itemToStore = { ...formData };
      delete itemToStore.imageFile; // Remove the File object
      setItems(prev => ({
        ...prev,
        [activeTab]: [...prev[activeTab], itemToStore]
      }));
    }
    setFormData({});
    setPreviewImage(null);
    handleCloseModal();
  };

  const handleDelete = (index) => {
    if (activeTab === 'videos') {
      setVideos(prev => prev.filter((_, i) => i !== index));
    } else if (activeTab === 'interviews') {
      setInterviews(prev => prev.filter((_, i) => i !== index));
    } else {
      setItems(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter((_, i) => i !== index)
      }));
    }
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case 'interviews':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={formData.url || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <div className="d-flex flex-column">
                <Button 
                  variant="outline-secondary" 
                  onClick={() => fileInputRef.current.click()}
                  className="mb-2"
                >
                  Choose Image
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                {previewImage && (
                  <div className="mt-2">
                    <img 
                      src={previewImage} 
                      alt="Preview" 
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                  </div>
                )}
              </div>
            </Form.Group>
          </>
        );
      case 'videos':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Video ID</Form.Label>
              <Form.Control
                type="text"
                name="videoId"
                value={formData.videoId || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </>
        );
      case 'titles':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={formData.url || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </>
        );
      case 'monographies':
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                name="image"
                value={formData.image || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>PDF URL</Form.Label>
              <Form.Control
                type="url"
                name="url"
                value={formData.url || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
          </>
        );
      default:
        return null;
    }
  };

  const renderTable = () => {
    let currentItems;
    if (activeTab === 'videos') {
      currentItems = videos;
    } else if (activeTab === 'interviews') {
      currentItems = interviews;
    } else {
      currentItems = items[activeTab];
    }

    if (!currentItems.length) return <p>No items added yet.</p>;

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(currentItems[0]).map(key => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              {Object.entries(item).map(([key, value]) => (
                <td key={key}>
                  {key === 'image' && typeof value === 'string' && value.startsWith('blob:') ? (
                    <img src={value} alt="Interview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  ) : (
                    value
                  )}
                </td>
              ))}
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Container className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Tab eventKey="interviews" title="Interviews">
          <Row>
            <Col>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Manage Interviews</h3>
                <Button variant="primary" onClick={handleShowModal}>
                  Add New Interview
                </Button>
              </div>
              {renderTable()}
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="titles" title="Titles">
          <Row>
            <Col>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Manage Titles</h3>
                <Button variant="primary" onClick={handleShowModal}>
                  Add New Title
                </Button>
              </div>
              {renderTable()}
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="monographies" title="Monographies">
          <Row>
            <Col>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Manage Monographies</h3>
                <Button variant="primary" onClick={handleShowModal}>
                  Add New Monography
                </Button>
              </div>
              {renderTable()}
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="videos" title="Videos">
          <Row>
            <Col>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Manage Videos</h3>
                <Button variant="primary" onClick={handleShowModal}>
                  Add New Video
                </Button>
              </div>
              {renderTable()}
            </Col>
          </Row>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {renderFormFields()}
            <Button variant="primary" type="submit" className="mt-3">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminDashboard; 