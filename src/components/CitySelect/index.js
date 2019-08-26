import React from "react";
import Dropdown from 'components/DropDown';
import Select from "react-select";
import './styles.scss'


const options = [
    {label: 'Moscow', value: 1},
    {label: 'Kyiv', value: 2},
    {label: 'London', value: 1},
    {label: 'City1', value: 2},
    {label: 'City2', value: 1},
    {label: 'City3', value: 1}
];
const style = {
    container: (styles, {isFocused}) => ({
        ...styles,
        outline: isFocused ? 'none' : 'none',
        margin: '0 24px'
    }),
    indicatorSeparator: styles => ({
        ...styles,
        display: 'none'
    }),
    dropdownIndicator: styles => ({
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
        borderBottom: '1px solid #f4f4f4 !important',
    }),
    valueContainer: styles => ({
        ...styles,
        paddingLeft: 0
    }),
    menu: styles => ({
        ...styles,
        boxShadow: 'none',
        borderRadius: 0,
        overflowY: 'scroll',
        height: '170px',
        '&::-webkit-scrollbar': {
            width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#90999E',
            borderRadius: '50px'
        }
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
            color: '#253C5E',
            background: 'none!important',
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.2px',
            paddingLeft: 0
        }
    }
};

function CitySelect() {
    return (
        <Dropdown innerComponent="Выбор города" className="CitySelect" outsideClickHandler={false}>
            <h3 className="CitySelect__heading">Выберите ваш город:</h3>
            <Select
                closeMenuOnSelect={false}
                styles={style}
                options={options}
                defaultMenuIsOpen={true}
                hideSelectedOptions={false}
                menuIsOpen={true}
                controlShouldRenderValue={false}
                clearable={true}
                placeholder={"Начните вводить город"}
                noOptionsMessage={() => 'Город не найден'}
                isSearchable
            />
        </Dropdown>
    )
}

export default CitySelect