import React, {memo, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomFilterSelect from "../../CustomFilterSelect";
import "./index.scss";


const DisciplinesFilter = ({disciplines = [], discipline_ids, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setOptionsNotInValues(disciplines.filter(option => discipline_ids.indexOf(option.value) === -1));
        setValues(disciplines.filter(option => discipline_ids.indexOf(option.value) !== -1));
    }, [disciplines, discipline_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    return (
        <Card className="disciplines-filter">
            <div className="disciplines-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="disciplines-filter__title">Дисциплины</h5>
                <span className={`disciplines-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="disciplines-filter__wrap">
                    <CustomFilterSelect
                        id="disciplines"
                        placeholder="Начните вводить дисциплину"
                        noOptionsMessage="Дисциплина не найдена"
                        options={[...values, ...optionsNotInValues]}
                        values={values}
                        onChange={handleChange}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(DisciplinesFilter);