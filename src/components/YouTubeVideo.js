import React from 'react';
import PropTypes from 'prop-types';
import '../css/youtubeVideo.css';

const YouTubeVideo = ({ videoId, title, description }) => {
  console.log('YouTubeVideo component received props:', { videoId, title, description });

  if (!videoId) {
    console.error('No videoId provided to YouTubeVideo component');
    return null;
  }

  // Clean up the videoId to ensure it's valid
  const cleanVideoId = videoId.trim();
  if (!cleanVideoId) {
    console.error('Empty videoId provided to YouTubeVideo component');
    return null;
  }

  console.log('Rendering YouTube video with ID:', cleanVideoId);

  return (
    <div className="youtube-video-container">
      <div className="youtube-video">
        <iframe
          src={`https://www.youtube.com/embed/${cleanVideoId}?rel=0&modestbranding=1`}
          title={title || 'YouTube video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </div>
      <div className="youtube-video-info">
        {title && (
          <div className="youtube-video-title">
            <h4>{title}</h4>
          </div>
        )}
        {description && (
          <div className="youtube-video-description">
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default YouTubeVideo;