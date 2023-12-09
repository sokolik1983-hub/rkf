import React from 'react';
import Select from 'react-select';
import {connect, getIn} from "formik";
import {defaultReactSelectStyles} from '../config'

export const NoOptionsMessage = () => {
    return ('Нет опций для выбора');
};

function ReactSelect({
                formik,
                options,
                id,
                name,
                className,
                placeholder,
                disabled,
                clearable,
                defaultValue,
                isMulti,
                onChange,
                closeMenuOnSelect,
                components
            }) {
    const handleChange = (value) => {
        formik.setFieldValue(name, value.value);
        onChange && onChange(value);
    }
    const onBlur = () => formik.setFieldTouched(name)
    const getValue = () => {
        const value = getIn(formik.values, name);
        if (options) {
            return isMulti
                ? options.filter(option => value.indexOf(option.value) >= 0)
                : options.find(option => option.value === value);
        } else {
            return isMulti ? [] : "";
        }
    };
    return (
        <Select
            components={{...components, NoOptionsMessage}}
            id={id}
            isMulti={isMulti}
            closeMenuOnSelect={closeMenuOnSelect}
            styles={defaultReactSelectStyles.defaultTheme}
            className={className}
            name={name}
            value={getValue()}
            options={options}
            placeholder={placeholder}
            isDisabled={disabled}
            onChange={handleChange}
            onBlur={onBlur}
            clearable={clearable}
            defaultValue={defaultValue}
            isSearchable
            classNamePrefix="RSInput"
        />
    )
}


export default connect(ReactSelect)
