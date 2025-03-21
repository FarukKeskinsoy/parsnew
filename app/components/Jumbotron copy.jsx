import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './jumbotron.scss'; // Custom styles for slick-carousel

const Jumbotron = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="jumbotron w-full">
    <p className="mt-4 text-lg md:text-2xl left-handed">Pars Analitik Kimya ve Endüstriyel Cihazlar</p>

        <div className="jumbotron-slide relative">
          <div className="jumbotron-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Site</h1>
            <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold">Learn More</button>
          </div>
        </div>
      <Slider {...settings}>
        <div className="jumbotron-slide relative">
            <img src="/kapak.jpg" alt="Slide 1" className="object-cover jumbotron-slide-pic" />
                  <div className="jumbotron-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Welcome to Our Site</h1>
            <p className="mt-4 text-lg md:text-2xl">Discover amazing products and services</p>
            <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold">Learn More</button>
          </div>
        </div>
        <div className="jumbotron-slide relative">
          <img src="/cevre_sektor.jpg" alt="Slide 2" className="w-full h-full object-cover" />
          <div className="jumbotron-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Innovative Solutions</h1>
            <p className="mt-4 text-lg md:text-2xl">Tailored to your business needs</p>
            <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold">Get Started</button>
          </div>
        </div>
        <div className="jumbotron-slide relative">
          <img src="/gida_sektor_gorseli.jpg" alt="Slide 3" className="w-full h-full object-cover" />
          <div className="jumbotron-content absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Join Us Today</h1>
            <p className="mt-4 text-lg md:text-2xl">Be a part of our growing community</p>
            <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-lg font-semibold">Sign Up</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Jumbotron;
