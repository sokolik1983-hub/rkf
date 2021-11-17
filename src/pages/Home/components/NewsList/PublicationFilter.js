import React, {memo} from "react";


const PublicationFilter = ({changeTypeFilters, activeType}) => (
    <div className="publicFilter__wrap">
        <h3>Публикации</h3>
        <ul className="publicFilter">
            <li>
                <button
                    className={`ListFilter__item${activeType === 'all' ? ' _active' : ''}`}
                    onClick={() => changeTypeFilters('all')}
                >
                    Все
                </button>
            </li>
            <li>
                <button
                    className={`ListFilter__item${activeType === 'news' ? ' _active' : ''}`}
                    onClick={() => changeTypeFilters('news')}
                >
                    Новости
                </button>
            </li>
            <li>
                <button
                    className={`ListFilter__item${activeType === 'advert' ? ' _active' : ''}`}
                    onClick={() => changeTypeFilters('advert')}
                >
                    Куплю/Продам
                </button>
            </li>
        </ul>
    </div>
);

export default memo(PublicationFilter);