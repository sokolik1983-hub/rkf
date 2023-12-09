import React, {memo, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomFilterSelect from "../../CustomFilterSelect";
import "./index.scss";


const ContestsFilter = ({contests = [], contest_ids, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setOptionsNotInValues(contests.filter(option => contest_ids.indexOf(option.value) === -1));
        setValues(contests.filter(option => contest_ids.indexOf(option.value) !== -1));
    }, [contests, contest_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    return (
        <Card className="contests-filter">
            <div className="contests-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="contests-filter__title">Конкурсы</h5>
                <span className={`contests-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="contests-filter__wrap">
                    <CustomFilterSelect
                        id="contests"
                        placeholder="Начните вводить конкурс"
                        noOptionsMessage="Конкурс не найден"
                        options={[...values, ...optionsNotInValues]}
                        values={values}
                        onChange={handleChange}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(ContestsFilter);