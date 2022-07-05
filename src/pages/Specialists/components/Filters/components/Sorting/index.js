import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { setFiltersToUrl } from "../../../../utils";
import { CSSTransition } from "react-transition-group";

import "./index.scss";

export const Sorting = ({ isOpen, setIsOpen, setSortId }) => {
    /*
        типы сортировок:
        1 - по умолчанию
        2 - по алфавиту (по алфавиту от а до я)
        3 - по алф  наоборот
        4 - подтверждённые
        5 - по популярности
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
                title: 'По алфавиту',
                header: 'По алфавиту',
                sortType: [2, 3],
            },
            {
                id: 2,
                title: 'Подтвержденные',
                header: 'По активности',
                sortType: 4,
            },
            {
                id: 3,
                title: 'По популярности',
                header: 'По популярности',
                sortType: 5,
            },
        ];
    }, []);

    const [isAlphabetAZ, setIsAlphabetAZ] = useState(false);
    const [isAlphabetZA, setIsAlphabetZA] = useState(false);
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
            if (itemId === 1) {
                if ( !isAlphabetAZ && !isAlphabetZA) {
                    setIsAlphabetAZ(true);

                    setFiltersToUrl({ sortType: filterType[0] });
                    setSortId(filterType[0])
                } else if (isAlphabetAZ) {
                    setIsAlphabetAZ(false);
                    setIsAlphabetZA(true);

                    setFiltersToUrl({ sortType: filterType[1] });
                    setSortId(filterType[1])
                } else {
                    setIsAlphabetZA(false);
                    setIsAlphabetAZ(true);

                    setFiltersToUrl({ sortType: filterType[0] });
                    setSortId(filterType[0])
                }
            } else {
                isAlphabetAZ && setIsAlphabetAZ(false);
                isAlphabetZA && setIsAlphabetZA(false);

                setFiltersToUrl({ sortType: filterType });
                setSortId(filterType)
            }
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
                            { item.id === 1 &&
                                <span className={ `alphabet-icon${ isAlphabetZA ? ' _reverse' : '' }` }/>
                            }
                        </li>
                    ) }
                </ul>
            </CSSTransition>
        </div>
    )
};