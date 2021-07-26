import React, {memo, useEffect, useState} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomFilterSelect from "../../CustomFilterSelect";
import "./index.scss";


const BreedsFilter = ({breeds, breed_ids, onChange}) => {
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

    return (
        <Card className="breeds-filter">
            <div className="breeds-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="breeds-filter__title">Породы</h5>
                <span className={`breeds-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="breeds-filter__wrap">
                    <CustomFilterSelect
                        id="breeds"
                        placeholder="Начните вводить породу"
                        noOptionsMessage="Порода не найдена"
                        options={[...values, ...optionsNotInValues]}
                        values={values}
                        onChange={handleChange}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(BreedsFilter);