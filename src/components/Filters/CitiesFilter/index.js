import React, {memo, useState, useEffect} from "react";
import {CSSTransition} from "react-transition-group";
import Loading from "../../Loading";
import Card from "../../Card";
import CustomFilterSelect from "../../CustomFilterSelect";
import "./index.scss";


const CitiesFilter = ({cities, city_ids, onChange, loading = false, withOpenButton = true, startOpen = true}) => {
    const [values, setValues] = useState([]);
    const [optionsNotInValues, setOptionsNotInValues] = useState([]);
    const [isOpen, setIsOpen] = useState(startOpen);

    useEffect(() => {
        setOptionsNotInValues(cities.filter(option => city_ids.indexOf(option.value) === -1));
        setValues(cities.filter(option => city_ids.indexOf(option.value) !== -1));
    }, [cities, city_ids]);

    const handleChange = options => {
        onChange(options.map(option => option.value));
    };

    return (
        <Card className="cities-filter">
            <div className="cities-filter__head" onClick={() => withOpenButton ? setIsOpen(!isOpen) : null}>
                <h5 className={`cities-filter__title${withOpenButton ? ' _chevron' : ''}`}>Города</h5>
                {withOpenButton && <span className={`cities-filter__chevron${isOpen ? ' _dropdown_open' : ''}`}/>}
            </div>
            {loading ?
                <Loading centered={false}/> :
                <CSSTransition
                    in={isOpen}
                    timeout={50}
                    unmountOnExit
                    classNames="dropdown__filters"
                >
                    <div className="cities-filter__wrap">
                        <CustomFilterSelect
                            id="cities"
                            placeholder="Начните вводить город"
                            noOptionsMessage="Город не найден"
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

export default memo(CitiesFilter);