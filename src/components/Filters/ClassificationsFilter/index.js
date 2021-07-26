import React, {memo, useState, useEffect} from "react";
import Select, {components} from "react-select";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
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
                    <Select
                        id="events-filter"
                        isMulti={false}
                        closeMenuOnSelect={false}
                        options={[...values, ...optionsNotInValues]}
                        defaultMenuIsOpen={true}
                        hideSelectedOptions={false}
                        menuIsOpen={true}
                        controlShouldRenderValue={false}
                        onChange={handleChange}
                        clearable={true}
                        isSearchable
                        classNamePrefix="events-filter"
                        placeholder="Начните вводить мероприятие"
                        noOptionsMessage={() => 'Мероприятий не найдено'}
                        value={values}
                        components={{Option}}
                        maxMenuHeight={170}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(ClassificationsFilter);