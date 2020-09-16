import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import CustomCheckbox from "../../Form/CustomCheckbox";
import { CSSTransition } from "react-transition-group";
import Card from "../../Card";
import "./index.scss";


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`breeds-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const BreedsFilter = ({ breeds, breed_ids, onChange, isExhibitions }) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (breeds.length) {
            setOptionsNotInValues(breeds.filter(option => breed_ids.indexOf(option.value) === -1));
            setValues(breeds.filter(option => breed_ids.indexOf(option.value) !== -1));
        }
    }, [breeds, breed_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleDelete = breedId => {
        onChange(values.filter(breed => breed.value !== breedId).map(breed => breed.value));
    };

    return (
        <Card className="breeds-filter">
            <div className="breeds-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="breeds-filter__title">Породы</h5>
                <span className={`breeds-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={350}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className={isExhibitions ? `` : `_title_line`}>
                    <Select
                        id="breeds-filter"
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
                        classNamePrefix="breeds-filter"
                        placeholder="Начните вводить породу"
                        noOptionsMessage={() => 'Порода не найдена'}
                        value={values}
                        components={{ Option }}
                        maxMenuHeight={isExhibitions && 170}
                    />
                    {!!values.length &&
                        <ul className="breeds-filter__values">
                            {values.map(item =>
                                <li className="breeds-filter__values-item" key={item.value}>
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

export default React.memo(BreedsFilter);