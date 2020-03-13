import React, { useState } from "react";
import CitySelect from "../../../../components/CitySelect";
import HorizontalSwipe from "../../../../components/HorozintalSwipe";

const ListFilter = ({ setNewsFilter, setPage, currentActiveType, currentCity }) => {
    const [activeType, setActiveType] = useState(currentActiveType);

    const handleClick = (e) => {
        e.preventDefault();
        setActiveType(e.target.name);
        setNewsFilter({ city: currentCity, activeType: e.target.name });
        setPage(1);
    };

    const handleCityChange = city => {
        setNewsFilter({ city: city, activeType });
        setPage(1);
    };

    return (
        <div className="NewsList__filter">
            <div className="ListFilter__wrap">
                <HorizontalSwipe id="news-list-filter">
                    <ul className="ListFilter">
                        <li>
                            <a href="/" onClick={handleClick} className={!activeType ? 'active' : undefined}>Все</a>
                        </li>
                        <li>
                            <a href="/" name="rkf_and_federations" onClick={handleClick} className={activeType === 'rkf_and_federations' ? 'active' : undefined}>РКФ и Федерации</a>
                        </li>
                        <li>
                            <a href="/" name="clubs" onClick={handleClick} className={activeType === 'clubs' ? 'active' : undefined}>Клубы</a>
                        </li>
                        <li style={{ opacity: 0.5 }}>
                            <span>НКП</span>
                        </li>
                        <li style={{ opacity: 0.5 }}>
                            <span>Питомники</span>
                        </li>
                    </ul>
                </HorizontalSwipe>
            </div>
            <CitySelect cityFilter={city => handleCityChange(city)} />
        </div>
    )
};

export default ListFilter;