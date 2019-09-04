import React, { useState } from "react";
import Select from "react-select";
import Dropdown from "components/Dropdown";
import './styles.scss'


const options = [
    { label: 'Moscow', value: 1 },
    { label: 'Kyiv', value: 2 },
    { label: 'London', value: 3 },
    { label: 'Berlin', value: 8 },
    { label: 'Киев', value: 4 },
    { label: 'Лондон', value: 5 },
    { label: 'Берлин', value: 6 },
    { label: 'Москва', value: 7 },
    { label: 'City 1', value: 8 },
    { label: 'City 2', value: 9 },
    { label: 'City 3', value: 10 },
    { label: 'City 4', value: 11 },
];
const style = {
    container: (styles, { isFocused }) => ({
        ...styles,
        outline: isFocused ? 'none' : 'none',
        marginRight: '8px'
    }),
    indicatorSeparator: styles => ({
        ...styles,
        display: 'none'
    }),
    input: styles => ({
        ...styles,
        color: '#72839C'
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
    control: (styles, { isFocused }) => ({
        ...styles,
        backgroundColor: 'white',
        fontSize: '16px',
        lineHeight: '42px',
        paddingLeft: '24px',
        border: 0,
        boxShadow: 0,
        borderRadius: 0,
        marginRight: '-8px',
        borderBottom: isFocused
            ? '1px solid #3366FF !important'
            : '1px solid #f4f4f4 !important'
    }),
    valueContainer: styles => ({
        ...styles,
        paddingLeft: 0
    }),
    menu: styles => ({
        ...styles,
        marginTop: '16px',
        boxShadow: 'none',
        borderRadius: 0,
        overflowY: 'scroll',
        height: '220px',
        '&::-webkit-scrollbar': {
            width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
            background: '#617CCD',
            borderRadius: '50px'
        },
        '&::-webkit-scrollbar-track': {
            background: '#EBF0FF',
            borderRadius: '50px'
        }
    }),
    menuList: styles => ({
        ...styles,
        backgroundColor: 'white',
        color: 'whitesmoke',
        borderColor: '#333',
        borderRadius: 0,
        overflowY: 'visible'
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none',
            color: '#72839C',
            fontWeight: 'normal',
            background: 'none!important',
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.2px',
            padding: '6px 0 6px 24px',
            '&:hover': {
                backgroundColor: '#EBF0FF!important',
                color: '#3366FF'
            }
        }
    }
};

function CitySelect() {
    const [value, setValue] = useState(null);
    return (
        <Dropdown innerComponent="Выбор города" className="CitySelect">
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
                value={value}
                onChange={setValue}
            />
        </Dropdown>
    )
}

export default CitySelect