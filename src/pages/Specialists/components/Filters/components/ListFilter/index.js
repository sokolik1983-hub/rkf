import React, {memo} from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import {setFiltersToUrl, getEmptyFilters} from "../../../../utils";
import "./index.scss";


const ListFilter = ({searchTypeId}) => {
    const handleClick = type => {
        const calendarButton = document.getElementsByClassName('specialists-calendar__button active')[0];

        if(calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl({...getEmptyFilters(), SearchTypeId: type});
    };



    return (
        <div className="specialists-page__list-filter">
            <h4 className="list-filter__title">Судьи и специалисты</h4>
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
        </div>
    )
};

export default memo(ListFilter);