import React from 'react';
import Select from 'react-select';
import {connect, getIn} from "formik";
import {useDictionary} from 'apps/Dictionaries/hooks'
import {defaultReactSelectStyles} from '../config'

import createFilterOptions from "react-select-fast-filter-options";
import MenuList from './ReactSelectMenuList'

const NoOptionsMessage = () => {
    return ('Нет опций для выбора');
};


function ReactSelectDict(props) {
    const {
        dictName,
        formik,
        //options,
        id,
        name,
        className,
        placeholder,
        onBlur,
        disabled,
        clearable,
        defaultValue,
        isMulti,
        closeMenuOnSelect,
        components
    } = props;

    const {dictionary} = useDictionary(dictName);
    const {options} = dictionary;

    const filterOptions = createFilterOptions({
        options
    });


    const handleChange = (value) => {
        formik.setFieldValue(name,
            isMulti
                ? value.map(item => item.value)
                : value.value)
    };

    const getValue = () => {
        const value = getIn(formik.values, name);
        if (value && options) {
            return isMulti
                ? options.filter(option => value.indexOf(option.value) >= 0)
                : options.find(option => option.value === value);
        } else {
            return isMulti ? [] : "";
        }
    };


    //console.log('ReactSelectAsync.render()', this.props)
    const value = getValue();
    return (
        <Select
            filterOptions={filterOptions}
            components={{NoOptionsMessage, MenuList}}
            id={id}
            isMulti={isMulti}
            closeMenuOnSelect={closeMenuOnSelect}
            styles={defaultReactSelectStyles.defaultTheme}
            className={className}
            name={name}
            value={value}
            options={options}
            placeholder={placeholder}
            isDisabled={disabled}
            onChange={handleChange}
            onBlur={onBlur}
            clearable={clearable}
            defaultValue={defaultValue}
        />
    )
}


export default connect(ReactSelectDict)