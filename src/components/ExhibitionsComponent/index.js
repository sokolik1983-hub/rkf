import React, {useState, useEffect} from "react";
import ExhibitionCard from "../ExhibitionCard";
import Slider from "react-slick";
import CustomArrow from "../../components/CustomArrow";
import Placeholder from "../ExhibitionCard/Placeholder";
import {Request} from "../../utils/request";
import {responsiveSliderConfig} from "appConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.scss";

const Placeholders = [0, 1, 2];

const ExhibitionsComponent = ({alias}) => {
    const [exhibitions, setExhibitions] = useState(null);
    const [isRequestEnd, setIsRequestEnd] = useState(false);

    useEffect(() => {
        (() => Request({
            url: `/api/exhibitions/Exhibition/featured?Alias=${alias}&ElementsCount=3`
        }, data => {
            setExhibitions(data);
            setIsRequestEnd(true);
        },
        error => {
            console.log(error.response);
            if (error.response) alert(`Ошибка: ${error.response.status}`);
            setIsRequestEnd(true);
        }))();
    }, [alias]);

    if(isRequestEnd && (!exhibitions || !exhibitions.length)) return null;

    return (
        <div className="exhibitions-component">
            <Slider
                arrows={false}
                infinite={false}
                speed={500}
                slidesToShow={3}
                slidesToScroll={3}
                nextArrow={<CustomArrow className="slick-next" alt="next" />}
                prevArrow={<CustomArrow className="slick-prev" alt="prev" />}
                touchThreshold={20}
                responsive={responsiveSliderConfig}
            >
                {exhibitions ?
                    exhibitions.map(exhibition => <ExhibitionCard key={exhibition.id} {...exhibition} />) :
                    Placeholders.map(item => <Placeholder key={item} />)
                }
            </Slider>
        </div>
    )
};

export default React.memo(ExhibitionsComponent);
