import React, {memo, useState, useEffect} from "react";
import Select, {components} from "react-select";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomCheckbox from "../../Form/CustomCheckbox";
import "./index.scss";


const Option = props => (
    <components.Option {...props}>
        <CustomCheckbox
            id={`breed-groups-${props.value}`}
            label={props.label}
            checked={props.isSelected}
            onChange={() => null}
        />
    </components.Option>
);

const BreedGroupsFilter = ({breedGroups, breedGroupIds, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (breedGroups?.length) {
            setOptionsNotInValues(breedGroups.filter(option => breedGroupIds?.indexOf(option.value) === -1));
            setValues(breedGroups.filter(option => breedGroupIds?.indexOf(option.value) !== -1));
        }
    }, [breedGroups, breedGroupIds]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    const handleDelete = breedId => {
        onChange(values.filter(breed => breed.value !== breedId).map(breed => breed.value));
    };

    return (
        <Card className="breed-groups-filter">
            <div className="breed-groups-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="breed-groups-filter__title">Группы пород</h5>
                <span className={`breed-groups-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="breed-groups__filters"
            >
                <div className="breed-groups-filter__wrap">
                    <Select
                        id="breed-groups-filter"
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
                        classNamePrefix="breed-groups-filter"
                        placeholder="Начните вводить группу"
                        noOptionsMessage={() => 'Группа не найдена'}
                        value={values}
                        components={{Option}}
                        maxMenuHeight={170}
                    />
                    {!!values.length &&
                        <ul className="breed-groups-filter__values">
                            {values.map(item =>
                                <li className="breed-groups-filter__values-item" key={item.value}>
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

export default memo(BreedGroupsFilter);