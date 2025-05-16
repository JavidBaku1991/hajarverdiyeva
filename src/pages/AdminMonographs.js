import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AdminMonographs = () => {
  const { t } = useTranslation();
  const [monographs, setMonographs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: '',
    image: '',
    language: 'az'
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMonographs();
  }, []);

  const fetchMonographs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/monographs');
      setMonographs(response.data);
    } catch (error) {
      setError('Error fetching monographs');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/monographs/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/monographs', formData);
      }
      setFormData({
        title: '',
        description: '',
        file: '',
        image: '',
        language: 'az'
      });
      setEditingId(null);
      fetchMonographs();
    } catch (error) {
      setError('Error saving monograph');
      console.error('Error:', error);
    }
  };

  const handleEdit = (monograph) => {
    setFormData({
      title: monograph.title,
      description: monograph.description,
      file: monograph.file,
      image: monograph.image,
      language: monograph.language
    });
    setEditingId(monograph._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this monograph?')) {
      try {
        await axios.delete(`http://localhost:5000/api/monographs/${id}`);
        fetchMonographs();
      } catch (error) {
        setError('Error deleting monograph');
        console.error('Error:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>{editingId ? 'Edit Monograph' : 'Add New Monograph'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
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
          {editingId ? 'Update' : 'Add'} Monograph
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

      <h3 className="mt-4">Monographs List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {monographs.map((monograph) => (
            <tr key={monograph._id}>
              <td>{monograph.title}</td>
              <td>{monograph.language}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(monograph)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(monograph._id)}
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

export default AdminMonographs; 