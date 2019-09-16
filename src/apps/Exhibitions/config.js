export const searchDefaultPlaceholder = 'Поиск по выставкам';

export const defaultReduxKey = 'exhibitions';
export const endpointExhibitionsList = '/api/Exhibitions/exhibition/public';
export const endpointExhibitionsFilters = '/api/exhibitions/Exhibition/filter';
export const dogBreedFilterOptions = [
    {
        value: 1,
        label: 'Монопородные',
        count: 11
    },
    {
        value: 2,
        label: 'Всепородные',
        count: 1001
    }
];

export const cityFilterOptions = [
    {
        value: 1,
        label: 'Москва'
    },
    {
        value: 2,
        label: 'Санкт-Петербург'
    },
    {
        value: 3,
        label: 'Пенза'
    },
    {
        value: 4,
        label: 'Новгород'
    },
    {
        value: 5,
        label: 'Екатеринбург'
    }
];

export const EXHIBITIONS_FILTER_STYLE = {
    container: (styles, { isFocused }) => ({
        ...styles,
        outline: isFocused ? 'none' : 'none'
    }),
    dropdownIndicator: styles => ({
        ...styles,
        display: 'none'
    }),

    indicatorSeparator: styles => ({
        ...styles,
        display: 'none'
    }),
    singleValue: styles => ({
        ...styles,
        color: '#333'
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
        borderRadius: 0,
        position: 'relative'
    }),
    menuList: styles => ({
        ...styles,
        backgroundColor: 'white',
        color: 'whitesmoke',
        borderColor: '#333',
        borderRadius: 0
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none',
            color: isSelected ? '#00C48C' : '#253C5E',
            background: 'none!important',
            fontWeight: isSelected ? 600 : 'normal',
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.2px',
            '& span': {
                display: 'inline-block',
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                background: isSelected ? '#00C48C' : 'none',
                border: isSelected ? '2px solid #00C48C' : '2px solid #DADADA',
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
        };
    }
};
