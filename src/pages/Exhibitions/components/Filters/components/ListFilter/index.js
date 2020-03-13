import React, {useState} from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import {setFiltersToUrl, getEmptyFilters} from "../../../../utils";
import "./index.scss";


const ListFilter = () => {
    const [activeType, setActiveType] = useState(1);

    const handleClick = type => {
        setActiveType(type);
        setFiltersToUrl(getEmptyFilters());
    };

    return (
        <div className="exhibitions-page__list-filter">
            <HorizontalSwipe id="exhibitions-list-filter">
                <ul className="list-filter">
                    <li className="list-filter__item">
                        <button
                            className={`list-filter__control${activeType === 1 ? ' _active' : ''}`}
                            type="button"
                            onClick={() => handleClick(1)}
                        >Все</button>
                    </li>
                    <li className="list-filter__item">
                        <button
                            className={`list-filter__control${activeType === 2 ? ' _active' : ''}`}
                            type="button"
                            onClick={() => handleClick(2)}
                        >Выставочные мероприятия</button>
                    </li>
                    <li className="list-filter__item">
                        <a className="list-filter__control _not-active"
                           href="http://rkf.org.ru/plemennaja-dejatelnost/"
                           target="_blank"
                           rel="noopener noreferrer"
                        >Племенные мероприятия</a>
                    </li>
                    <li className="list-filter__item">
                        <a className="list-filter__control _not-active"
                           href="http://rkf.org.ru/dressirovka-i-sport/"
                           target="_blank"
                           rel="noopener noreferrer"
                        >Состязания и испытания рабочих качеств</a>
                    </li>
                </ul>
            </HorizontalSwipe>
        </div>
    )
};

export default React.memo(ListFilter);