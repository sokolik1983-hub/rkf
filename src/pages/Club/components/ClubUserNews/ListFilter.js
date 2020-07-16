import React, { useState } from "react";
import HorizontalSwipe from "../../../../components/HorozintalSwipe";

const ListFilter = ({ setNewsFilter, setPage, currentActiveType, currentCity }) => {
    const [activeType, setActiveType] = useState(currentActiveType);

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
                            <a href="/" name="rkf_and_federations" onClick={handleClick} className={activeType === 'rkf_and_federations' ? 'active' : undefined}>Новости</a>
                        </li>
                        <li style={{ opacity: 0.5 }}>
                            <span>Объявления</span>
                        </li>
                    </ul>
                </HorizontalSwipe>
            </div>
        </div>
    )
};

export default ListFilter;