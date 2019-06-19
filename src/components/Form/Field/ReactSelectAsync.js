import React, {Component} from 'react';
import {string} from 'prop-types'
import Select from 'react-select';
import {connect, getIn} from "formik";
import {defaultReactSelectStyles} from 'appConfig'
import {getHeaders} from "utils/request";

const NoOptionsMessage = () => {
    return ('Нет опций для выбора');
};


class ReactSelectAsync extends Component {
    static propTypes = {
        optionsEndpoint: string.isRequired
    };
    static defaultProps = {
        placeholder: "Выбрать...",
    };
    state = {
        options: [],
    };

    loadOptions = () => {
        fetch(this.props.optionsEndpoint, {
            mode: "cors",
            headers: getHeaders(),
        })
            .then(response => response.json())
            .then(data => {
                this.processRequest(data)
            })
            .catch(error => this.processErrors(error))

        // fetch(this.props.optionsEndpoint)
        //     .then(
        //         result => this.processRequest(result),
        //         errors => this.processRequestErrors(errors)
        //     )
    }

    processRequest = result => {
        const options = this.convertDataToOptions(result)
        this.setState({options})
    };
    processErrors = errors => {
        console.log('processRequestErrors', errors)
    };

    convertDataToOptions = (options) => {
        const {convertDataToOptions} = this.props;
        if (convertDataToOptions) {
            convertDataToOptions(options);
            return
        }
        return options.map(option => ({
            label: option.name,
            value: option.id
        }))
    };

    handleChange = (value) => {
        const {name, isMulti} = this.props;
        this.props.formik.setFieldValue(name,
            isMulti
                ? value.map(item => item.value)
                : value.value)
    };

    getValue = () => {
        const {formik, isMulti, name} = this.props;
        const {options} = this.state;
        const value = getIn(formik.values, name);
        if (options) {
            return isMulti
                ? options.filter(option => value.indexOf(option.value) >= 0)
                : options.find(option => option.value === value);
        } else {
            return isMulti ? [] : "";
        }
    };

    componentDidMount() {
        this.loadOptions()
    }

    render() {
        const {
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
                options={this.state.options}
                placeholder={placeholder}
                isDisabled={disabled}
                onChange={this.handleChange}
                onBlur={onBlur}
                clearable={clearable}
                defaultValue={defaultValue}
            />
        )
    }
}


export default connect(ReactSelectAsync)