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
            setFilters({ is_advert: true, advert_category_id: 1 });
        } else if (type === 'news') {
            setFilters({ is_advert: false });
        } else if ( type === 'articles') {
            setFilters({ is_advert: true, advert_category_id: 2 });
        }
        setNeedRequest(true);
    };

    return (
        <div className="news-list__filter">
            <div className="list-filter__wrap">
                <HorizontalSwipe id="news-list-filter">
                    <ul className="list-filter">
                        <li>
                            <span
                                className={`list-filter__item${activeType === 'all' ? ' _active' : ''}`}
                                onClick={() => handleClick('all')}
                            >Все</span>
                        </li>
                        <li>
                            <span
                                className={`list-filter__item${activeType === 'news' ? ' _active' : ''}`}
                                onClick={() => handleClick('news')}
                            >Новости</span>
                        </li>
                        <li>
                            <span
                                className={`list-filter__item${activeType === 'advert' ? ' _active' : ''}`}
                                onClick={() => handleClick('advert')}
                            >Куплю/Продам</span>
                        </li>
                        <li>
                            <span
                                className={`list-filter__item${activeType === 'articles' ? ' _active' : ''}`}
                                onClick={() => handleClick('articles')}
                            >Объявления</span>
                        </li>
                        {
                            isFederation && <li>
                                <span
                                    className={`list-filter__item${activeType === 'is_must_read' ? ' _active' : ''}`}
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