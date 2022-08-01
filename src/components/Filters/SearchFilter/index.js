import React, { useMemo, useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';

import history from '../../../utils/history';
import SwipeTabs from '../../../components/SwipeTabs';
import { Sorting } from "../../Sorting";

import  "./index.scss"


const SearchFilter = ({
                          filtersValue,
                          filters,
                          filtersSearchType,
                          searchTabActiveName,
                          handleActiveTypeChange,
                          isMenuChanges,
}) => {
    const [searchValue, setSearchValue] = useState(filtersValue.string_filter);
    const [isOpen, setIsOpen] = useState(false);
    const [sortType, setSortType] = useState(1);

    const location = useLocation();
    const additionalFilterInUrl = location.search.match(/search_type=\d{3}&/);

    const searchTabId = (searchTabActiveName === 'Кинологические организации' || searchTabActiveName === 'Организации') ? 1 :
                        searchTabActiveName === 'Мероприятия' ? 2 :
                        searchTabActiveName === 'Публикации' ? 3 : 4;

    const sortPage = (searchTabActiveName === 'Кинологические организации' || searchTabActiveName === 'Организации') ? 'organizations' :
                    searchTabActiveName === 'Мероприятия' ? 'exhibitions' :
                    searchTabActiveName === 'Публикации' ? 'publications' : 'specialists';

    useEffect(() => {
        console.log('sortType', sortType)
        filtersSearchType = searchTabId === 1 ? 100 : searchTabId === 2 ? 300 : searchTabId === 3 ? 200 : 400;
        (!additionalFilterInUrl || (additionalFilterInUrl && isMenuChanges)) &&
            history.push(`/search?string_filter=${searchValue.trim()}&sortType=${sortType}&search_type=${filtersSearchType}`)
    }, [searchTabActiveName, sortType]);

    useEffect(() => {
        setSearchValue(filtersValue.string_filter);
    }, [filtersValue.string_filter]);


    const handleSubmit = e => {
        e.preventDefault();
        history.push(`/search?string_filter=${searchValue.trim()}&sortType=${sortType}&search_type=${filtersSearchType}`);
    }

    const tabItems = useMemo(() => {
        return [
            {
                title: 'Организации',
                search_type: 1,
                count: 0,
            },
            {
                title: 'Мероприятия',
                search_type: 2,
                count: 0,
            },
            {
                title: 'Публикации',
                search_type: 3,
                count: 0,
            },
            {
                title: 'Специалисты',
                search_type: 4,
                count: 0,
            }
        ];
    }, []);

    tabItems.forEach(item => {
        filters.forEach(filter => {
            if (!!filter.name.toLowerCase().match(item.title.toLowerCase())) {
                item.count = filter.count;
            }
        })
    })

    return (
        <div className="search-page__content-filter">
            <h3 className="search-page__filters-title">Результаты поиска по запросу:</h3>

            <div className="search-page__filter-block">
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

                <Sorting
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    pageName={sortPage}
                    setSortType={setSortType}
                />
            </div>


            <div className="search-page__horizontal-menu">
                <SwipeTabs
                    items={tabItems}
                    activeTabIndex={tabItems.findIndex(item => item.search_type === searchTabId)}
                    onChange={({search_type}) => {
                        searchTabId !== search_type &&
                            tabItems.filter(item => {
                                return item.search_type === search_type && handleActiveTypeChange(item.title);
                            })
                        setIsOpen(false);
                    }}
                />
            </div>
        </div>
    )
}

export default SearchFilter;