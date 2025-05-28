const config = {
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://hajarverdiyeva-backend.onrender.com/api'  // Render URL
    : 'http://localhost:5000/api'
};

export default config; 