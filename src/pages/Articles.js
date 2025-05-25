import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, Box, Pagination } from '@mui/material';
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
  const [page, setPage] = useState(1);
  const articlesPerPage = 6;

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
        // Check for required fields based on article type
        const hasRequiredFields = 
          article.title && // Title is required for all articles
          (
            // Type 1: Articles with PDF and image files (new format)
            (article.pdfFile && article.imageFile) ||
            // Type 2: Articles with URL and image
            (article.url && article.image) ||
            // Type 3: Articles with file and image (old format)
            (article.file && article.image)
          );

        if (!hasRequiredFields) {
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

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const indexOfLastArticle = page * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <Container className="dissertations-container">
      <Typography variant="h4" component="h1" gutterBottom className="articles-title">
        Articles
      </Typography>
      {loading ? (
        <Typography variant="h6" align="center">Loading articles...</Typography>
      ) : error ? (
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      ) : articles.length === 0 ? (
        <Typography variant="h6" align="center">No articles available</Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {currentArticles.map((article) => (
              <Grid item xs={12} sm={6} md={4} key={article._id}>
                <Card className="article-card dissertation-card">
                  {!failedImages.has(article._id) && (article.imageFile || article.image) ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={getImageUrl(article.imageFile || article.image)}
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
                          href={article.url || getPdfUrl(article.pdfFile || article.file)}
                          download={!article.url}
                          onClick={(e) => {
                            if (!article.url && !article.pdfFile && !article.file) {
                              e.preventDefault();
                              console.error('No PDF file or URL available');
                            }
                          }}
                        >
                          {article.url ? t('view') : t('download')}
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4} mb={4}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary"
                size="large"
                showFirstButton 
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{selectedArticle?.title}</DialogTitle>
        <DialogContent>
          {selectedArticle && (selectedArticle.pdfFile || selectedArticle.file || selectedArticle.url) && (
            selectedArticle.url ? (
              <iframe
                src={selectedArticle.url}
                title={selectedArticle.title}
                width="100%"
                height="600px"
                onError={(e) => {
                  console.error('Error loading URL:', selectedArticle.url);
                  e.target.parentNode.innerHTML = '<div style="padding: 20px; text-align: center;">Error loading content. Please try opening in a new tab.</div>';
                }}
              />
            ) : (
              <iframe
                src={getPdfUrl(selectedArticle.pdfFile || selectedArticle.file)}
                title={selectedArticle.title}
                width="100%"
                height="600px"
                onError={(e) => {
                  console.error('Error loading PDF:', selectedArticle.pdfFile || selectedArticle.file);
                  e.target.parentNode.innerHTML = '<div style="padding: 20px; text-align: center;">Error loading PDF. Please try downloading instead.</div>';
                }}
              />
            )
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Articles; 