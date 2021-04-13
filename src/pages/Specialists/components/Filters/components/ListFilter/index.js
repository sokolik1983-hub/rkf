import React, { useEffect, useState } from "react";
import HorizontalSwipe from "../../../../../../components/HorozintalSwipe";
import { setFiltersToUrl } from "../../../../utils";
import "./index.scss";


const ListFilter = ({ searchTypeId }) => {
    const [activeType, setActiveType] = useState(0);

    useEffect(() => {
        setActiveType(+searchTypeId);
    }, [searchTypeId]);

    const handleClick = type => {
        const calendarButton = document.getElementsByClassName('specialists-calendar__button active')[0];
        if (calendarButton) calendarButton.classList.remove('active');

        setFiltersToUrl({ SearchTypeId: type });

        // if (type === 4 || (activeType === 4 && type !== 4)) {
        //     setFiltersToUrl({ CityIds: [] });
        // }
    };

    return (
        <div className="specialists-page__list-filter">
            <h4 className="list-filter__title">Судьи и специалисты</h4>
            <HorizontalSwipe id="specialists-list-filter">
                <ul className="list-filter">
                    <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 3 ? ' _active' : ''}`}
                            style={{opacity:0.6}}
                            //onClick={() => handleClick(1)}
                        >Судьи по породам</span>
                    </li>
                    <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 1 ? ' _active' : ''}`}
                            onClick={() => handleClick(1)}
                        >Судьи по служебным и игровым дисциплинам</span>
                    </li>
                    <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 2 ? ' _active' : ''}`}
                            style={{opacity:0.6}}
                            //onClick={() => handleClick(2)}
                        >Судьи по охотничьим дисциплинам</span>
                    </li>
                    <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 4 ? ' _active' : ''}`}
                            style={{opacity:0.6}}
                            //onClick={() => handleClick(2)}
                        >Специалисты</span>
                    </li>
                    {/* <li className="list-filter__item">
                        <span
                            className={`list-filter__control${activeType === 4 ? ' _active' : ''}`}
                            onClick={() => handleClick(4)}
                        >Обучение</span>
                    </li> */}
                </ul>
            </HorizontalSwipe>
        </div>
    )
};

export default React.memo(ListFilter);