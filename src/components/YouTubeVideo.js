import React from 'react';
import PropTypes from 'prop-types';
// import '../css/youtubeVideo.css';

const YouTubeVideo = ({ videoId, title }) => {
  return (
    <div className="youtube-video-container">
      <div className="youtube-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="youtube-video-title">
        <h4>{title}</h4>
      </div>
    </div>
  );
};

YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default YouTubeVideo;