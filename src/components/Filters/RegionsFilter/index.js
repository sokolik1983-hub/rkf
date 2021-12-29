import React, {memo, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import Loading from "../../Loading";
import Card from "../../Card";
import CustomFilterSelect from "../../CustomFilterSelect";
import "./index.scss";


const RegionsFilter = ({regions = [], region_ids, onChange, loading = false, startOpen = true}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(startOpen);


    useEffect(() => {
        setOptionsNotInValues(regions.filter(option => region_ids?.indexOf(option.value) === -1));
        setValues(regions.filter(option => region_ids?.indexOf(option.value) !== -1));
    }, [regions, region_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    return (
        <Card className="regions-filter">
            <div className="regions-filter__head" onClick={() => setIsOpen(!isOpen)}>
                <h5 className="regions-filter__title">Регионы</h5>
                <span className={`regions-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>
            </div>
            {loading ?
                <Loading centered={false}/> :
                <CSSTransition
                    in={isOpen}
                    timeout={50}
                    unmountOnExit
                    classNames="dropdown__filters"
                >
                    <div className="regions-filter__wrap">
                        <CustomFilterSelect
                            id="regions"
                            placeholder="Начните вводить регион"
                            noOptionsMessage="Регион не найден"
                            options={[...values, ...optionsNotInValues]}
                            values={values}
                            onChange={handleChange}
                        />
                    </div>
                </CSSTransition>
            }
        </Card>
    )
};

export default memo(RegionsFilter);