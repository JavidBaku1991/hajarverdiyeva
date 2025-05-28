import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, Box } from '@mui/material';
import '../css/dissertations.css';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Dissertations = () => {
  const { t } = useTranslation();
  const [dissertations, setDissertations] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedDissertation, setSelectedDissertation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDissertations();
  }, []);

  const fetchDissertations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dissertations');
      setDissertations(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching dissertations');
      setLoading(false);
      console.error('Error:', error);
    }
  };

  const handleClickOpen = (dissertation) => {
    setSelectedDissertation(dissertation);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDissertation(null);
  };

  return (
    <Container className="dissertations-container">
      <Typography variant="h4" component="h1" gutterBottom className="dissertations-title">
        Dissertations
      </Typography>

      {loading ? (
        <Typography variant="h6" align="center">Loading dissertations...</Typography>
      ) : error ? (
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      ) : dissertations.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center" className="no-dissertations-message mb-5">
          There are no dissertations available at the moment.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {dissertations.map((dissertation) => (
            <Grid item xs={12} sm={6} md={4} key={dissertation._id}>
              <Card className="dissertation-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000${dissertation.image}`}
                  alt={dissertation.title}
                />
                <CardContent>
                  <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h5" component="div">
                        {dissertation.title}
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2}>
                      <Button variant="contained" color="primary" onClick={() => handleClickOpen(dissertation)}>
                        {t('open')}
                      </Button>
                      <Button variant="contained" color="secondary" href={`http://localhost:5000${dissertation.file}`} download>
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
        <DialogTitle>{selectedDissertation?.title}</DialogTitle>
        <DialogContent>
          {selectedDissertation && (
            <iframe
              src={`http://localhost:5000${selectedDissertation.file}`}
              title={selectedDissertation.title}
              width="100%"
              height="600px"
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Dissertations;