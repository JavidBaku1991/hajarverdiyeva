import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const AdminMonographs = () => {
  const { t } = useTranslation();
  const [monographs, setMonographs] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    file: null,
    image: null
  });
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selected:', {
        name: file.name,
        type: file.type,
        size: file.size
      });

      if (e.target.name === 'file') {
        if (file.type === 'application/pdf') {
          setFormData(prev => ({ ...prev, file }));
          setError(null);
        } else {
          setError('Please select a PDF file');
          e.target.value = ''; // Clear the input
        }
      } else if (e.target.name === 'image') {
        if (file.type.startsWith('image/')) {
          setFormData(prev => ({ ...prev, image: file }));
          setError(null);
        } else {
          setError('Please select an image file');
          e.target.value = ''; // Clear the input
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate files before submission
    if (!formData.file || !formData.image) {
      setError('Both PDF file and image are required');
      return;
    }

    try {
      console.log('Form data before submission:', {
        title: formData.title,
        file: formData.file?.name,
        image: formData.image?.name
      });

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('file', formData.file);
      formDataToSend.append('image', formData.image);

      // Log the FormData contents
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
      }

      const response = await axios.post('http://localhost:5000/api/monographs', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMonographs([...monographs, response.data]);
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
      console.error('Error details:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Error saving monograph');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this monograph?')) {
      try {
        await axios.delete(`http://localhost:5000/api/monographs/${id}`);
        setMonographs(monographs.filter(monograph => monograph._id !== id));
      } catch (error) {
        setError('Error deleting monograph');
        console.error('Error:', error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Monograph</h2>
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
        </Form.Group>
        <Button type="submit" variant="primary">
          Add Monograph
        </Button>
      </Form>

      <h3 className="mt-4">Monographs List</h3>
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
          {monographs.map((monograph) => (
            <tr key={monograph._id}>
              <td>{monograph.title}</td>
              <td>
                <img 
                  src={`http://localhost:5000${monograph.image}`} 
                  alt={monograph.title}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
              <td>
                <a href={`http://localhost:5000${monograph.file}`} target="_blank" rel="noopener noreferrer">
                  View PDF
                </a>
              </td>
              <td>
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