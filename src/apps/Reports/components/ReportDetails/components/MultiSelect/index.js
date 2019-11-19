import React from "react";
import Select from "react-select";
import './styles.scss';

const multiSelect = ({options, property, isMulti = false} = {}) => {
    const placeholder = property === 'breed' ? options[0].label :
                        property === 'judge-country' ? 'Выберите страну' :
                        property === 'class' ? 'Выберите класс' :
                        property === 'score' ? 'Выберите оценку' :
                        'Выберите группу';
    const MultiSelect = ({value, onValue}) => (
            <Select
                defaultValue={value.length ? value : []}
                isMulti={isMulti}
                name="groups"
                placeholder={placeholder}
                options={options}
                onChange={onValue}
                className="basic-multi-select"
                classNamePrefix="select"
            />
    );

    return MultiSelect;
};

export default multiSelect;