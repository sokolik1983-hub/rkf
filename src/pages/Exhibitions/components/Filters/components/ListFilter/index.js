import React, { useEffect, useState } from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import { setFiltersToUrl } from "../../../../utils";
import "./index.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const exhibitionsMenuLi = [{
        title: 'Все',
    },
    {
        title: 'Выставочные мероприятия',
    },
    {
        title: 'Племенные мероприятия',
    },
    {
        title: 'Состязания и испытания рабочих качеств',
    }]
const ListFilter = ({ categoryId, exhibitionsForTable, standardView, setExporting, exporting, setStandardView }) => {
    const [activeType, setActiveType] = useState(0);

    useEffect(() => {
        setActiveType(+categoryId);
    }, [categoryId]);

    const handleClick = type => {
        const calendarButton = document.getElementsByClassName('exhibitions-calendar__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl({ CategoryId: type });

        if (type === 4 || (activeType === 4 && type !== 4)) {
            setFiltersToUrl({ CityIds: [] });
        }
    };

    const clientWidth = window.innerWidth;

    return (
        <div className="exhibitions-page__list-filter">
           <div className="exhibitions-page__title-inner">
               <h4 className="list-filter__title">Мероприятия</h4>
               <div className="exhibitions-page__controls">
                   {!!exhibitionsForTable.length && !standardView &&
                   <button
                       className="exhibitions-page__control exhibitions-page__control--downloadIcon"
                       onClick={() => setExporting(true)}
                       disabled={exporting}
                   >
                       Скачать PDF
                   </button>
                   }
                   <button className={"exhibitions-page__control " + (standardView ? 'exhibitions-page__control--tableIcon' : 'exhibitions-page__control--backIcon')} onClick={() => setStandardView(!standardView)}>
                       {standardView ? 'Переключиться на табличный вид' : 'Вернуться к стандартному просмотру'}
                   </button>
               </div>
           </div>

            <HorizontalSwipe id="exhibitions-list-filter">
                {
                    (clientWidth < 600) ? (<Slider
                        slidesToShow={1}
                        arrows={false}
                        centerMode={true}
                        focusOnSelect={true}
                        dots={false}
                        infinite={false}
                        autoplay={false}
                        fade={false}
                        adaptiveHeight={true}
                        variableWidth={true}
                    >
                        {
                           exhibitionsMenuLi.map((item, index) => (<li className="list-filter__item">
                            <span
                            className={`list-filter__control${activeType === index ? ' _active' : ''}`}
                            onClick={() => handleClick(index)}
                            >{item.title}</span>
                            </li>))
                        }
                    </Slider>) : (<ul className="list-filter">
                        <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 0 ? ' _active' : ''}`}
                            onClick={() => handleClick(0)}
                        >Все</span>
                        </li>
                        <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 1 ? ' _active' : ''}`}
                            onClick={() => handleClick(1)}
                        >Выставочные мероприятия</span>
                        </li>
                        <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 2 ? ' _active' : ''}`}
                            onClick={() => handleClick(2)}
                        >Племенные мероприятия</span>
                        </li>
                        <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 3 ? ' _active' : ''}`}
                            onClick={() => handleClick(3)}
                        >Состязания и испытания рабочих качеств</span>
                        </li>
                        {/* <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 4 ? ' _active' : ''}`}
                            onClick={() => handleClick(4)}
                        >Обучение</span>
                    </li> */}
                    </ul>)
                }
            </HorizontalSwipe>
        </div>
    )
};

export default React.memo(ListFilter);