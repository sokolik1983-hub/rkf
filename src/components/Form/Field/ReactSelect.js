import React, {Component} from 'react';
import Select from 'react-select';
import {connect, getIn} from "formik";
import {defaultReactSelectStyles} from 'appConfig'
export const NoOptionsMessage = () => {
  return ('Нет опций для выбора');
};
class ReactSelect extends Component {
    static defaultProps = {
        placeholder: "Выбрать...",
    };

    handleChange = (value) => {
        const {name} = this.props;
        this.props.formik.setFieldValue(name, value.value)
    };

     getValue = () => {
        const {options, formik, isMulti, name} = this.props;

        const value = getIn(formik.values, name);
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
                components={{...components, NoOptionsMessage}}
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
                onChange={this.handleChange}
                onBlur={onBlur}
                clearable={clearable}
                defaultValue={defaultValue}
                classNamePrefix={"my-react-select-prefix"}
            />
        )
    }
}




export default connect(ReactSelect)