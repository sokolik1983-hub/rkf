import React, {memo, useEffect} from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import {setFiltersToUrl, getEmptyFilters} from "../../../../utils";
import "./index.scss";


const ListFilter = ({searchTypeId}) => {
    const clientWidth = window.innerWidth;

    const handleClick = (type, e) => {
        const calendarButton = document.getElementsByClassName('specialists-calendar__button active')[0];

        if(calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl({...getEmptyFilters(), SearchTypeId: type});

        if(clientWidth < 600) {
            mobileMenuMoves(type, e.target);
        }
    };

    const mobileMenuMoves = (type, elem) => {
        const clickElemWidth = elem.getBoundingClientRect().width,
            sliderWrap = document.querySelector(".slider-wrap"),
            sliderWidth = document.querySelector(".slider").getBoundingClientRect().width;

        let widthBeforeElems = 0,
            position = 0;
        for (let item of sliderWrap.querySelectorAll('div')) {if (item === elem) {break;} else {widthBeforeElems = widthBeforeElems +item.getBoundingClientRect().width}}

        switch(type) {
            case 1:
                position = widthBeforeElems - ((sliderWidth-clickElemWidth)/2);
                break;
            case 2:
                position = widthBeforeElems - ((sliderWidth-clickElemWidth)/2);
                break;
            case 3:
                position = widthBeforeElems - (sliderWidth - clickElemWidth);
                break;
            default:
                break;
            }
        sliderWrap.style.transform = `translateX(-${position}px)`;
    }
    return (
        <div className="specialists-page__list-filter">
            <h4 className="list-filter__title">Судьи и специалисты</h4>

                {
                    clientWidth < 600 ? (<div className="slider">
                        <HorizontalSwipe id="slider-wrap" className="slider-wrap">
                            <div className={searchTypeId === 4 ? ' _active' : ''} onClick={(e) => handleClick(4, e)}>По породам</div>
                            <div className={searchTypeId === 1 ? ' _active' : ''} onClick={(e) => handleClick(1, e)}>По служебным и <br/> игровым дисциплинам</div>
                            <div className={searchTypeId === 2 ? ' _active' : ''}  onClick={(e) => handleClick(2, e)}>По охотничьим <br/> дисциплинам</div>
                            <div className={searchTypeId === 3 ? ' _active' : ''} onClick={(e) => handleClick(3, e)}>Специалисты</div>
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