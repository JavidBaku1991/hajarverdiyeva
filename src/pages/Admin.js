import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Nav, Tab } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import AdminMonographs from './AdminMonographs';
import AdminArticles from './AdminArticles';
import AdminDissertations from './AdminDissertations';
import '../css/admin.css';

const Admin = ({ videos, setVideos, interviews, setInterviews }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('interviews');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
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
      console.log('Fetched titles:', response.data);
    } catch (error) {
      setError('Error fetching titles');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTitles();
  }, []);

  // Handle form submission for each section
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (activeTab === 'articles') {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('pdfFile', formData.pdfFile);
      formDataToSend.append('imageFile', formData.imageFile);
      
      try {
        const response = await axios.post('http://localhost:5000/api/articles', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // ... rest of articles handling
      } catch (error) {
        console.error('Error saving:', error);
        setError(`Error saving ${activeTab}: ${error.response?.data?.message || error.message}`);
      }
    } else {
      try {
        if (activeTab === 'videos') {
          const response = await axios.post('http://localhost:5000/api/videos', {
            title: formData.title,
            videoId: formData.videoId,
            description: formData.description
          });
          setVideos([...videos, response.data]);
          setFormData({
            ...formData,
            title: '',
            videoId: '',
            description: ''
          });
        } else if (activeTab === 'interviews') {
          if (!formData.title || !formData.url || !formData.image) {
            alert('Title, URL, and Image URL are required');
            return;
          }

          const response = await axios.post('http://localhost:5000/api/interviews', {
            title: formData.title,
            url: formData.url,
            image: formData.image,
            description: formData.description || '',
            language: formData.language || 'az'
          });
          
          console.log('Sending interview data:', {
            title: formData.title,
            url: formData.url,
            image: formData.image,
            description: formData.description || '',
            language: formData.language || 'az'
          });
          
          setInterviews([...interviews, response.data]);
          setFormData({
            title: '',
            url: '',
            image: '',
            description: '',
            language: 'az'
          });
        }
      } catch (error) {
        console.error('Error saving:', error);
        setError(`Error saving ${activeTab}: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  // Handle delete for each section
  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
      try {
        if (type === 'videos') {
          await axios.delete(`http://localhost:5000/api/videos/${id}`);
          setVideos(videos.filter(video => video._id !== id));
        } else if (type === 'interviews') {
          await axios.delete(`http://localhost:5000/api/interviews/${id}`);
          setInterviews(interviews.filter(interview => interview._id !== id));
        }
      } catch (error) {
        setError(`Error deleting ${type.slice(0, -1)}`);
        console.error('Error:', error);
      }
    }
  };

  // Render form for each section
  const renderForm = (type) => {
    const formFields = {
      videos: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'videoId', label: 'Video ID', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'text', required: true }
      ],
      interviews: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'url', label: 'URL', type: 'text', required: true },
        { name: 'image', label: 'Image URL', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'text', required: false },
        { name: 'language', label: 'Language', type: 'select', required: true, options: [
          { value: 'az', label: 'Azerbaijani' },
          { value: 'en', label: 'English' }
        ]}
      ]
    };

    if (!formFields[type]) {
      console.error(`No form fields defined for type: ${type}`);
      return <div>Error: Invalid form type</div>;
    }

    return (
      <Form onSubmit={(e) => handleSubmit(e)}>
        {formFields[type].map((field) => (
          <Form.Group key={field.name} className="mb-3">
            <Form.Label>{field.label}</Form.Label>
            {field.type === 'select' ? (
              <Form.Control
                as="select"
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                required={field.required}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            ) : (
              <Form.Control
                type={field.type}
                name={field.name}
                value={formData[field.name] || ''}
                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                required={field.required}
              />
            )}
          </Form.Group>
        ))}
        <Button variant="primary" type="submit">
          {editingId ? 'Update' : 'Add'} {type.charAt(0).toUpperCase() + type.slice(1)}
        </Button>
      </Form>
    );
  };

  // Render table for each section
  const renderTable = (items, type) => {
    if (!items || items.length === 0) {
      return <p>No items added yet.</p>;
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(items[0]).map(key => (
              <th key={key}>{key}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id || index}>
              {Object.entries(item).map(([key, value]) => (
                <td key={key}>
                  {key === 'image' && typeof value === 'string' && value.startsWith('blob:') ? (
                    <img src={value} alt="Item" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                  ) : (
                    value
                  )}
                </td>
              ))}
              <td>
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
  };

  return (
    <Container className="admin-dashboard">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <Button variant="danger" onClick={() => {
          localStorage.removeItem('adminToken');
          window.location.href = '/admin/login';
        }}>
          Logout
        </Button>
      </div>

      <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link eventKey="interviews">Interviews</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="videos">Videos</Nav.Link>
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
            <Row>
              <Col>
                <h3>Manage Interviews</h3>
                {renderForm('interviews')}
                {renderTable(interviews, 'interviews')}
              </Col>
            </Row>
          </Tab.Pane>
          <Tab.Pane eventKey="videos">
            <Row>
              <Col>
                <h3>Manage Videos</h3>
                {renderForm('videos')}
                {renderTable(videos, 'videos')}
              </Col>
            </Row>
          </Tab.Pane>
          <Tab.Pane eventKey="monographs">
            <Row>
              <Col>
                <h3>Manage Monographs</h3>
                <AdminMonographs />
              </Col>
            </Row>
          </Tab.Pane>
          <Tab.Pane eventKey="articles">
            <Row>
              <Col>
                <h3>Manage Articles</h3>
                <AdminArticles />
              </Col>
            </Row>
          </Tab.Pane>
          <Tab.Pane eventKey="dissertations">
            <Row>
              <Col>
                <h3>Manage Dissertations</h3>
                <AdminDissertations />
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </Container>
  );
};

export default Admin; 