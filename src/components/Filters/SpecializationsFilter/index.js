import React, {memo, useState, useEffect} from "react";
import Select, {components} from "react-select";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`types-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const SpecializationsFilter = ({types, type_ids, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (types?.length) {
            setOptionsNotInValues(types.filter(option => type_ids.indexOf(option.value) === -1));
            setValues(types.filter(option => type_ids.indexOf(option.value) !== -1));
        }
    }, [types, type_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleDelete = typeId => {
        onChange(values.filter(type => type.value !== typeId).map(type => type.value));
    };

    return (
        <Card className="types-filter">
            <div className="types-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="types-filter__title">Специализация</h5>
                <span className={`types-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="types__filters"
            >
                <div className="types-filter__wrap">
                    <Select
                        id="types-filter"
                        isMulti={true}
                        closeMenuOnSelect={false}
                        options={[...values, ...optionsNotInValues]}
                        defaultMenuIsOpen={true}
                        hideSelectedOptions={false}
                        menuIsOpen={true}
                        controlShouldRenderValue={false}
                        onChange={handleChange}
                        clearable={true}
                        isSearchable={false}
                        classNamePrefix="types-filter"
                        placeholder="Начните вводить специализацию"
                        noOptionsMessage={() => 'Специализация не найдена'}
                        value={values}
                        components={{Option}}
                        maxMenuHeight={170}
                    />
                    {!!values.length &&
                        <ul className="types-filter__values">
                            {values.map(item =>
                                <li className="types-filter__values-item" key={item.value}>
                                    <span>{item.label}</span>
                                    <button type="button" onClick={() => handleDelete(item.value)}>✕</button>
                                </li>
                            )}
                        </ul>
                    }
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(SpecializationsFilter);