import React, {useEffect, useState} from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import {setFiltersToUrl, getEmptyFilters} from "../../../../utils";
import "./index.scss";


const ListFilter = ({categoryId}) => {
    const [activeType, setActiveType] = useState(0);

    useEffect(() => {
        setActiveType(+categoryId);
    }, [categoryId]);

    const handleClick = type => {
        const calendarButton = document.getElementsByClassName('exhibitions-calendar__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl({...getEmptyFilters(), CategoryId: type});
    };

    return (
        <div className="exhibitions-page__list-filter">
            <HorizontalSwipe id="exhibitions-list-filter">
                <ul className="list-filter">
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
                </ul>
            </HorizontalSwipe>
        </div>
    )
};

export default React.memo(ListFilter);