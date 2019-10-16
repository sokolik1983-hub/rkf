import React, {Component} from 'react';
import {string} from 'prop-types'
import Select from 'react-select';
import {connect, getIn} from "formik";
import {defaultReactSelectStyles} from '../config'
import {getHeaders} from "utils/request";
import {isDevEnv} from "utils/index";

import createFilterOptions from "react-select-fast-filter-options";
import MenuList from './ReactSelectMenuList'

const NoOptionsMessage = () => {
    return ('Нет опций для выбора');
};

// TODO Implement this: https://github.com/bvaughn/react-virtualized-select

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

    shouldComponentUpdate(nextProps, nextState) {
        const currentValue = getIn(this.props.formik.values, this.props.name);
        const nextValue = getIn(nextProps.formik.values, this.props.name);
        return currentValue !== nextValue || this.state.options !== nextState.options;
    }

    filterOptions = createFilterOptions({
        options:this.state.options
    });

    loadOptions = () => {
        const options = isDevEnv() ?
            {
                mode: "cors",
                headers: getHeaders(),
            } :
            {
                headers: getHeaders(),
            };
        fetch(this.props.optionsEndpoint, options)
            .then(response => response.json())
            .then(data => {
                this.processRequest(data.result)
            })
            .catch(error => this.processErrors(error))
    };

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
        if (value && options) {
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
        //console.log('ReactSelectAsync.render()', this.props)
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
            closeMenuOnSelect
        } = this.props;
        const value = this.getValue();
        return (
            <Select
                filterOptions={this.filterOptions}
                components={{NoOptionsMessage, MenuList}}
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