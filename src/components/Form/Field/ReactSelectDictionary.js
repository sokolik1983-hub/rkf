import React, {Component} from 'react';
import {compose} from "redux"
import {string} from 'prop-types'
import Select, {createFilter} from 'react-select';
import {connect, getIn} from "formik";
import {defaultReactSelectStyles} from 'appConfig'
import createFilterOptions from "react-select-fast-filter-options";
import {connectDictionary} from 'apps/Dictionaries/connectors'
import {FixedSizeList as List} from "react-window";

const NoOptionsMessage = () => {
    return ('Нет опций для выбора');
};


const height = 35

class MenuList extends Component {
    render() {
        const {options, children, maxHeight, getValue} = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;

        return (
            <List
                height={maxHeight}
                itemCount={children.length}
                itemSize={height}
                initialScrollOffset={initialOffset}
            >
                {({index, style}) => <div style={style}>{children[index]}</div>}
            </List>
        );
    }
}

const CustomOption = ({innerRef, innerProps}) => (
    <div ref={innerRef} {...innerProps} />)

class ReactSelectDictionary extends Component {
    static defaultProps = {
        placeholder: "Выбрать...",
        options: [],
    };

    state = {
        options: []
    };

    // filterOptions = createFilterOptions({
    //     options: this.state.options
    // });

    componentDidMount() {
        const {dictName, getDict} = this.props;
        if (!this.isDictLoaded(this.props)) {
            getDict(dictName)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (
            !this.isDictLoaded(prevProps) &&
            this.isDictLoaded(this.props)) {
            this.setState({options: this.convertDataToOptions()})
        }
    }

    isDictLoaded = (props) => props.dict.loaded;


    convertDataToOptions = () => {
        const {dict, convertDataToOptions} = this.props;
        if (convertDataToOptions) {
            return convertDataToOptions(dict);
        }
        return dict.dictIndex.map(id => ({
            label: dict.dict[id.toString()].name,
            value: id
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
        const {formik, isMulti, name, dict} = this.props;
        const {options} = dict;
        const value = getIn(formik.values, name);
        if (options) {
            return isMulti
                ? options.filter(option => value.indexOf(option.value) >= 0)
                : options.find(option => option.value === value);
        } else {
            return isMulti ? [] : "";
        }
    };

    filterOptions = createFilterOptions({
        options: this.state.options
    });

    render() {
        const {
            dict,
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
                //filterOptions={this.filterOptions}
                components={{...components, NoOptionsMessage, MenuList}}
                id={id}
                isMulti={isMulti}
                closeMenuOnSelect={closeMenuOnSelect}
                styles={defaultReactSelectStyles.defaultTheme}
                className={className}
                name={name}
                value={value}
                options={dict.options}
                placeholder={placeholder}
                isDisabled={disabled}
                onChange={this.handleChange}
                onBlur={onBlur}
                clearable={true}
                defaultValue={defaultValue}
                filterOption={createFilter({ignoreAccents: false})}
                filterOptions={this.filterOptions}
            />
        )
    }
}

const connectedReactSelectDictionary = connectDictionary(ReactSelectDictionary)
export default connect(connectedReactSelectDictionary)