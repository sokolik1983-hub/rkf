import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";
import {setFiltersToUrl} from "../../../utils";
import "./index.scss";


const Dropdown = ({name, items, filtersValue}) => {
    const [isOpen, setIsOpen] = useState(true);

    console.log('filters inner', name, items[0].count)

    return (
        <div className={`dropdown${isOpen ? ' _open' : ''}${!!items.find(item => item.search_type === filtersValue.search_type) ? ' _active' : ''}`}>
            <h3 className="dropdown__title" onClick={() => setIsOpen(!isOpen)}>{name}</h3>
            <CSSTransition
                in={isOpen}
                timeout={350}
                classNames="dropdown__transition"
                unmountOnExit
            >
                <ul className="dropdown__list">
                    {items.map(item =>
                        <li className={`dropdown__item${filtersValue.search_type === item.search_type ? ' _active' : ''}`}
                            key={item.name}
                            onClick={() => setFiltersToUrl({...filtersValue, search_type: item.search_type})}
                        >
                            <span className="dropdown__item-title">{item.name}</span>
                            <span className={`dropdown__item-count${!item.count ? ' _disabled' : ''}`} title={item.count}>
                                {item.count > 99 ? '99+' : item.count}
                            </span>
                        </li>
                    )}
                </ul>
            </CSSTransition>
        </div>
    )
};

export default Dropdown;