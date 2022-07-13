import React, {memo, useState} from 'react';
import {CSSTransition} from "react-transition-group";
import {Link} from "react-router-dom";
import Card from "../../../Card";

import "./index.scss";


const OrganizationsFilter = ({onChange, startOpen = true}) => {
    const [activeType, setActiveType] = useState('0');
    const [isOpen, setIsOpen] = useState(startOpen);

    const handleClick = e => {
        e.preventDefault();
        setActiveType(e.target.name);
        onChange(e.target.name);
    };

    return (
        <Card className="organizations-filter">
            <div className="organizations-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="organizations-filter__title">Организации</h5>
                <span className={`organizations-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="organizations-filter__wrap">
                    <ul className="ListFilter">
                        <li className={activeType === '0' && 'active'}>
                            <Link
                                className={activeType === '0' && '_active'}
                                to="/"
                                name="0"
                                onClick={handleClick}
                            >
                                Все
                            </Link>
                        </li>
                        <li className={activeType === '3' && 'active'}>
                            <Link
                                to="/"
                                name="3"
                                onClick={handleClick}
                                className={activeType === '3' && '_active'}
                            >
                                Клубы
                            </Link>
                        </li>
                        <li className={activeType === '4' && 'active'}>
                            <Link
                                to="/"
                                name="4"
                                onClick={handleClick}
                                className={activeType === '4' && '_active'}
                            >
                                Питомники
                            </Link>
                        </li>
                    </ul>
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(OrganizationsFilter);
