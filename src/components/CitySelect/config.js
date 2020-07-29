export const CITY_SELECTOR_STYLE = {
    container: (styles, {isFocused}) => ({
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
        color: '#72839C',
        marginLeft: 0
    }),
    dropdownIndicator: styles => ({
        ...styles,
        display: 'none'
    }),
    singleValue: styles => ({
        ...styles,
        color: '#333'
    }),
    placeholder: styles => ({
        ...styles,
        color: '#90999E',
        lineHeight: '24px',
        fontWeight: 'normal',
        fontSize: '16px',
        marginLeft: 0,
        letterSpacing: '0.2px'
    }),
    control: (styles, {isFocused}) => ({
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
    option: (styles, {data, isDisabled, isFocused, isSelected}) => {
        return {
            ...styles,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer',
            userSelect: 'none',
            color: '#253C5E',
            fontWeight: 'normal',
            background: 'none!important',
            fontSize: '16px',
            lineHeight: '24px',
            letterSpacing: '0.2px',
            padding: '0 0 0 24px',
            '&:hover': {
                backgroundColor: '#EBF0FF!important',
                color: '#3366FF'
            }
        };
    }
};