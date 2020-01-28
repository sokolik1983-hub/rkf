import React, { useState, useEffect } from 'react';
import Swipe from 'react-easy-swipe';
import CitySelect from 'components/CitySelect';

function getCity() {
    const l = localStorage.getItem('GLOBAL_CITY');
    return l ? JSON.parse(l) : { label: 'Выберите город', value: null };
}


const ListFilter = ({ setNewsFilter }) => {
    const [city, setCity] = useState(getCity());
    const [activeType, setActiveType] = useState(null);
    const [left, setLeft] = useState(0);

    useEffect(() => {
        setNewsFilter({ city: city, activeType: activeType });
    }, [city, activeType]);

    const handleClick = (e) => {
        e.preventDefault();
        setActiveType(e.target.name);
    };

    const onSwipeMove = (position, event) => {
        const windowWidth = event.view.innerWidth;

        console.log('e', event);

        if(windowWidth < 560) {
            const listWidth = event.path.filter(tag => tag.tagName === 'UL').length ?
                event.path.filter(tag => tag.tagName === 'UL')[0].scrollWidth : 501;
            const leftMax = windowWidth - 32 - listWidth;

            setLeft(position.x < 0 ? position.x > leftMax ? position.x : leftMax : 0);
        }
    };

    return (
        <div className="NewsList__filter">
            <div className="ListFilter__wrap">
                <Swipe className="ListFilter" tagName="ul" onSwipeMove={onSwipeMove} style={{transform: `translate(${left}px, 0)`}}>
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
                </Swipe>
            </div>
            <CitySelect cityFilter={city => setCity(city)} />
        </div>
    )
};

export default ListFilter;