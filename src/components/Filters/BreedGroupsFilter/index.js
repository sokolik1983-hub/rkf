import React, {memo, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomFilterSelect from "../../CustomFilterSelect";
import "./index.scss";


const BreedGroupsFilter = ({breedGroups = [], breedGroupIds, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setOptionsNotInValues(breedGroups.filter(option => breedGroupIds?.indexOf(option.value) === -1));
        setValues(breedGroups.filter(option => breedGroupIds?.indexOf(option.value) !== -1));
    }, [breedGroups, breedGroupIds]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    return (
        <Card className="breed-groups-filter">
            <div className="breed-groups-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="breed-groups-filter__title">Группы пород</h5>
                <span className={`breed-groups-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="breed-groups-filter__wrap">
                    <CustomFilterSelect
                        id="breed-groups"
                        placeholder="Начните вводить группу"
                        noOptionsMessage="Группа не найдена"
                        options={[...values, ...optionsNotInValues]}
                        values={values}
                        onChange={handleChange}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(BreedGroupsFilter);