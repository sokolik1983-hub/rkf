import React, { useState, useEffect } from 'react';
import CitySelect from 'components/CitySelect';

const ListFilter = ({ setNewsFilter }) => {
    const [city, setCity] = useState(getCity());
    const [activeType, setActiveType] = useState(null);

    function getCity() {
        const l = localStorage.getItem('GLOBAL_CITY');
        return l ? JSON.parse(l) : { label: 'Выберите город', value: null };
    };

    const cityFilter = city => setCity(city);

    const handleClick = (e) => {
        e.preventDefault();
        setActiveType(e.target.name);
    };

    useEffect(() => {
        setNewsFilter({ city: city, activeType: activeType });
    }, [city, activeType]);

    return <div className="ListFilter">
        <ul>
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
        <CitySelect cityFilter={cityFilter} />
    </div >
}

export default ListFilter;