import React, {Component} from 'react';
import Select from 'react-select';
import {connect} from "formik";
import {reactSelect} from 'appConfig'

class ReactSelect extends Component {
    static defaultProps = {
        placeholder: "Выбрать...",
    };

    handleChange = (value) => {
        const {name} = this.props;
        this.props.formik.setFieldValue(name, value.value)
    };

    getValue = () => {
        const {options, value} = this.props;
        const optionEl = options.filter(option => option.value === value);
        return optionEl.length === 1 ? optionEl[0] : value
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

        } = this.props;
        const value = this.getValue();
        return (
            <Select
                id={id}
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