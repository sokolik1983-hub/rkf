import React from "react";
import Card from "../Card";
import { CSSTransition } from "react-transition-group";
import useStickyState from "../../utils/useStickyState";
import "./index.scss";


const BreedsList = ({ breeds }) => {
    const [isOpen, setIsOpen] = useStickyState(true, "is_breeds_open");

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
                        <li className="breeds__list-item" key={item.id}>{item.name}</li>
                    )}
                </ul>
            </CSSTransition>
        </Card>
    );
};

export default React.memo(BreedsList);