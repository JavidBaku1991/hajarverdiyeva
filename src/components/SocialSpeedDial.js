import React from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { FaFacebook, FaTwitter, FaLinkedin, FaGlobe } from 'react-icons/fa';

const SocialSpeedDial = () => {
  const actions = [
    { icon: <FaFacebook />, name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100008438296052' },
    { icon: <FaTwitter />, name: 'Twitter', url: 'https://twitter.com' },
    { icon: <FaLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com' }  ];

  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <SpeedDial
      ariaLabel="Social Links"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<FaGlobe />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleClick(action.url)}
        />
      ))}
    </SpeedDial>
  );
};

export default SocialSpeedDial;
