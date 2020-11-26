import React, { useState } from "react";
import Card from "../Card";
import { CSSTransition } from "react-transition-group";
import "./index.scss";


const BreedsList = ({ breeds }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Card className="breeds">
            <div className="breeds__head">
                <h4>Породы</h4>
                <div>
                    <span className="breeds__cutoff"></span>
                    <span
                        className={`breeds__chevron ${isOpen ? `_dropdown_open` : ``}`}
                        onClick={() => setIsOpen(!isOpen)}>
                    </span>
                </div>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__breeds-list"
            >
                <ul className="breeds__list">
                    {breeds.map(item =>
                        <li key={item.id}><span className="breeds__list-item">{item.name}</span></li>
                    )}
                </ul>
            </CSSTransition>
        </Card>
    );
};

export default React.memo(BreedsList);