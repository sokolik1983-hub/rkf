import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import CustomCheckbox from "../../Form/CustomCheckbox";
import { CSSTransition } from "react-transition-group";
import Card from "../../Card";
import "./index.scss";


const Option = props => {
    return (
        <components.Option {...props}>
        <CustomCheckbox
            id={`regions-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
    )
};

const RegionFilter = ({ regions, onChange, region_ids}) => {

    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(!regions.length ? false : true);

    useEffect(() => {
        if (regions?.length) {
            setOptionsNotInValues(regions.filter(option => region_ids?.indexOf(option.value) === -1));
            setValues(regions.filter(option => region_ids?.indexOf(option.value) !== -1));
        }
    }, [regions, region_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };
    const handleDelete = regionId => {
        onChange(values.filter(region => region.value !== regionId).map(region => region.value));
    };

    return (
        <Card className="regions-filter">
            <div className="regions-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="regions-filter__title">Регионы</h5>
                <span className={`regions-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="regions-filter__wrap">
                    <Select
                        id="regions-filter"
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
                        classNamePrefix="regions-filter"
                        placeholder="Начните вводить регион"
                        noOptionsMessage={() => 'Регион не найден'}
                        value={values}
                        components={{ Option }}
                        maxMenuHeight={170}
                    />
                    {!!values.length &&
                        <ul className="regions-filter__values">
                            {values.map(item => {
                                return (
                                    <li className="regions-filter__values-item" key={item.value}>
                                        <span>{item.label}</span>
                                        <button type="button" onClick={() => handleDelete(item.value)}>✕</button>
                                    </li>
                                 )
                                }
                            )}
                        </ul>
                    }
                </div>
            </CSSTransition>
        </Card>
    )
};

export default React.memo(RegionFilter);