import React, {memo, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomFilterSelect from "../../CustomFilterSelect";
import "./index.scss";


const TypeFilter = ({types = [], type_ids, onChange}) => {
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
        <Card className="types-filter">
            <div className="types-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="types-filter__title">Тип выставки</h5>
                <span className={`types-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="types-filter__wrap">
                    <CustomFilterSelect
                        id="types"
                        placeholder="Начните вводить тип"
                        noOptionsMessage="Тип выставки не найден"
                        options={[...values, ...optionsNotInValues]}
                        values={values}
                        onChange={handleChange}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(TypeFilter);