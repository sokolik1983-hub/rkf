import React, { useEffect, useState } from "react";
import ExhibitionCard from './ExhibitionCard';
import { Link } from "react-router-dom";
import { Request } from "utils/request";
import ExhibitionsPlaceholder from '../Placeholder';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.scss';

const ExhibitionsSlider = () => {
    const [exhibitions, setExhibitions] = useState(null);

    useEffect(() => {
        if (!exhibitions) {
            Request({
                url: '/api/exhibitions/Exhibition/featured?ElementsCount=14',
                method: 'GET'
            }, data => {
                setExhibitions(data);
            }, error => {
                console.log(error.response);
                if (error.response) alert(`Ошибка: ${error.response.status}`);
            });
        }
    }, []);


    const CustomArrow = ({ className, alt, onClick }) => <img className={className} onClick={onClick} src="/static/images/slider/slider-button.svg" alt={alt} />;
    var settings = {
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 1,
        rows: 1,
        slidesPerRow: 3,
        nextArrow: <CustomArrow className="slick-next" alt="next" />,
        prevArrow: <CustomArrow className="slick-prev" alt="prev" />,
    };

    return <div className="ExhibitionsSlider">
        <div className="ExhibitionsSlider__wrapper">
            <h3 className="ExhibitionsSlider__heading">Выставки</h3>
            {
                exhibitions
                    ? <Slider {...settings}>
                        {exhibitions.map(exhibition => <ExhibitionCard key={exhibition.id} {...exhibition} />)}
                        <div>
                            <div className="ExhibitionsSlider__show-more">
                                <Link to={'/exhibitions'}>Показать больше</Link>
                            </div>
                        </div>
                    </Slider>
                    : <ExhibitionsPlaceholder />
            }
        </div>
    </div>
};


export default ExhibitionsSlider;