import React, {memo} from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import {setFiltersToUrl, getEmptyFilters} from "../../../../utils";
import mobileMenuMoves from "../../../../../../utils/mobileMenuMoves";
import "./index.scss";


const ListFilter = ({searchTypeId}) => {
    const clientWidth = window.innerWidth;

    const handleClick = (type, e, place) => {
        const calendarButton = document.getElementsByClassName('specialists-calendar__button active')[0];

        if(calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl({...getEmptyFilters(), SearchTypeId: type});

        if(clientWidth < 600) {
            mobileMenuMoves(place, e.target);
        }
    };

    return (
        <div className="specialists-page__list-filter">
            <h4 className="list-filter__title">Судьи и специалисты</h4>

                {
                    clientWidth < 600 ? (<div className="slider">
                        <HorizontalSwipe id="slider-wrap1" className="slider-wrap">
                            <div className={searchTypeId === 4 ? ' _active' : ''} onClick={(e) => handleClick(4, e, 1)}>По породам</div>
                            <div className={searchTypeId === 1 ? ' _active' : ''} onClick={(e) => handleClick(1, e, 2)}>По служебным и <br/> игровым дисциплинам</div>
                            <div className={searchTypeId === 2 ? ' _active' : ''}  onClick={(e) => handleClick(2, e, 3)}>По охотничьим <br/> дисциплинам</div>
                            <div className={searchTypeId === 3 ? ' _active' : ''} onClick={(e) => handleClick(3, e, 4)}>Специалисты</div>
                        </HorizontalSwipe>
                    </div>) : (
                        <HorizontalSwipe id="specialists-list-filter" desktopScroll={true}>
                        <ul className="list-filter">
                            <li className="list-filter__item">
                        <span
                            className={`list-filter__control${searchTypeId === 4 ? ' _active' : ''}`}
                            onClick={() => handleClick(4)}
                        >
                            По породам
                        </span>
                            </li>
                            <li className="list-filter__item">
                        <span
                            className={`list-filter__control${searchTypeId === 1 ? ' _active' : ''}`}
                            onClick={() => handleClick(1)}
                        >
                            По служебным и игровым дисциплинам
                        </span>
                            </li>
                            <li className="list-filter__item">
                        <span
                            className={`list-filter__control${searchTypeId === 2 ? ' _active' : ''}`}
                            onClick={() => handleClick(2)}
                        >
                            По охотничьим дисциплинам
                        </span>
                            </li>
                            <li className="list-filter__item">
                        <span
                            className={`list-filter__control${searchTypeId === 3 ? ' _active' : ''}`}
                            onClick={() => handleClick(3)}
                        >
                            Специалисты
                        </span>
                            </li>
                        </ul>
                        </HorizontalSwipe>
                    )
                }

        </div>
    )
};

export default memo(ListFilter);