import React, {memo, useState} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const ClassificationsFilter = ({events, event_id, onChange}) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <Card className="events-filter">
            <div className="events-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="events-filter__title">Мероприятия</h5>
                <span className={`events-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="events-filter__wrap">
                    {events.length ?
                        <ul className="events-filter__list">
                            {events.map(option =>
                                <li className="events-filter__item" key={`event-${option.value}`}>
                                    <CustomCheckbox
                                        id={`event-${option.value}`}
                                        label={option.label}
                                        checked={event_id === option.value}
                                        onChange={() => onChange(event_id === option.value ? 0 : option.value)}
                                    />
                                </li>
                            )}
                        </ul> :
                        <p className="events-filter__no-options">Мероприятий не найдено</p>
                    }
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(ClassificationsFilter);