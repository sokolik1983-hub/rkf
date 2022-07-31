import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { setFiltersToUrl } from "../../../../utils";
import { CSSTransition } from "react-transition-group";

import "./index.scss";

export const Sorting = ({ isOpen, setIsOpen, setSortId }) => {
    /*
        типы сортировок:
        1 - по умолчанию
        2 - по популярности
        3 - прошедшие
    */

    const sortItems = useMemo(() => {
        return [
            {
                id: 0,
                title: 'По умолчанию',
                header: 'Сортировка',
                sortType: 1,
            },
            {
                id: 1,
                title: 'По популярности',
                header: 'По популярности',
                sortType: 2,
            },
            {
                id: 1,
                title: 'Прошедшие',
                header: 'Прошедшие',
                sortType: 2,
            },
        ];
    }, []);

    const [nameOfSort, setNameOfSort] = useState('Сортировка');

    const location = useLocation();
    const urlSortFilter = location.search.match(/sortType=\d/);
    const urlSortType = urlSortFilter && +urlSortFilter[0].replace('sortType=', '');


    const handleChange = (itemId) => {
        let filterType;

        sortItems.forEach(item => {
            if (item.id === itemId) {
                filterType = item.sortType;
                setNameOfSort(item.header);
            }
        })

        if (urlSortType !== filterType) {
            setFiltersToUrl({ sortType: filterType });
            setSortId(filterType);
        }

        setIsOpen(!isOpen);
    }

    const checkIsActive = (id, type) => {
        if ((urlSortType === type) || ((urlSortType === 2 || urlSortType === 3) && id === 1)) {
            return true;
        }
    }


    return (
        <div className="sorting">
            <div
                className="sorting__header"
                onClick={ () => setIsOpen( !isOpen) }
            >
                <span className="sorting__header-name">
                    {nameOfSort}
                </span>
                <span className={ `sorting__header-chevron${ isOpen ? ' _dropdown_open' : '' }` }/>
            </div>

            <CSSTransition
                in={ isOpen }
                timeout={ 50 }
                unmountOnExit
                classNames="sorting__dropdown-transition"
            >
                <ul className="sorting__dropdown-menu">
                    { sortItems.map(item =>
                        <li
                            className={ `sorting__dropdown-menu-item${
                                checkIsActive(item.id, item.sortType) ? ' _active' : '' }`
                            }
                            key={ item.id }
                            onClick={ () => handleChange(item.id) }
                        >
                            <span>{ item.title }</span>
                        </li>
                    ) }
                </ul>
            </CSSTransition>
        </div>
    )
};