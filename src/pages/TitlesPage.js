import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Dialog, DialogContent, DialogTitle, Box } from '@mui/material';

// Import PDF files
import amea from '../pdf/titles/amea.pdf';
import bitva from '../pdf/titles/bitva.pdf';
import ermenisorunu from '../pdf/titles/ermenisorunu.pdf';
import gerceginmatrisi from '../pdf/titles/gerceginmatrisi.pdf';
import irevan from '../pdf/titles/irevan.pdf';
import namatrise from '../pdf/titles/namatrise.pdf';
import onthelvel from '../pdf/titles/onthelevel.pdf';
import soceco from '../pdf/titles/soceco.pdf';
import tarheq from '../pdf/titles/tarheq.pdf';
import terihi from '../pdf/titles/tarihi.pdf';
import umumitarix from '../pdf/titles/umumitarix.pdf';
import vliyaniye from '../pdf/titles/vliyaniye.pdf';

import img from '../photos/footer.jpg'; // Replace with the actual image path

const titles = [
  { title: 'TARİXİ REALLIĞIN İZİ İLƏ: ERMƏNİ ƏFSANƏLƏRİNİN ACI HƏQİQƏTLƏRİ ', url: amea },
  { title: ' БИТВА ЗА КАВКАЗ: ЛАД АЗЕРБАЙДЖАНСКОГО НАРОДАВ ДЕЛО ПОБЕДЫ', url: bitva },
  { title: '“Ermeni Sorunu”na Tarihsel Yaklaşım', url: ermenisorunu },
  { title: 'GERÇEĞIN MATRISI ÜZERINE TARIH: ERMENI GREGORYEN KILISESI MONOFIZITTIR VE ORTODOKS ', url: gerceginmatrisi },
  { title: 'İrevan (Revan)  Vilayetindeki Demografik Değişiklikler Üzerine ', url: irevan },
  { title: 'НА МАТРИЦЕ ИСТИНЫ: ОБ ИСТОРИИ ГАРАБАГА', url: namatrise },
  { title: 'ON THE LEVEL OF HISTORICAL TRUTHS:THE “ARMENIAN QUESTION” AFTER THE POTSDAM CONFERENCE', url: onthelvel },
  { title: 'СОЦИАЛЬНО-ЭКОНОМИЧЕСКАЯ СИТУАЦИЯ В НЕМЕЦКИХ КОЛОНИЯХ  В 20-30-Х ГОДАХ АЗЕРБАЙДЖАНСКОЙ ССР', url: soceco },
  { title: 'Tarixi həqiqətlərin izi ilə...Mənbələr, dəlillər, sübutlar', url: tarheq },
  { title: 'Tarihi gerçekler veya Birinci Dünya Savaşı yıllarında müslüman mülteciliğin sorunu', url: terihi },
  { title: ' TARİXİ HƏQİQƏTLƏRİN İZİ İLƏ... MƏNBƏLƏR, DƏLİLLƏR, SÜBUTLAR', url: umumitarix },
  { title: 'Влияние демографических процессов  на обогащение мультикультурной  среды Азербайджана на рубеже  XIX–XX вв.', url: vliyaniye },
];

const TitlesPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);

  const handleClickOpen = (title) => {
    setSelectedTitle(title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTitle(null);
  };

  return (
    <Container className="titles-container">
      <Typography variant="h4" component="h1" gutterBottom className="titles-title text-center">
        Titles
      </Typography>
      <Grid container spacing={4}>
        {titles.map((title, index) => (
          <Grid item xs={4} key={index}>
            <Card className="title-card"
                sx={{
                    backgroundImage: `url(${img})`, // Use the imported image dynamically
                    backgroundSize: 'cover', // Ensure the image covers the card
                    backgroundPosition: 'center', // Center the image
                    borderRadius: '15px', // Rounded corners
                    padding: '1rem',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
                    height: '250px', // Set a fixed height for the card
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
            >
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                  <Box display="flex" flexDirection="row" gap={2}>
                    <Button variant="contained" color="primary" onClick={() => handleClickOpen(title)}>
                      Open
                    </Button>
                    <Button variant="contained" color="secondary" href={title.url} download>
                      Download
                    </Button>
                  </Box>
                   <Typography
                    variant="h6"
                    component="div"
                    className="title-name"
                    align="center"
                  >
                    {title.title}
                  </Typography>
                 
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedTitle?.title}</DialogTitle>
        <DialogContent>
          {selectedTitle && (
            <iframe
              src={selectedTitle.url}
              title={selectedTitle.title}
              width="100%"
              height="600px"
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default TitlesPage;