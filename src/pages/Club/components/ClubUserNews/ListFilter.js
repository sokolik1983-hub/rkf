import React, { useState } from "react";
import HorizontalSwipe from "../../../../components/HorozintalSwipe";

const ListFilter = ({ setFilters, setNeedRequest }) => {
    const [activeType, setActiveType] = useState('all');

    const handleClick = type => {
        setActiveType(type);
        if(type !== 'all') {
           setFilters({is_advert: type === 'advert'});
        } else {
            setFilters(null);
        }
        setNeedRequest(true);
    };

    return (
        <div className="NewsList__filter">
            <div className="ListFilter__wrap">
                <HorizontalSwipe id="news-list-filter">
                    <ul className="ListFilter">
                        <li>
                            <span
                                className={`ListFilter__item${activeType === 'all' ? ' _active' : ''}`}
                                onClick={() => handleClick('all')}
                            >Все</span>
                        </li>
                        <li>
                            <span
                                className={`ListFilter__item${activeType === 'news' ? ' _active' : ''}`}
                                onClick={() => handleClick('news')}
                            >Новости</span>
                        </li>
                        <li>
                            <span
                                className={`ListFilter__item${activeType === 'advert' ? ' _active' : ''}`}
                                onClick={() => handleClick('advert')}
                            >Объявления</span>
                        </li>
                    </ul>
                </HorizontalSwipe>
            </div>
        </div>
    )
};

export default React.memo(ListFilter);