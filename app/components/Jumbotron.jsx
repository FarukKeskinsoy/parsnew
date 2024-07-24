import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './jumbotron.scss'; // Custom styles for slick-carousel
import { IconButton } from '@mui/material';
import { ArrowDown } from 'lucide-react';

const Jumbotron = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,

  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  

  return (
  
    
    <div className="jumbotron w-full">
      <p className="static-elements mt-4 text-sm top-1 left-1 lg:left-10 lg:top-10  md:text-2xl text-white">Pars Analitik Kimya ve Endüstriyel Cihazlar</p>

      <Slider {...settings}>
        <div className="jumbotron-slide">
          <img src="/kapak.jpg" alt="Slide 1" className="jumbotron-slide-pic" />
        </div>
        <div className="jumbotron-slide">
          <img src="/gidaw.png" alt="Slide 2" className="jumbotron-slide-pic" />
        </div>
        <div className="jumbotron-slide">
          <img src="/makinew.png" alt="Slide 3" className="jumbotron-slide-pic" />
        </div>
      </Slider>

      <IconButton
        onClick={scrollToNextSection}
        className="scroll-button"
      >
        <ArrowDown/>

      </IconButton>
    </div>

  );
};

export default Jumbotron;
