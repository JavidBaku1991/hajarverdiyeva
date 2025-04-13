import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NotFound = () => {

      const { t } = useTranslation();
    

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#343a40' }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: '1rem', color: '#6c757d' }}>
        {t('not-found')}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '1rem', color: '#6c757d' }}>
        {t('not-found-description')}
      </Typography>
      <Typography variant="h1" sx={{ fontSize: '4rem', marginBottom: '1rem', color: '#6c757d' }}>
        😢
      </Typography>
      <Button
        component={Link}
        to="/"
        variant='outlined'
        color="primary"
        sx={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
      >
       {t('go-home')}
      </Button>
    </Box>
  );
};

export default NotFound;
