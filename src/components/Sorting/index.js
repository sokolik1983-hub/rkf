import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { sortItems } from "./config";

import "./index.scss";


export const Sorting = ({
                            isOpen,
                            setIsOpen,
                            pageName,
                            setFilters,
                            setSortType,
                        }) => {

    const [isAlphabetAZ, setIsAlphabetAZ] = useState(false);
    const [isAlphabetZA, setIsAlphabetZA] = useState(false);
    const [nameOfSort, setNameOfSort] = useState('Сортировка');
    const [activeTypeId, setActiveTypeId] = useState(1);

    const location = useLocation();
    const urlSortFilter = location.search.match(/sortType=\d/);
    const urlSortType = urlSortFilter && +urlSortFilter[0].replace('sortType=', '');

    let items;

    sortItems.forEach(item => {
        if (item.pageName === pageName) items = item.items;
    })


    const handleChange = (itemId) => {
        let filterType;

        items.forEach(item => {
            if (item.id === itemId) {
                filterType = item.sortType;
                setNameOfSort(item.header);
            }
        })

        if (urlSortType !== filterType) {
            if (pageName === 'specialists') {
                if (itemId === 1) {
                    if ( !isAlphabetAZ && !isAlphabetZA) {
                        setIsAlphabetAZ(true);

                        setSortType ? setSortType(filterType[0]) : setFilters({ sortType: filterType[0] });
                        setActiveTypeId(filterType[0]);
                    } else if (isAlphabetAZ) {
                        setIsAlphabetAZ(false);
                        setIsAlphabetZA(true);

                        setSortType ? setSortType(filterType[1]) : setFilters({ sortType: filterType[1] });
                        setActiveTypeId(filterType[1]);
                    } else {
                        setIsAlphabetZA(false);
                        setIsAlphabetAZ(true);

                        setSortType ? setSortType(filterType[0]) : setFilters({ sortType: filterType[0] });
                        setActiveTypeId(filterType[0]);
                    }
                } else {
                    isAlphabetAZ && setIsAlphabetAZ(false);
                    isAlphabetZA && setIsAlphabetZA(false);

                    setSortType ? setSortType(filterType) : setFilters({ sortType: filterType });
                    setActiveTypeId(filterType);
                }
            } else {
                setSortType ? setSortType(filterType) : setFilters({ sortType: filterType });
                setActiveTypeId(filterType);
            }
        }

        setIsOpen(!isOpen);
    }

    const checkIsActive = (id, type) => {
        if ((activeTypeId === type) ||
            (pageName === 'specialists' && (urlSortType === 2 || urlSortType === 3) && id === 1)) {
            return true;
        }
    }

    if (urlSortType && (urlSortType !== activeTypeId)) {
        setActiveTypeId(urlSortType);

        items.forEach(item => {
            if (item.sortType === urlSortType) {
                setNameOfSort(item.header);
            }
        })
    }


    return (
        <div className="sorting">
            <div
                className="sorting__header"
                onClick={ () => setIsOpen( !isOpen) }
            >
                <span className="sorting__header-name">
                    { nameOfSort }
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
                    { items.map(item =>
                        <li
                            className={ `sorting__dropdown-menu-item${
                                checkIsActive(item.id, item.sortType) ? ' _active' : '' }`
                            }
                            key={ item.id }
                            onClick={ () => handleChange(item.id) }
                        >
                            <span>{ item.title }</span>
                            { pageName === 'specialists' && item.id === 1 &&
                                <span className={ `alphabet-icon${ isAlphabetZA ? ' _reverse' : '' }` }/>
                            }
                        </li>
                    ) }
                </ul>
            </CSSTransition>
        </div>
    )
};