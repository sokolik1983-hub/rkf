import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.scss";


const HomepageSlider = () => (
    <div className="HomepageSlider">
        <Slider
            arrows={false}
            dots={true}
            infinite={true}
            autoplay={true}
            fade={true}
            autoplaySpeed={5000}
            speed={500}
            slidesToScroll={1}
            rows={1}
            slidesPerRow={1}
        >
            <img src="/static/images/slider/1.png" alt="" />
            <img src="/static/images/slider/4.jpg" alt="" />
            <img src="/static/images/slider/3.jpg" alt="" />
            <img src="/static/images/slider/5.png" alt="" />
        </Slider>
    </div>
);

export default React.memo(HomepageSlider);
