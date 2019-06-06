import React, {Component} from 'react';
import Select from 'react-select';
import {connect} from "formik";
import {reactSelect} from 'appConfig'

class ReactSelect extends Component {
    static defaultProps = {
        placeholder: "Выбрать...",
    };

    handleChange = (value) => {
        const {name, isMulti} = this.props;
        //console.log('select', value)
        this.props.formik.setFieldValue(name,
            isMulti
                ? value.map(item => item.value)
                : value.value)
    };

    getValue = () => {
        const {options, value, isMulti} = this.props;
        console.log(this.props)
        if (options) {
            return isMulti
                ? options.filter(option => value.indexOf(option.value) >= 0)
                : options.find(option => option.value === value);
        } else {
            return isMulti ? [] : "";
        }
    };

    render() {
        const {
            options,
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
        } = this.props;
        const value = this.getValue();
        return (
            <Select
                components={components}
                id={id}
                isMulti={isMulti}
                closeMenuOnSelect={closeMenuOnSelect}
                styles={reactSelect.defaultTheme}
                className={className}
                name={name}
                value={value}
                options={options}
                placeholder={placeholder}
                disabled={disabled}
                onChange={this.handleChange}
                onBlur={onBlur}
                clearable={clearable}
                defaultValue={defaultValue}
            />
        )
    }
}


export default connect(ReactSelect)