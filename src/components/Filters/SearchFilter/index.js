import React, { useMemo, useState } from "react";
import history from '../../../utils/history';
import SwipeTabs from "../../../components/SwipeTabs";

import  "./index.scss"


const SearchFilter = ({filtersValue, searchTypeId = 1}) => {
    const [searchValue, setSearchValue] = useState(filtersValue.string_filter);

    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/search?string_filter=${searchValue.trim()}&search_type=8`);
    };

    const tabItems = useMemo(() => {
        return [
            {title: 'Организации', search_type: 1},
            {title: 'Мероприятия', search_type: 2},
            {title: 'Публикации', search_type: 3},
            {title: 'Специалисты', search_type: 4}
        ];
    }, []);

    return (
        <div className="search-page__content-filter">
            <h3 className="search-page__filters-title">Результаты поиска по запросу:</h3>

            <form onSubmit={handleSubmit}>
                <input type='text'
                       className="search-page__content-input"
                       onChange={({ target }) => setSearchValue(target.value)}
                       value={searchValue}
                />

                <button className="search-page__content-btn" type='submit'>
                    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                            d='M7.62594 14.2519C11.2853 14.2519 14.2519 11.2853 14.2519 7.62594C14.2519 3.96653 11.2853 1 7.62594 1C3.96653 1 1 3.96653 1 7.62594C1 11.2853 3.96653 14.2519 7.62594 14.2519Z'
                            stroke='#90999E' strokeWidth='1.32' strokeMiterlimit='10' strokeLinejoin='round' />
                        <path d='M12.3023 12.3024L19 19.0001' stroke='#90999E' strokeWidth='1.32'
                              strokeMiterlimit='10' strokeLinejoin='round' />
                    </svg>
                </button>
            </form>

            <div className="search-page__horizontal-menu">
                <SwipeTabs
                    items={tabItems}
                    activeTabIndex={tabItems.findIndex(item => item.search_type === searchTypeId)}
                    onChange={({search_type}) => 1}
                />
            </div>
        </div>
    )
}

export default SearchFilter;