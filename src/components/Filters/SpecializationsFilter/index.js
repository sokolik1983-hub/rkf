import React, {memo, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomFilterSelect from "../../CustomFilterSelect";
import "./index.scss";


const SpecializationsFilter = ({types = [], type_ids, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setOptionsNotInValues(types.filter(option => type_ids.indexOf(option.value) === -1));
        setValues(types.filter(option => type_ids.indexOf(option.value) !== -1));
    }, [types, type_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    return (
        <Card className="specializations-filter">
            <div className="specializations-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="specializations-filter__title">Специализация</h5>
                <span className={`specializations-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="specializations-filter__wrap">
                    <CustomFilterSelect
                        id="specializations"
                        placeholder="Начните вводить специализацию"
                        noOptionsMessage="Специализация не найдена"
                        options={[...values, ...optionsNotInValues]}
                        values={values}
                        onChange={handleChange}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(SpecializationsFilter);