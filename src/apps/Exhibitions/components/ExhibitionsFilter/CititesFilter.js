import React, {useContext} from "react";
import Select, {components} from "react-select";
import {defaultReactSelectStyles} from "appConfig";
import {ExhibitionsFilterContext} from 'apps/Exhibitions/context'
import {getValues} from 'shared/reactSelect'


const Option = props => {
    return (
        <div>
            <components.Option {...props} >
                <span/>{props.label}
            </components.Option>
        </div>
    );
};


const style = {
    container: (styles, {isFocused}) => ({
        ...styles,
        outline: isFocused ? 'none' : 'none'
    }),
    indicatorSeparator: styles => ({
        ...styles,
        display: 'none'
    }),
    singleValue: styles => ({
        ...styles,
        color: "#333",

    }),
    placeholder: styles => ({
        ...styles,
        color: '#253C5E',
        lineHeight: '24px',
        fontSize: '16px',
        marginLeft: 0,
        opacity: 0.38
    }),
    control: (styles, {isFocused}) => ({
        ...styles,
        backgroundColor: 'white',
        fontSize: 16,
        lineHeight: '100%',
        padding: 0,
        border: 0,
        boxShadow: 0,
        borderRadius: 0,
        borderBottom: '1px solid #ccc !important'
    }),
    valueContainer: styles => ({
        ...styles,
        paddingLeft: 0
    }),
    menu: styles => ({
        ...styles,
        boxShadow: 'none',
        borderRadius: 0
    }),
    menuList: styles => ({
        ...styles,
        backgroundColor: 'white',
        color: 'whitesmoke',
        borderColor: '#333',
        borderRadius: 0
    }),
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none',
            color: isSelected
                ? '#00C48C'
                : '#253C5E',
            background: 'none!important',
            fontWeight: isSelected
                ? 600
                : 'normal',
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.2px',
            '& span': {
                display: 'inline-block',
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                background: isSelected
                    ? '#00C48C'
                    : 'none',
                border: isSelected
                    ? '2px solid #00C48C'
                    : '2px solid #DADADA',
                marginRight: '11px'
            },
            '& span:after': {
                position: 'absolute',
                content: '""',
                display: isSelected ? 'block' : 'none',
                left: '18px',
                top: '10px',
                width: '7px',
                height: '13px',
                border: 'solid white',
                borderWidth: '0 2px 2px 0',
                transform: 'rotate(45deg)'
            }
        }
    }
};


function CitiesFilter(props) {
    const {
        city_ids, cities, changeCitiesFilter
    } = useContext(ExhibitionsFilterContext);

    const options = city_ids.map(cityId => ({label: cities.dictionary[String(cityId)], value: cityId}));
    //const options = [{ value: 0, label: 'Moscow' }, { value: 1, label: 'Berlin' }];
    console.log(options)

    const handleChange = options => changeCitiesFilter(getValues(options));
    return (
        <Select
            id={'cities_selector'}
            isMulti={true}
            closeMenuOnSelect={false}
            styles={style}
            options={options}
            defaultMenuIsOpen={true}
            hideSelectedOptions={false}
            menuIsOpen={true}
            controlShouldRenderValue={false}
            onChange={handleChange}
            clearable={true}
            isSearchable
            classNamePrefix={"ExInput"}
            placeholder={"Начните вводить город"}
            components={{Option}}
        />
    )
}

export default CitiesFilter