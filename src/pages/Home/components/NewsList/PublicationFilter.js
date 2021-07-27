import React from "react";


const PublicationFilter = ({changeTypeFilters, activeType}) => {
    return (
        <div className="publicFilter__wrap">
            <h3>Публикации</h3>
            <ul className="publicFilter">
                <li>
                                <button
                                    className={`ListFilter__item${activeType === 'all' ? ' _active' : ''}`}
                                    onClick={() => changeTypeFilters('all')}>
                                    Все
                                </button>
                </li>
                <li>
                                <button
                                    className={`ListFilter__item${activeType === 'news' ? ' _active' : ''}`}
                                    onClick={() => changeTypeFilters('news')}>
                                    Новости
                                </button>
                </li>
                <li>
                                <button
                                    className={`ListFilter__item${activeType === 'advert' ? ' _active' : ''}`}
                                    onClick={() => changeTypeFilters('advert')}>
                                    Объявления
                                </button>
                </li>
            </ul>
        </div>

    )
}

export default PublicationFilter;