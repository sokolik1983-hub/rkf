import React, {memo, useEffect} from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import {setFiltersToUrl, getEmptyFilters} from "../../../../utils";
import "./index.scss";


const ListFilter = ({searchTypeId}) => {
    const handleClick = type => {
        const calendarButton = document.getElementsByClassName('specialists-calendar__button active')[0];

        if(calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl({...getEmptyFilters(), SearchTypeId: type});
    };



        const clientWidth = window.innerWidth;
        useEffect(() => {
            if(clientWidth < 600) {
                const sliderWrap = document.querySelector(".slider-wrap"),
                    sliderTabs = sliderWrap.querySelectorAll('div'),
                    slider = document.querySelector(".slider");
                const sliderWidth = slider.getBoundingClientRect().width,
                    firstTabWidth = sliderTabs[0].getBoundingClientRect().width,
                    secondTabWidth = sliderTabs[1].getBoundingClientRect().width,
                    thirdTabWidth = sliderTabs[2].getBoundingClientRect().width,
                    fourthTabWidth = sliderTabs[3].getBoundingClientRect().width,
                    sliderWrapWidth =firstTabWidth+secondTabWidth+thirdTabWidth+fourthTabWidth;
                sliderTabs.forEach((item) => {
                    item.addEventListener('click', (e) => {
                        let num = e.target.getAttribute('data-num'),
                            item2Pos = firstTabWidth - ((sliderWidth-secondTabWidth)/2),
                            item3Pos = (secondTabWidth + firstTabWidth) - ((sliderWidth-thirdTabWidth)/2),
                            item4Pos = sliderWrapWidth - fourthTabWidth - (sliderWidth - fourthTabWidth);

                        switch(num) {
                            case '1':
                                sliderWrap.style.transform = `translateX(0px)`;
                                break;
                            case '2':
                                sliderWrap.style.transform = `translateX(-${item2Pos}px)`;
                                break;
                            case '3':
                                sliderWrap.style.transform = `translateX(-${item3Pos}px)`;
                                break;
                            case '4':
                                sliderWrap.style.transform = `translateX(-${item4Pos}px)`;
                                break;
                        }
                    })
                })
            }
        }, []);


    return (
        <div className="specialists-page__list-filter">
            <h4 className="list-filter__title">Судьи и специалисты</h4>
            <HorizontalSwipe id="specialists-list-filter" desktopScroll={true}>

                    {
                        clientWidth < 600 ? (<div className="slider">
                                <HorizontalSwipe id="slider-wrap" className="slider-wrap">
                                    <div data-num="1" className="red-box">По породам</div>
                                    <div data-num="2" className="green-box">По служебным и <br/> игровым дисциплинам</div>
                                    <div data-num="3" className="blue-box">По охотничьим <br/> дисциплинам</div>
                                    <div data-num="4" className="yellow-box">Специалисты</div>
                                </HorizontalSwipe>
                            </div>)
                            : (
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
                            )
                    }

            </HorizontalSwipe>
        </div>
    )
};

export default memo(ListFilter);