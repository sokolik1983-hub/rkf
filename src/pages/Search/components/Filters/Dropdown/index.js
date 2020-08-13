import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";
import {connectShowFilters} from "../../../../../components/Layouts/connectors";
import {connectFilters} from "../../../connectors";
import "./index.scss";


const Dropdown = ({name, items, setFilters, search_type}) => {
    const [isOpen, setIsOpen] = useState(true);

    console.log('search_type', search_type, !!items.find(item => item.search_type === search_type));

    return (
        <div className={`dropdown${isOpen ? ' _open' : ''}${!!items.find(item => item.search_type === search_type) ? ' _active' : ''}`}>
            <h3 className="dropdown__title" onClick={() => setIsOpen(!isOpen)}>{name}</h3>
            <CSSTransition
                in={isOpen}
                timeout={350}
                classNames="dropdown__transition"
                unmountOnExit
            >
                <ul className="dropdown__list">
                    {items.map(item =>
                        <li className={`dropdown__item${search_type === item.search_type ? ' _active' : ''}`}
                            key={item.name}
                            onClick={() => setFilters({search_type: item.search_type})}
                        >
                            {item.name}
                        </li>
                    )}
                </ul>
            </CSSTransition>
        </div>
    )
};

export default connectShowFilters(connectFilters(React.memo(Dropdown)));