import React, {memo, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const ClassificationsFilter = ({events, event_ids, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (events?.length) {
            setOptionsNotInValues(events.filter(option => event_ids.indexOf(option.value) === -1));
            setValues(events.filter(option => event_ids.indexOf(option.value) !== -1));
        }
    }, [events, event_ids]);

    const handleChange = ({value}) => {
        onChange(value === event_ids[0] ? [] : [value])
    };

    return (
        <Card className="events-filter">
            <div className="events-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="events-filter__title">Мероприятия</h5>
                <span className={`events-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="events__filters"
            >
                <div className="events-filter__wrap">
                    {[...values, ...optionsNotInValues].length ?
                        <ul className="events-filter__list">
                            {[...values, ...optionsNotInValues].map(option =>
                                <li className="events-filter__item" key={`event-${option.value}`}>
                                    <CustomCheckbox
                                        id={`event-${option.value}`}
                                        label={option.label}
                                        checked={!!values.find(value => value.value === option.value)}
                                        onChange={() => handleChange(option)}
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