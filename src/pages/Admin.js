import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Nav, Tab } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AdminMonographs from './AdminMonographs';
import AdminArticles from './AdminArticles';
import AdminDissertations from './AdminDissertations';

const Admin = ({ videos, setVideos, interviews, setInterviews }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('interviews');
  const [titles, setTitles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: '',
    image: '',
    language: 'az'
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [videoId, setVideoId] = useState('');

  // Fetch data for each section
  const fetchTitles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/titles');
      setTitles(response.data);
    } catch (error) {
      setError('Error fetching titles');
      console.error('Error:', error);
    }
  };

  // Handle form submission for each section
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/${type}/${editingId}`, formData);
      } else {
        await axios.post(`http://localhost:5000/api/${type}`, formData);
      }
      setFormData({
        title: '',
        description: '',
        file: '',
        image: '',
        language: 'az'
      });
      setEditingId(null);
      if (type === 'titles') {
        fetchTitles();
      }
    } catch (error) {
      setError(`Error saving ${type}`);
      console.error('Error:', error);
    }
  };

  // Handle edit for each section
  const handleEdit = (item, type) => {
    setFormData({
      title: item.title,
      description: item.description,
      file: item.file,
      image: item.image,
      language: item.language
    });
    setEditingId(item._id);
  };

  // Handle delete for each section
  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/${type}/${id}`);
        if (type === 'titles') {
          fetchTitles();
        }
      } catch (error) {
        setError(`Error deleting ${type.slice(0, -1)}`);
        console.error('Error:', error);
      }
    }
  };

  // Handle video submission
  const handleVideoSubmit = (e) => {
    e.preventDefault();
    if (videoId) {
      setVideos([...videos, { videoId }]);
      setVideoId('');
    }
  };

  // Handle video deletion
  const handleVideoDelete = (index) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
  };

  // Handle interview submission
  const handleInterviewSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.url) {
      setInterviews([...interviews, formData]);
      setFormData({
        name: '',
        url: '',
        image: ''
      });
    }
  };

  // Handle interview deletion
  const handleInterviewDelete = (index) => {
    const newInterviews = interviews.filter((_, i) => i !== index);
    setInterviews(newInterviews);
  };

  // Render form for each section
  const renderForm = (type) => (
    <Form onSubmit={(e) => handleSubmit(e, type)}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Language</Form.Label>
            <Form.Select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            >
              <option value="az">Azerbaijani</option>
              <option value="en">English</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>File URL</Form.Label>
        <Form.Control
          type="text"
          value={formData.file}
          onChange={(e) => setFormData({ ...formData, file: e.target.value })}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        {editingId ? 'Update' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1, -1)}
      </Button>
      {editingId && (
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => {
            setEditingId(null);
            setFormData({
              title: '',
              description: '',
              file: '',
              image: '',
              language: 'az'
            });
          }}
        >
          Cancel
        </Button>
      )}
    </Form>
  );

  // Render table for each section
  const renderTable = (items, type) => (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Language</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item._id}>
            <td>{item.title}</td>
            <td>{item.language}</td>
            <td>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => handleEdit(item, type)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(item._id, type)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="interviews">Interviews</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="videos">Videos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="titles">Titles</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="monographs">Monographs</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="articles">Articles</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="dissertations">Dissertations</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="interviews">
            <h3>Add New Interview</h3>
            <Form onSubmit={handleInterviewSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="url"
                  value={formData.url || ''}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">Add Interview</Button>
            </Form>

            <h3 className="mt-4">Interviews List</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {interviews.map((interview, index) => (
                  <tr key={index}>
                    <td>{interview.name}</td>
                    <td>{interview.url}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleInterviewDelete(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab.Pane>

          <Tab.Pane eventKey="videos">
            <h3>Add New Video</h3>
            <Form onSubmit={handleVideoSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>YouTube Video ID</Form.Label>
                <Form.Control
                  type="text"
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  placeholder="Enter YouTube video ID"
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">Add Video</Button>
            </Form>

            <h3 className="mt-4">Videos List</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Video ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video, index) => (
                  <tr key={index}>
                    <td>{video.videoId}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleVideoDelete(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab.Pane>

          <Tab.Pane eventKey="titles">
            <h3>{editingId ? 'Edit Title' : 'Add New Title'}</h3>
            {renderForm('titles')}
          </Tab.Pane>

          <Tab.Pane eventKey="monographs">
            <AdminMonographs />
          </Tab.Pane>
          <Tab.Pane eventKey="articles">
            <AdminArticles />
          </Tab.Pane>
          <Tab.Pane eventKey="dissertations">
            <AdminDissertations />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Admin; 