import React, {useState} from "react";
import {CSSTransition} from "react-transition-group";
import DropdownItem from "./DropdownItem";
import "./index.scss";


const Dropdown = ({name, items, filtersValue}) => {
    const [isOpen, setIsOpen] = useState(true);

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
                        <DropdownItem key={item.name} {...item} filtersValue={filtersValue} />
                    )}
                </ul>
            </CSSTransition>
        </div>
    )
};

export default Dropdown;