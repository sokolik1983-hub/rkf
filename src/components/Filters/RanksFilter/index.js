import React, {memo, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import Card from "../../Card";
import CustomFilterSelect from "../../CustomFilterSelect";
import "./index.scss";


const RanksFilter = ({ranks = [], rank_ids, onChange}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        setOptionsNotInValues(ranks.filter(option => rank_ids.indexOf(option.value) === -1));
        setValues(ranks.filter(option => rank_ids.indexOf(option.value) !== -1));
    }, [ranks, rank_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    return (
        <Card className="ranks-filter">
            <div className="ranks-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="ranks-filter__title">Ранги</h5>
                <span className={`ranks-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            <CSSTransition
                in={isOpen}
                timeout={50}
                unmountOnExit
                classNames="dropdown__filters"
            >
                <div className="ranks-filter__wrap">
                    <CustomFilterSelect
                        id="ranks"
                        placeholder="Начните вводить ранг"
                        noOptionsMessage="Ранг не найден"
                        options={[...values, ...optionsNotInValues]}
                        values={values}
                        onChange={handleChange}
                    />
                </div>
            </CSSTransition>
        </Card>
    )
};

export default memo(RanksFilter);