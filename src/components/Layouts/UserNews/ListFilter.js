import React, { useState } from "react";
import HorizontalSwipe from "../../HorozintalSwipe";


const ListFilter = ({ setFilters, setNeedRequest, isFederation }) => {
    const [activeType, setActiveType] = useState('all');

    const handleClick = type => {
        setActiveType(type);
        if (type === 'all') {
            setFilters(null);
        } else if (type === 'is_must_read') {
            setFilters({ is_must_read: true });
        } else if (type === 'advert') {
            setFilters({ is_advert: true });
        } else if (type === 'news') {
            setFilters({ is_advert: false });
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
                            >Куплю/Продам</span>
                        </li>
                        {
                            isFederation && <li>
                                <span
                                    className={`ListFilter__item${activeType === 'is_must_read' ? ' _active' : ''}`}
                                    onClick={() => handleClick('is_must_read')}
                                >Обязательные к прочтению</span>
                            </li>
                        }
                    </ul>
                </HorizontalSwipe>
            </div>
        </div>
    )
};

export default React.memo(ListFilter);