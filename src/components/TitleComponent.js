import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/titleComponent.css';

const TitleComponent = ({ titles }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    centerPadding: '40px',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: false, // Disable centering at this size
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: false, // Disable centering at this size
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false, // Disable centering at this size
        },
      },
    ],
    
  };

  return (
<div key={window.innerWidth}>
  <Slider {...settings}>
    {titles.map((title, index) => (
      <div key={index} className="title-item">
        <div className="title-content">
          <img src={title.image} alt={title.name} className="title-image" />
          <div className="title-text">
            <h4>
              <a href={title.url} download className="title-link">
                {title.name}
              </a>
            </h4>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>

  );
};

export default TitleComponent;