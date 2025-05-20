import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import '../css/dissertations.css';

const Articles = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Add a refresh function
  const refreshArticles = () => {
    setLoading(true);
    fetchArticles();
  };

  // Add useEffect to refresh articles every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshArticles, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleClickOpen = (article) => {
    console.log('Opening article:', article);
    setSelectedArticle(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedArticle(null);
  };

  const handleImageError = (article, e) => {
    console.error('Error loading image:', article.image);
    e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
  };

  const handlePdfError = (article, e) => {
    console.error('Error loading PDF:', article.file);
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
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000${article.image}`}
                  alt={article.title}
                  onError={(e) => handleImageError(article, e)}
                />
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
                        href={`http://localhost:5000${article.file}`} 
                        download
                        onClick={(e) => {
                          if (!article.file) {
                            e.preventDefault();
                            console.error('No file URL available');
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
          {selectedArticle && (
            <iframe
              src={`http://localhost:5000${selectedArticle.file}`}
              title={selectedArticle.title}
              width="100%"
              height="600px"
              onError={(e) => handlePdfError(selectedArticle, e)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Articles; 