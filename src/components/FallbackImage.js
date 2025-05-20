import React from 'react';

const FallbackImage = ({ width = 100, height = 100 }) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontSize: '12px',
        textAlign: 'center',
        padding: '5px',
        border: '1px solid #ddd'
      }}
    >
      No Image Available
    </div>
  );
};

export default FallbackImage; 