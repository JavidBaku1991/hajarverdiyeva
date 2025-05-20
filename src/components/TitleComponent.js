import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/titleComponent.css';

const TitleComponent = ({ titles }) => {
  const settings = {
    dots: true,
    infinite: titles.length > 3,
    speed: 500,
    slidesToShow: Math.min(3, titles.length),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, titles.length),
          slidesToScroll: 1,
          infinite: titles.length > 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: titles.length > 1,
        }
      }
    ]
  };

  return (
    <div className="title-slider-container">
      <Slider {...settings}>
        {titles.map((title) => (
          <div key={title._id} className="title-item">
            <div className="title-content">
              <img src={title.image} alt={title.title} className="title-image" />
              <div className="title-text">
                <h4>
                  <a href={title.url} target="_blank" rel="noopener noreferrer" className="title-link">
                    {title.title}
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