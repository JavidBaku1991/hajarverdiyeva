import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const Monographies = () => {
  const { t } = useTranslation();
  const [monographs, setMonographs] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedMonograph, setSelectedMonograph] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMonographs();
  }, []);

  const fetchMonographs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/monographs');
      setMonographs(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching monographs');
      setLoading(false);
      console.error('Error:', error);
    }
  };

  const handleClickOpen = (monograph) => {
    setSelectedMonograph(monograph);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMonograph(null);
  };

  return (
    <Container className="dissertations-container">
      <Typography variant="h4" component="h1" gutterBottom className="monographies-title title text-center">
        Monographies
      </Typography>
      {loading ? (
        <Typography variant="h6" align="center">Loading monographs...</Typography>
      ) : error ? (
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      ) : monographs.length === 0 ? (
        <Typography variant="h6" align="center">No monographs available</Typography>
      ) : (
        <Grid container spacing={4}>
          {monographs.map((monograph) => (
            <Grid item xs={12} sm={6} md={4} key={monograph._id}>
              <Card className="monography-card dissertation-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:5000${monograph.image}`}
                  alt={monograph.title}
                />
                <CardContent>
                  <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h6" component="div" className="monography-title" align="center">
                        {monograph.title}
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2} className="monography-buttons">
                      <Button variant="contained" color="primary" onClick={() => handleClickOpen(monograph)}>
                        {t('open')}
                      </Button>
                      <Button variant="contained" color="secondary" href={`http://localhost:5000${monograph.file}`} download>
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

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedMonograph?.title}</DialogTitle>
        <DialogContent>
          {selectedMonograph && (
            <iframe
              src={`http://localhost:5000${selectedMonograph.file}`}
              title={selectedMonograph.title}
              width="100%"
              height="600px"
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Monographies;