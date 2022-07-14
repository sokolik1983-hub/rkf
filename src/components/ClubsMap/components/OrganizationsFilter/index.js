import React, {memo, useState} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../../Card";

import "./index.scss";


const OrganizationsFilter = ({onChange, startOpen = true}) => {
    const [activeType, setActiveType] = useState(0);
    const [isOpen, setIsOpen] = useState(startOpen);

    const handleClick = (userType) => {
        setActiveType(userType);
        onChange(userType);
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
                        <li className={activeType === 0 && 'active'}>
                            <span
                                className={activeType === 0 && '_active'}
                                onClick={()=>handleClick(0)}
                            >
                                Все
                            </span>
                        </li>
                        <li className={activeType === 3 && 'active'}>
                            <span
                                className={activeType === 3 && '_active'}
                                onClick={()=>handleClick(3)}
                            >
                                Клубы
                            </span>
                        </li>
                        <li className={activeType === 4 && 'active'}>
                            <span
                                className={activeType === 4 && '_active'}
                                onClick={()=>handleClick(4)}
                            >
                                Питомники
                            </span>
                        </li>
                    </ul>
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(OrganizationsFilter);
