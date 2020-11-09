import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.scss";


const HomepageSlider = ({inputBanners}) => (
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
            {
                inputBanners.map((banner, index) =>   {
                    return <img src={banner.banner_link} alt="" key={index}/>
                }) 
            }

        </Slider>
    </div>
);

export default React.memo(HomepageSlider);
