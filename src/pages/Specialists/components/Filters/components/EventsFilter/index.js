import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import CustomCheckbox from "components/Form/CustomCheckbox";
import { CSSTransition } from "react-transition-group";
import Card from "components/Card";
import "./index.scss";


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`events-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const EventsFilter = ({ events, event_ids, onChange, is_club_link }) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(is_club_link && !events.length ? false : true);

    useEffect(() => {
        if (events?.length) {
            setOptionsNotInValues(events.filter(option => event_ids.indexOf(option.value) === -1));
            setValues(events.filter(option => event_ids.indexOf(option.value) !== -1));
        }
    }, [events, event_ids]);

    function compare(a, b) {
        let comparison = 0;
        if (a.value > b.value) {
            comparison = 1;
        } else if (a.value < b.value) {
            comparison = -1;
        }
        return comparison;
    }

    return (
        <Card className="events-filter">
            <div className="events-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="events-filter__title">Мероприятия</h5>
                <span className={`events-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="events-filter__wrap">
                    <Select
                        id="events-filter"
                        isMulti={false}
                        closeMenuOnSelect={false}
                        options={[...values, ...optionsNotInValues].sort(compare)}
                        defaultMenuIsOpen={true}
                        hideSelectedOptions={false}
                        menuIsOpen={true}
                        controlShouldRenderValue={false}
                        onChange={({ value }) => onChange(value === event_ids[0] ? [] : [value])}
                        clearable={true}
                        isSearchable={false}
                        classNamePrefix="events-filter"
                        placeholder="Начните вводить мероприятие"
                        noOptionsMessage={() => 'Мероприятие не найдено'}
                        value={values}
                        components={{ Option }}
                        maxMenuHeight={170}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default React.memo(EventsFilter);