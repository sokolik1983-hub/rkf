import React, {memo, useState, useEffect} from "react";
import Select, {components} from "react-select";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`disciplines-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const DisciplinesFilter = ({disciplines, discipline_ids, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (disciplines?.length) {
            setOptionsNotInValues(disciplines.filter(option => discipline_ids.indexOf(option.value) === -1));
            setValues(disciplines.filter(option => discipline_ids.indexOf(option.value) !== -1));
        }
    }, [disciplines, discipline_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleDelete = disciplineId => {
        onChange(values.filter(discipline => discipline.value !== disciplineId).map(discipline => discipline.value));
    };

    return (
        <Card className="disciplines-filter">
            <div className="disciplines-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="disciplines-filter__title">Дисциплины</h5>
                <span className={`disciplines-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="disciplines-filter__wrap">
                    <Select
                        id="disciplines-filter"
                        isMulti={true}
                        closeMenuOnSelect={false}
                        options={[...values, ...optionsNotInValues]}
                        defaultMenuIsOpen={true}
                        hideSelectedOptions={false}
                        menuIsOpen={true}
                        controlShouldRenderValue={false}
                        onChange={handleChange}
                        clearable={true}
                        isSearchable
                        classNamePrefix="disciplines-filter"
                        placeholder="Начните вводить дисциплину"
                        noOptionsMessage={() => 'Дисциплина не найдена'}
                        value={values}
                        components={{ Option }}
                        maxMenuHeight={170}
                    />
                    {!!values.length &&
                        <ul className="disciplines-filter__values">
                            {values.map(item =>
                                <li className="disciplines-filter__values-item" key={item.value}>
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

export default memo(DisciplinesFilter);