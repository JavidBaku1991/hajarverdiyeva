import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import FallbackImage from '../components/FallbackImage';
import '../css/dissertations.css';

const Articles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [failedImages, setFailedImages] = useState(new Set());

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

      // Validate each article has required fields
      const validArticles = response.data.filter(article => {
        if (!article.title || !article.file || !article.image) {
          console.error('Invalid article data:', article);
          return false;
        }
        return true;
      });

      console.log('Valid articles:', validArticles);
      
      // Sort articles by createdAt date
      const sortedArticles = validArticles.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      
      console.log('Sorted articles:', sortedArticles);
      setArticles(sortedArticles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error.response?.data?.message || 'Error fetching articles');
      setLoading(false);
    }
  };

  const handleClickOpen = (article) => {
    console.log('Opening article:', article);
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5000${imagePath}`;
  };

  const getPdfUrl = (pdfPath) => {
    if (!pdfPath) return null;
    if (pdfPath.startsWith('http')) return pdfPath;
    return `http://localhost:5000${pdfPath}`;
  };

  const handleImageError = (articleId) => {
    setFailedImages(prev => new Set([...prev, articleId]));
  };

  return (
    <Container className="dissertations-container">
      <Typography variant="h4" component="h1" gutterBottom className="articles-title title text-center">
        Articles
      </Typography>
      {loading ? (
        <Typography variant="h6" align="center">Loading articles...</Typography>
      ) : error ? (
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      ) : articles.length === 0 ? (
        <Typography variant="h6" align="center">No articles available</Typography>
      ) : (
        <Grid container spacing={4}>
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article._id}>
              <Card className="article-card dissertation-card">
                {!failedImages.has(article._id) && article.image ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={getImageUrl(article.image)}
                    alt={article.title}
                    onError={() => handleImageError(article._id)}
                  />
                ) : (
                  <FallbackImage width={200} height={200} />
                )}
                <CardContent>
                  <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6" component="div" className="article-title" align="center">
                        {article.title}
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2} className="article-buttons">
                      <Button variant="contained" color="primary" onClick={() => handleClickOpen(article)}>
                        {t('open')}
                      </Button>
                      <Button 
                        variant="contained" 
                        color="secondary" 
                        href={getPdfUrl(article.file)}
                        download
                        onClick={(e) => {
                          if (!article.file) {
                            e.preventDefault();
                            console.error('No PDF file available');
                          }
                        }}
                      >
                        {t('download')}
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedArticle?.title}</DialogTitle>
        <DialogContent>
          {selectedArticle && selectedArticle.file && (
            <iframe
              src={getPdfUrl(selectedArticle.file)}
              title={selectedArticle.title}
              width="100%"
              height="600px"
              onError={(e) => {
                console.error('Error loading PDF:', selectedArticle.file);
                e.target.parentNode.innerHTML = '<div style="padding: 20px; text-align: center;">Error loading PDF. Please try downloading instead.</div>';
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Articles; 