import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TextSlider = ({ filters }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filtersToShow, setFiltersToShow] = useState(filters);
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % filtersToShow.length);
      sliderRef.current.slickGoTo((currentSlide + 1) % filtersToShow.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentSlide, filtersToShow.length]);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

  return (
    <Slider
      ref={sliderRef}
      {...settings}
    >
      {filtersToShow.map((text, index) => (
        <Box
          key={index}
          sx={{
            textAlign: 'center',
            fontFamily: 'sans-serif',
            fontSize: '45px',
            fontWeight: 550,
            height: '240px',
            fontStyle: 'normal',
            color: 'transparent',
            background: 'linear-gradient(to right, #9a4dff, #6f00ff)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            marginTop: '60px',
          }}
        >
          {text.displayText}
        </Box>
      ))}
    </Slider>
  );
};

export default TextSlider;
