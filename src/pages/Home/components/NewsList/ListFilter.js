import React, { useState, useEffect } from "react";
import CitySelect from "../../../../components/CitySelect";
import HorizontalSwipe from "../../../../components/HorozintalSwipe";

function getCity() {
    const l = localStorage.getItem('GLOBAL_CITY');
    return l ? JSON.parse(l) : { label: 'Выберите город', value: null };
}


const ListFilter = ({ setNewsFilter }) => {
    const [city, setCity] = useState(getCity());
    const [activeType, setActiveType] = useState(null);

    useEffect(() => {
        setNewsFilter({ city: city, activeType: activeType });
    }, [city, activeType]);

    const handleClick = (e) => {
        e.preventDefault();
        setActiveType(e.target.name);
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
                        <li style={{opacity: 0.5}}>
                            <span>НКП</span>
                        </li>
                        <li style={{opacity: 0.5}}>
                            <span>Питомники</span>
                        </li>
                    </ul>
                </HorizontalSwipe>
            </div>
            <CitySelect cityFilter={city => setCity(city)} />
        </div>
    )
};

export default ListFilter;