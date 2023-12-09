import React from 'react';
import {Creatable} from 'react-select';
import {connect, getIn} from "formik";
import {defaultReactSelectStyles} from '../config'

export const NoOptionsMessage = () => {
    return ('Нет опций для выбора');
};

function ReactSelectCreatable({
                formik,
                options,
                id,
                name,
                className,
                placeholder,
                disabled,
                clearable,
                defaultValue,
                onChange,
                closeMenuOnSelect,
                components
            }) {
    const handleChange = (value) => {
        formik.setFieldValue(name, value.label);
        onChange && onChange(value.label);
    }
    const onBlur = e => {
        let x = e && e.currentTarget && e.currentTarget.value;
        let v = getIn(formik.values, name);
        x && (x !== v) && formik.setFieldValue(name, x.toUpperCase());
        formik.setFieldTouched(name);
    }
    const getValue = () => {
        const value = getIn(formik.values, name);
        if (options) {
            let val = options.find(option => option.label === value);
            let id = options.reduce((a, b) => a.value > b.value ? a : b, {value:0});
            return val ? val : { value: id.value + 1, label: value };
        } else {
            return "";
        }
    };
    return (
        <Creatable
            components={{...components, NoOptionsMessage}}
            id={id}
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
            formatCreateLabel={inputValue => `Добавить "${inputValue}" как код стороннего клуба`}
        />
    )
}


export default connect(ReactSelectCreatable)
