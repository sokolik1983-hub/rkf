import React, {memo, useState, useEffect} from "react";
import Select, {components} from "react-select";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`contests-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const ContestsFilter = ({contests, contest_ids, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (contests?.length) {
            setOptionsNotInValues(contests.filter(option => contest_ids.indexOf(option.value) === -1));
            setValues(contests.filter(option => contest_ids.indexOf(option.value) !== -1));
        }
    }, [contests, contest_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleDelete = contestId => {
        onChange(values.filter(contest => contest.value !== contestId).map(contest => contest.value));
    };

    return (
        <Card className="contests-filter">
            <div className="contests-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="contests-filter__title">Конкурсы</h5>
                <span className={`contests-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="contests__filters"
            >
                <div className="contests-filter__wrap">
                    <Select
                        id="contests-filter"
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
                        classNamePrefix="contests-filter"
                        placeholder="Начните вводить конкурс"
                        noOptionsMessage={() => 'Конкурс не найден'}
                        value={values}
                        components={{ Option }}
                        maxMenuHeight={170}
                    />
                    {!!values.length &&
                        <ul className="contests-filter__values">
                            {values.map(item =>
                                <li className="contests-filter__values-item" key={item.value}>
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

export default memo(ContestsFilter);