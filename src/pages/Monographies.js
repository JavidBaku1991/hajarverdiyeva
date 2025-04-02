import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Dialog, DialogContent, DialogTitle, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import CingizPdf from '../pdf/monoqrafiyalar/cingiz.pdf';
import DokavkazskayaPdf from '../pdf/monoqrafiyalar/dok.pdf';
import NemtsiPdf from '../pdf/monoqrafiyalar/nem.pdf';
import PeresPdf from '../pdf/monoqrafiyalar/peres.pdf';
import RodosPdf from '../pdf/monoqrafiyalar/rodos.pdf';

import Cingiz from '../photos/books/cingiz.jpg';
import Dokavkazskaya from '../photos/books/dok.jpg';
import Nemtsi from '../photos/books/nem.png';
import Peres from '../photos/books/peres.jpg';
import Rodos from '../photos/books/rodos.jpg';

const monographies = [
  { title: "Немцы в Азербайджане:Абдуллаев, Сеидов, Вердиева Неизвестные страницы", url: CingizPdf, image: Cingiz, description: 'Description 1' },
  { title: 'Докавказская история армян ', url: DokavkazskayaPdf, image: Dokavkazskaya, description: 'Description 1' },
  { title: 'Немцы  в Северном  Азербайджане ', url: NemtsiPdf, image: Nemtsi, description: 'Description 1' },
  { title: 'ПЕРЕСЕЛЕНЧЕСКАЯ ПОЛИТИКА  РОССИЙСКОЙ ИМПЕРИИ  В СЕВЕРНОМ АЗЕРБАЙДЖАНЕ  (XIX - начале XX вв.) ', url: PeresPdf, image: Peres, description: 'Description 1' },
  { title: '«РОДОСЛОВНАЯ» АРМЯН И ИХ МИГРАЦИЯ НА КАВКАЗ С БАЛКАН ', url: RodosPdf, image: Rodos, description: 'Description 1' },
];

const Monographies = () => {
      const { t } = useTranslation();
  
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
    <Container className="dissertations-container">
      <Typography variant="h4" component="h1" gutterBottom className="monographies-title title text-center">
        Monographies
      </Typography>
      <Grid container spacing={4}>
        {monographies.map((monography, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card className="monography-card dissertation-card ">
              <CardMedia
                component="img"
                height="200"
                image={monography.image}
                alt={monography.title}
              />
          <CardContent>
  <Box display="flex" flexDirection="row" gap={2} className="monography-buttons d-flex justify-content-center align-items-center">
    <Button variant="contained" color="primary" onClick={() => handleClickOpen(monography)}>
      {t('open')}
    </Button>
    <Button variant="contained" color="secondary" href={monography.url} download>
      {t('download')}
    </Button>
  </Box>
  <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
    <Box>
      <Typography
        variant="h6"
        component="div"
        className="monography-title"
        align="center" // Centers the text
      >
        {monography.title}
      </Typography>
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