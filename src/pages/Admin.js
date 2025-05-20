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
    name: '',
    description: '',
    file: '',
    image: '',
    url: '',
    language: 'az'
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [videoId, setVideoId] = useState('');

  // Fetch data for each section
  const fetchTitles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/articles');
      setTitles(response.data);
    } catch (error) {
      setError('Error fetching articles');
      console.error('Error:', error);
    }
  };

  // Handle form submission for each section
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      if (type === 'titles') {
        const titleData = {
          title: formData.title,
          url: formData.url,
          image: formData.image
        };

        if (editingId) {
          await axios.put(`http://localhost:5000/api/articles/${editingId}`, titleData);
        } else {
          const response = await axios.post('http://localhost:5000/api/articles', titleData);
          setTitles([...titles, response.data]);
        }
      } else {
        if (editingId) {
          await axios.put(`http://localhost:5000/api/${type}/${editingId}`, formData);
        } else {
          const response = await axios.post(`http://localhost:5000/api/${type}`, formData);
          if (type === 'titles') {
            setTitles([...titles, response.data]);
          }
        }
      }
      setFormData({
        title: '',
        url: '',
        image: ''
      });
      setEditingId(null);
      if (type === 'titles') {
        fetchTitles();
      }
    } catch (error) {
      console.error('Error saving:', error);
      setError(`Error saving ${type}: ${error.response?.data?.message || error.message}`);
    }
  };

  // Handle edit for each section
  const handleEdit = (item, type) => {
    setFormData({
      name: item.name,
      description: item.description,
      file: item.file,
      image: item.image,
      url: item.url,
      language: item.language
    });
    setEditingId(item._id);
  };

  // Handle delete for each section
  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type.slice(0, -1)}?`)) {
      try {
        await axios.delete(`http://localhost:5000/api/${type === 'titles' ? 'articles' : type}/${id}`);
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
  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      console.error('Error saving video:', error);
      setError('Error saving video');
    }
  };

  // Handle video deletion
  const handleVideoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos(videos.filter(video => video._id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
      setError('Error deleting video');
    }
  };

  // Handle interview submission
  const handleInterviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.title && formData.url && formData.image) {
        const response = await axios.post('http://localhost:5000/api/interviews', formData);
        setInterviews([...interviews, response.data]);
        setFormData({
          title: '',
          url: '',
          image: ''
        });
      }
    } catch (error) {
      console.error('Error saving interview:', error);
      setError('Error saving interview');
    }
  };

  // Handle interview deletion
  const handleInterviewDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/interviews/${id}`);
      setInterviews(interviews.filter(interview => interview._id !== id));
    } catch (error) {
      console.error('Error deleting interview:', error);
      setError('Error deleting interview');
    }
  };

  // Render form for each section
  const renderForm = (type) => {
    const formFields = {
      titles: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'url', label: 'URL', type: 'text', required: true },
        { name: 'image', label: 'Image URL', type: 'text', required: true }
      ],
      videos: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'videoId', label: 'Video ID', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'text', required: true }
      ],
      interviews: [
        { name: 'title', label: 'Title', type: 'text', required: true },
        { name: 'url', label: 'URL', type: 'text', required: true },
        { name: 'image', label: 'Image URL', type: 'text', required: true },
        { name: 'description', label: 'Description', type: 'text', required: true }
      ]
    };

    if (!formFields[type]) {
      console.error(`No form fields defined for type: ${type}`);
      return <div>Error: Invalid form type</div>;
    }

    return (
      <Form onSubmit={(e) => handleSubmit(e, type)}>
        {formFields[type].map((field) => (
          <Form.Group key={field.name} className="mb-3">
            <Form.Label>{field.label}</Form.Label>
            <Form.Control
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
              required={field.required}
              placeholder={field.type === 'text' ? `Enter ${field.label.toLowerCase()}` : ''}
            />
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
      return <p>No {type} available</p>;
    }

    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
            <th>Image URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            // Create a unique key using multiple fallbacks
            const uniqueKey = item._id || 
                            item.id || 
                            `${type}-${index}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            
            return (
              <tr key={uniqueKey}>
                <td>{item.name || item.title || 'N/A'}</td>
                <td>{item.url || 'N/A'}</td>
                <td>{item.image || 'N/A'}</td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDelete(item._id || item.id, type)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="mb-3">
          <Nav.Item key="interviews-tab">
            <Nav.Link eventKey="interviews">Interviews</Nav.Link>
          </Nav.Item>
          <Nav.Item key="videos-tab">
            <Nav.Link eventKey="videos">Videos</Nav.Link>
          </Nav.Item>
          <Nav.Item key="titles-tab">
            <Nav.Link eventKey="titles">Titles</Nav.Link>
          </Nav.Item>
          <Nav.Item key="monographs-tab">
            <Nav.Link eventKey="monographs">Monographs</Nav.Link>
          </Nav.Item>
          <Nav.Item key="articles-tab">
            <Nav.Link eventKey="articles">Articles</Nav.Link>
          </Nav.Item>
          <Nav.Item key="dissertations-tab">
            <Nav.Link eventKey="dissertations">Dissertations</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="interviews" key="interviews-pane">
            <h3>Interviews</h3>
            {renderForm('interviews')}
            {renderTable(interviews, 'interviews')}
          </Tab.Pane>
          <Tab.Pane eventKey="videos" key="videos-pane">
            <h3>Videos</h3>
            {renderForm('videos')}
            {renderTable(videos, 'videos')}
          </Tab.Pane>
          <Tab.Pane eventKey="titles" key="titles-pane">
            <h3>Titles</h3>
            {renderForm('titles')}
            {renderTable(titles, 'titles')}
          </Tab.Pane>
          <Tab.Pane eventKey="monographs" key="monographs-pane">
            <h3>Monographs</h3>
            <AdminMonographs />
          </Tab.Pane>
          <Tab.Pane eventKey="articles" key="articles-pane">
            <h3>Articles</h3>
            <AdminArticles />
          </Tab.Pane>
          <Tab.Pane eventKey="dissertations" key="dissertations-pane">
            <h3>Dissertations</h3>
            <AdminDissertations />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default Admin; 