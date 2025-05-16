import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AdminArticles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
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
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/articles');
      setArticles(response.data);
    } catch (error) {
      setError('Error fetching articles');
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/articles/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/articles', formData);
      }
      setFormData({
        title: '',
        description: '',
        file: '',
        image: '',
        language: 'az'
      });
      setEditingId(null);
      fetchArticles();
    } catch (error) {
      setError('Error saving article');
      console.error('Error:', error);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      description: article.description,
      file: article.file,
      image: article.image,
      language: article.language
    });
    setEditingId(article._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axios.delete(`http://localhost:5000/api/articles/${id}`);
        fetchArticles();
      } catch (error) {
        setError('Error deleting article');
        console.error('Error:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>{editingId ? 'Edit Article' : 'Add New Article'}</h2>
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
          {editingId ? 'Update' : 'Add'} Article
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

      <h3 className="mt-4">Articles List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Language</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article._id}>
              <td>{article.title}</td>
              <td>{article.language}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(article)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(article._id)}
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

export default AdminArticles; 