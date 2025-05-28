import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AdminDissertations = () => {
  const { t } = useTranslation();
  const [dissertations, setDissertations] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    file: null,
    image: null
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDissertations();
  }, []);

  const fetchDissertations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dissertations');
      setDissertations(response.data);
    } catch (error) {
      setError('Error fetching dissertations');
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (e.target.name === 'file' && file.type === 'application/pdf') {
        setFormData({ ...formData, file });
        setError(null);
      } else if (e.target.name === 'image' && file.type.startsWith('image/')) {
        setFormData({ ...formData, image: file });
        setError(null);
      } else {
        setError(e.target.name === 'file' ? 'Please select a PDF file' : 'Please select an image file');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('file', formData.file);
      formDataToSend.append('image', formData.image);

      const response = await axios.post('http://localhost:5000/api/dissertations', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setDissertations([...dissertations, response.data]);
      setFormData({
        title: '',
        file: null,
        image: null
      });
      
      // Reset file inputs
      document.querySelector('input[name="file"]').value = '';
      document.querySelector('input[name="image"]').value = '';
      
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.message || 'Error saving dissertation');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this dissertation?')) {
      try {
        await axios.delete(`http://localhost:5000/api/dissertations/${id}`);
        setDissertations(dissertations.filter(dissertation => dissertation._id !== id));
      } catch (error) {
        setError('Error deleting dissertation');
        console.error('Error:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Dissertation</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>PDF File</Form.Label>
          <Form.Control
            type="file"
            name="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
          <Form.Text className="text-muted">
            Maximum file size: 10MB
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <Form.Text className="text-muted">
            Maximum file size: 10MB
          </Form.Text>
        </Form.Group>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Dissertation'}
        </Button>
      </Form>

      <h3 className="mt-4">Dissertations List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Cover</th>
            <th>File</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dissertations.map((dissertation) => (
            <tr key={dissertation._id}>
              <td>{dissertation.title}</td>
              <td>
                <img 
                  src={`http://localhost:5000${dissertation.image}`} 
                  alt={dissertation.title}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
              <td>
                <a href={`http://localhost:5000${dissertation.file}`} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(dissertation._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDissertations; 