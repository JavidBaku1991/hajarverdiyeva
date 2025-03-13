import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, Box } from '@mui/material';

// Import PDF files
import monography1 from '../pdf/title1.pdf';
import monography1Image from '../photos/titles/home1.jpg';
import monography2 from '../pdf/title2.pdf';
import monography3 from '../pdf/title3.pdf';

const monographies = [
  { title: 'Monography 1', url: monography1, image: monography1Image, description: 'Description 1' },
  { title: 'Monography 2', url: monography2, image: monography1Image, description: 'Description 1' },
  { title: 'Monography 3', url: monography3, image: monography1Image, description: 'Description 1' },
  { title: 'Monography 4', url: monography1, image: monography1Image, description: 'Description 1' },
  { title: 'Monography 5', url: monography2, image: monography1Image, description: 'Description 1' },
  { title: 'Monography 6', url: monography3, image: monography1Image, description: 'Description 1' },
];

const Monographies = () => {
  const [open, setOpen] = useState(false);
  const [selectedMonography, setSelectedMonography] = useState(null);

  const handleClickOpen = (monography) => {
    setSelectedMonography(monography);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMonography(null);
  };

  return (
    <Container className="monographies-container">
      <Typography variant="h4" component="h1" gutterBottom className="monographies-title">
        Monographies
      </Typography>
      <Grid container spacing={4}>
        {monographies.map((monography, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="monography-card">
              <CardMedia
                component="img"
                height="200"
                image={monography.image}
                alt={monography.title}
              />
              <CardContent>
                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="h5" component="div">
                      {monography.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {monography.description}
                    </Typography>
                  </Box>
                  <Box>
                    <Button variant="contained" color="primary" onClick={() => handleClickOpen(monography)}>
                      Open
                    </Button>
                    <Button variant="contained" color="secondary" href={monography.url} download>
                      Download
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedMonography?.title}</DialogTitle>
        <DialogContent>
          {selectedMonography && (
            <iframe
              src={selectedMonography.url}
              title={selectedMonography.title}
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