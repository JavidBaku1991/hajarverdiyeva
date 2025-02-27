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
  };

  return (
    <div className="title-slider">
      <Slider {...settings}>
        {titles.map((title, index) => (
          <div key={index} className="title-item">
            <img src={title.imageUrl} alt={title.name} className="title-image" />
            <h4>{title.name}</h4>
            <a href={title.url} download className="download-link">
              Open
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TitleComponent;