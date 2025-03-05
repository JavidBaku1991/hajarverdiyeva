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
    centerPadding: '20px',
  };

  return (
    <div className="title-slider">
      <Slider {...settings}>
        {titles.map((title, index) => (
          <div key={index} className="title-item" >
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