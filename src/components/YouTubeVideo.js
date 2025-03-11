import React from 'react';
import PropTypes from 'prop-types';


const YouTubeVideo = ({ videoId, title }) => {
  return (
    <div className="youtube-video mb-5">
      
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      ></iframe>
      <p className='dot'></p>
      <h4 className="video-title">{title}</h4>
    </div>
  );
};

YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default YouTubeVideo;