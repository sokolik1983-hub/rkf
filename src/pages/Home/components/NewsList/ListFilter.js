import React, { useState } from "react";
import HorizontalSwipe from "../../../../components/HorozintalSwipe";

const ListFilter = ({ changeFilter }) => {
    const [activeType, setActiveType] = useState(null);

    const handleClick = e => {
        e.preventDefault();
        setActiveType(e.target.name);
        changeFilter(e.target.name);
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
                        <li>
                            <a href="/" name="nurseries" onClick={handleClick} className={activeType === 'nurseries' ? 'active' : undefined}>Питомники</a>
                        </li>
                        <li>
                            <span style={{ opacity: 0.5, cursor: 'default' }}>НКП</span>
                        </li>
                    </ul>
                </HorizontalSwipe>
            </div>
        </div>
    )
};

export default React.memo(ListFilter);