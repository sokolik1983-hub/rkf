import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.scss';

const HomepageSlider = () => {
    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: true,
        fade: true,
        autoplaySpeed: 5000,
        speed: 500,
        slidesToScroll: 1,
        rows: 1,
        slidesPerRow: 1
    };

    return <div className="HomepageSlider">
        <Slider {...settings}>
            <img src="/static/images/slider/temp.png" alt="" />
            <img src="/static/images/slider/temp.png" alt="" className="img-flip" />
        </Slider>
    </div>
};

export default HomepageSlider;