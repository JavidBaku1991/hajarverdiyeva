import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, Box } from '@mui/material';
import '../css/dissertations.css';

const dissertations = [
  // Example: { title: 'Title 1', url: title1, image: title1Image, description: 'Description 1' }
];

const Dissertations = () => {
  const [open, setOpen] = useState(false);
  const [selectedDissertation, setSelectedDissertation] = useState(null);

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

      {dissertations.length > 0 ? (
        <Grid container spacing={4}>
          {dissertations.map((dissertation, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="dissertation-card">
                <CardMedia
                  component="img"
                  height="200"
                  image={dissertation.image}
                  alt={dissertation.title}
                />
                <CardContent>
                  <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="h5" component="div">
                        {dissertation.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {dissertation.description}
                      </Typography>
                    </Box>
                    <Box display="flex" flexDirection="row" gap={2}>
                      <Button variant="contained" color="primary" onClick={() => handleClickOpen(dissertation)}>
                        Open
                      </Button>
                      <Button variant="contained" color="secondary" href={dissertation.url} download>
                        Download
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="text.secondary" align="center" className="no-dissertations-message mb-5">
          There are no dissertations available at the moment.
        </Typography>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedDissertation?.title}</DialogTitle>
        <DialogContent>
          {selectedDissertation && (
            <iframe
              src={selectedDissertation.url}
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