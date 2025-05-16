import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Tab, Tabs } from 'react-bootstrap';
import axios from 'axios';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('interviews');

  // Form states
  const [interviewForm, setInterviewForm] = useState({ title: '', image: '', url: '', description: '', language: 'az' });
  const [videoForm, setVideoForm] = useState({ videoId: '', title: '', description: '', language: 'az' });
  const [titleForm, setTitleForm] = useState({ name: '', url: '', image: '', language: 'az' });

  // Data states
  const [interviews, setInterviews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [titles, setTitles] = useState([]);

  const [videoError, setVideoError] = useState('');

  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const [interviewsRes, videosRes, titlesRes] = await Promise.all([
        axios.get(`${API_URL}/interviews`),
        axios.get(`${API_URL}/videos`),
        axios.get(`${API_URL}/titles`)
      ]);

      setInterviews(interviewsRes.data);
      setVideos(videosRes.data);
      setTitles(titlesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      setError('');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      switch (type) {
        case 'interview':
          await axios.post(`${API_URL}/interviews`, interviewForm, config);
          setInterviewForm({ title: '', image: '', url: '', description: '', language: 'az' });
          break;
        case 'video':
          // Validate video ID
          if (!videoForm.videoId) {
            setVideoError('Video ID is required');
            return;
          }
          // Remove any URL parts if user pasted full YouTube URL
          const videoId = videoForm.videoId.includes('youtube.com') 
            ? videoForm.videoId.split('v=')[1]?.split('&')[0]
            : videoForm.videoId;
          
          if (!videoId) {
            setVideoError('Invalid video ID. Please enter a valid YouTube video ID');
            return;
          }

          await axios.post(`${API_URL}/videos`, { ...videoForm, videoId }, config);
          setVideoForm({ videoId: '', title: '', description: '', language: 'az' });
          setVideoError('');
          break;
        case 'title':
          await axios.post(`${API_URL}/titles`, titleForm, config);
          setTitleForm({ name: '', url: '', image: '', language: 'az' });
          break;
      }

      fetchData();
    } catch (error) {
      console.error('Error submitting form:', error);
      if (type === 'video') {
        setVideoError(error.response?.data?.message || 'Error adding video');
      }
    }
  };

  if (!token) {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Admin Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2>Admin Dashboard</h2>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Tab eventKey="interviews" title="Interviews">
          <Card>
            <Card.Body>
              <h3>Add New Interview</h3>
              <Form onSubmit={(e) => handleSubmit(e, 'interview')}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={interviewForm.title}
                    onChange={(e) => setInterviewForm({ ...interviewForm, title: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={interviewForm.image}
                    onChange={(e) => setInterviewForm({ ...interviewForm, image: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={interviewForm.url}
                    onChange={(e) => setInterviewForm({ ...interviewForm, url: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Select
                    value={interviewForm.language}
                    onChange={(e) => setInterviewForm({ ...interviewForm, language: e.target.value })}
                  >
                    <option value="az">Azerbaijani</option>
                    <option value="en">English</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">Add Interview</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="videos" title="Videos">
          <Card>
            <Card.Body>
              <h3>Add New Video</h3>
              <Form onSubmit={(e) => handleSubmit(e, 'video')}>
                <Form.Group className="mb-3">
                  <Form.Label>Video ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={videoForm.videoId}
                    onChange={(e) => setVideoForm({ ...videoForm, videoId: e.target.value })}
                    required
                  />
                  {videoError && <div className="text-danger">{videoError}</div>}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={videoForm.title}
                    onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Select
                    value={videoForm.language}
                    onChange={(e) => setVideoForm({ ...videoForm, language: e.target.value })}
                  >
                    <option value="az">Azerbaijani</option>
                    <option value="en">English</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">Add Video</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="titles" title="Titles">
          <Card>
            <Card.Body>
              <h3>Add New Title</h3>
              <Form onSubmit={(e) => handleSubmit(e, 'title')}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={titleForm.name}
                    onChange={(e) => setTitleForm({ ...titleForm, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={titleForm.url}
                    onChange={(e) => setTitleForm({ ...titleForm, url: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={titleForm.image}
                    onChange={(e) => setTitleForm({ ...titleForm, image: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Language</Form.Label>
                  <Form.Select
                    value={titleForm.language}
                    onChange={(e) => setTitleForm({ ...titleForm, language: e.target.value })}
                  >
                    <option value="az">Azerbaijani</option>
                    <option value="en">English</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">Add Title</Button>
              </Form>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Admin; 