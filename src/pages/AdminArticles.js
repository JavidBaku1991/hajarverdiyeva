import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AdminArticles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    file: null,
    image: null
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      console.log('Fetching articles...');
      const response = await axios.get('http://localhost:5000/api/articles');
      console.log('Received articles:', response.data);
      
      if (!Array.isArray(response.data)) {
        console.error('Received non-array data:', response.data);
        setError('Invalid data format received from server');
        return;
      }

      // Sort articles by createdAt date
      const sortedArticles = response.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      console.log('Sorted articles:', sortedArticles);
      setArticles(sortedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Error fetching articles');
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
      console.log('Submitting article with data:', {
        title: formData.title,
        file: formData.file?.name,
        image: formData.image?.name
      });

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('file', formData.file);
      formDataToSend.append('image', formData.image);

      const response = await axios.post('http://localhost:5000/api/articles', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Article saved successfully:', response.data);
      
      // Fetch all articles again to ensure we have the latest data
      await fetchArticles();
      
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
      console.error('Error saving article:', error);
      setError(error.response?.data?.message || 'Error saving article');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        console.log('Deleting article:', id);
        await axios.delete(`http://localhost:5000/api/articles/${id}`);
        console.log('Article deleted successfully');
        
        // Fetch all articles again to ensure we have the latest data
        await fetchArticles();
      } catch (error) {
        console.error('Error deleting article:', error);
        setError('Error deleting article');
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Article</h2>
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
          {loading ? 'Uploading...' : 'Add Article'}
        </Button>
      </Form>

      <h3 className="mt-4">Articles List</h3>
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
          {articles.map((article) => (
            <tr key={article._id}>
              <td>{article.title}</td>
              <td>
                <img 
                  src={`http://localhost:5000${article.image}`} 
                  alt={article.title}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
              <td>
                <a href={`http://localhost:5000${article.file}`} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              </td>
              <td>
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