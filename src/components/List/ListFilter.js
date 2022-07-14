import React, { useState, useEffect } from 'react';
import CitySelect from 'components/CitySelect';
import './ListFilter.scss';

const ListFilter = ({ setNewsFilter }) => {
    const [city, setCity] = useState(getCity());
    const [activeType, setActiveType] = useState(null);

    function getCity() {
        const l = localStorage.getItem('GLOBAL_CITY');
        return l ? JSON.parse(l) : { label: 'Выберите город', value: null };
    }

    const cityFilter = city => setCity(city);

    const handleClick = (e) => {
        e.preventDefault();
        setActiveType(e.target.name);
    };

    useEffect(() => {
        setNewsFilter({ city: city, activeType: activeType });
    }, [city, activeType]);

    return <div className="list-filter">
        <ul>
            <li>
                <a href="/" onClick={handleClick} className={!activeType ? 'active' : ''}>Все</a>
            </li>
            <li>
                <a href="/" name="rkf_and_federations" onClick={handleClick} className={activeType === 'rkf_and_federations' ? 'active' : ''}>РКФ и Федерации</a>
            </li>
            <li>
                <a href="/" name="clubs" onClick={handleClick} className={activeType === 'clubs' ? 'active' : ''}>Клубы</a>
            </li>
            <li className="_opacity">
                <span>НКП</span>
            </li>
            <li className="_opacity">
                <span>Питомники</span>
            </li>
        </ul>
        <CitySelect cityFilter={cityFilter} />
    </div >
}

export default ListFilter;