import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import CustomCheckbox from "components/Form/CustomCheckbox";
import { CSSTransition } from "react-transition-group";
import Card from "components/Card";
import Loading from "components/Loading";
import BreedsFilter from "./BreedsFilter";
import { setFiltersToUrl } from "../../../../utils";

import "./index.scss";


const Option = props => {
    return (
        <components.Option {...props}>
            <CustomCheckbox
                id={`breed-groups-${props.value}`}
                label={props.label}
                checked={props.isSelected}
                onChange={() => null}
            />
        </components.Option>
    )
};

const BreedGroupsFilter = ({ breedGroups, onChange, breed_group_ids, setNeedOpen, breeds, needOpen, filters, loading }) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        if (breedGroups?.length) {
            setOptionsNotInValues(breedGroups.filter(option => breed_group_ids?.indexOf(option.value) === -1));
            setValues(breedGroups.filter(option => breed_group_ids?.indexOf(option.value) !== -1));
        }
    }, [breedGroups, breed_group_ids]);

    const handleChange = options => {
        filters.BreedGroupIds.length && setFiltersToUrl({ BreedGroupIds: [] });
        onChange(options.map(option => option.value));
    };
    const handleDelete = regionId => {
        onChange(values.filter(region => region.value !== regionId).map(region => region.value));
    };

    setNeedOpen(values.length > 0)

    return (
        <Card className="breed-groups-filter">
            <div className="breed-groups-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="breed-groups-filter__title">Группы пород</h5>
                <span className={`breed-groups-filter__chevron ${isOpen ? `_dropdown_open` : ``}`}></span>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
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
                        components={{ Option }}
                        maxMenuHeight={170}
                    />
                    {!!values.length &&
                        <ul className="breed-groups-filter__values">
                            {values.map(item => {
                                return (
                                    <li className="breed-groups-filter__values-item" key={item.value}>
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
            {loading ? <Loading centered={false} /> : <BreedsFilter
                breeds={breeds}
                breed_ids={filters.BreedIds}
                onChange={filter => setFiltersToUrl({ BreedIds: filter })}
                needOpen={needOpen}
            />}
        </Card>
    )
};

export default React.memo(BreedGroupsFilter);