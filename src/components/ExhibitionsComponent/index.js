import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ExhibitionCard from "../ExhibitionCard";
import Slider from "react-slick";
import CustomArrow from "../../components/CustomArrow";
import Placeholder from "../ExhibitionCard/Placeholder";
import { Request } from "../../utils/request";
import { responsiveSliderConfig } from "../../appConfig";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KendoCard from "../kendo/Card";
import useIsMobile from "../../utils/useIsMobile";
import "./index.scss";



const Placeholders = [0, 1, 2, 3];

const ExhibitionsComponent = ({ alias }) => {
    const [exhibitions, setExhibitions] = useState(null);
    const [isRequestEnd, setIsRequestEnd] = useState(false);
    const [needBlock, setNeedBkock] = useState(false);
    const endpoint = alias
        ? `/api/exhibitions/Exhibition/featured?Alias=${alias}&All=true`
        : '/api/exhibitions/Exhibition/featured?ElementsCount=14';

    const history = useHistory();

    const isMobile = useIsMobile(600);

    useEffect(() => {
        if (window.innerWidth > 1180) {
            setNeedBkock(true);
        }

        window.addEventListener("resize", () => {
            if (window.innerWidth > 1180) {
                setNeedBkock(true);
            }
        });

        return window.removeEventListener("resize", () => {
            if (window.innerWidth > 1180) {
                setNeedBkock(true);
            }
        });
    }, []);

    useEffect(() => {
        (() => Request({
            url: endpoint
        }, data => {
            setExhibitions(data);
            setIsRequestEnd(true);
        },
            error => {
                console.log(error.response);
                if (error.response) alert(`Ошибка: ${error.response.status}`);
                setIsRequestEnd(true);
            }))();
    }, [alias ? alias : null]);

    if (isRequestEnd && (!exhibitions || !exhibitions.length)) return null;

    return (
        <div className={`exhibitions-component${alias ? '' : ' exhibitions-homepage'} ${(exhibitions?.length === 1 && isMobile) ? 'exhibitions-component__one-slide' : ''} ${alias === 'rkf' && 'rkf_profile-slider'}`}>
            <Slider
                arrows={!!exhibitions}
                infinite={false}
                speed={500}
                slidesToShow={3}
                slidesToScroll={1}
                nextArrow={<CustomArrow className="slick-next" alt="next" />}
                prevArrow={<CustomArrow className="slick-prev" alt="prev" />}
                touchThreshold={20}
                variableWidth={true}
                responsive={responsiveSliderConfig}
            >
                {exhibitions ?
                    exhibitions.map(exhibition => history.location.hash === '#kendo'
                        ? <KendoCard className={exhibitions.length === 0} key={exhibition.id} {...exhibition} />
                        : <ExhibitionCard isOne={exhibitions.length === 1} key={exhibition.id} {...exhibition} />) :
                    Placeholders.map(item => <Placeholder key={item} />)
                }
                {alias && alias !== 'rkf'  && needBlock &&
                    <div className="exhibition-card__additional-block" />
                }
                {!alias && exhibitions &&
                    <div className="exhibition-card exhibitions-homepage__show-more">
                        <img src="static/images/homepage/show-more.png" alt="" />
                        <div className="exhibitions-homepage__show-more-wrap">
                            <h4>У нас много других мероприятий</h4>
                            <p>Найдите подходящие для себя мероприятия</p>
                            <Link to={'/exhibitions'}>Смотреть другие мероприятия</Link>
                        </div>
                    </div>
                }
            </Slider>
        </div>
    )
};

export default React.memo(ExhibitionsComponent);
