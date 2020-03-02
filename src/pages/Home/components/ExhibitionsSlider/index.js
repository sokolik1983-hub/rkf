import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Container from "../../../../components/Layouts/Container";
import ExhibitionCard from "./ExhibitionCard";
import {Request} from "../../../../utils/request";
import Placeholder from './Placeholder';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.scss";


const CustomArrow = ({ className, alt, onClick }) => (
    <img className={className} onClick={onClick} src="/static/images/slider/slider-button.svg" alt={alt} />
);

const Placeholders = [0, 1, 2];


const ExhibitionsSlider = () => {
    const [exhibitions, setExhibitions] = useState(null);

    useEffect(() => {
        (() => Request({
            url: '/api/exhibitions/Exhibition/featured?ElementsCount=14',
            method: 'GET'
        }, data => {
            setExhibitions(data);
        }, error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
        }))();
    }, []);

    return (
        <Container className="ExhibitionsSlider">
            <h3 className="ExhibitionsSlider__title"><Link to="/exhibitions">Выставки</Link></h3>
            <Slider
                arrows={!!exhibitions}
                infinite={false}
                speed={500}
                slidesToShow={3}
                slidesToScroll={3}
                nextArrow={<CustomArrow className="slick-next" alt="next" />}
                prevArrow={<CustomArrow className="slick-prev" alt="prev" />}
                touchThreshold={20}
                responsive={[
                    {
                        breakpoint: 1181,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            touchThreshold: 5
                        }
                    },
                    {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            arrows: false,
                            centerPadding: '100px'
                        }
                    },
                    {
                        breakpoint: 561,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: true,
                            arrows: false,
                            centerPadding: '25px'
                        }
                    },
                ]}
            >
                {exhibitions ?
                    exhibitions.map(exhibition => <ExhibitionCard key={exhibition.id} {...exhibition} />) :
                    Placeholders.map(item => <Placeholder key={item} />)
                }
                {exhibitions && <div className="ExhibitionCard ExhibitionsSlider__show-more">
                    <img src="static/images/homepage/show-more.png" alt="" />
                    <div className="ExhibitionsSlider__show-more-wrap">
                        <h4>У нас много других выставок</h4>
                        <p>Найдите подходящие для себя выставки</p>
                        <Link to={'/exhibitions'}>Смотреть другие выставки</Link>
                    </div>
                </div>}
            </Slider>
        </Container>
    )
};

export default React.memo(ExhibitionsSlider);
