import React, {useEffect, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {setFiltersToUrl} from "../../../utils";


const DropdownItem = ({filtersValue, name, search_type, count, filters}) => {
    const [isOpen, setIsOpen] = useState(search_type === filtersValue.search_type);

    useEffect(() => {
        setIsOpen(search_type === filtersValue.search_type);
    }, [filtersValue.search_type]);

    const handleClick = () => {
        if(count) {
            setIsOpen(!isOpen);
            if(search_type !== filtersValue.search_type) {
                setFiltersToUrl({...filtersValue, search_type});
            }
        }
    };

    return (
        <li className={`dropdown__item${filtersValue.search_type === search_type ? ' _active' : ''}${!count ? ' _disabled' : ''}`}>
            <div className="dropdown__item-head" onClick={handleClick}>
                <span className="dropdown__item-title">{name}</span>
                <span className={`dropdown__item-count${!count ? ' _disabled' : ''}`} title={count}>
                    {count > 99 ? '99+' : count}
                </span>
            </div>
            {!!filters.length &&
                <CSSTransition
                    in={isOpen}
                    timeout={350}
                    classNames="dropdown__transition"
                    unmountOnExit
                >
                    <div className="dropdown__item-body">Фильтры</div>
                </CSSTransition>
            }
        </li>
    )
};

export default DropdownItem;