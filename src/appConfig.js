import TestView from 'apps/TestView'
import * as LoadableModules from "./appModules";

const SERVER = 'http://dev.uep24.ru';

const DEFAULT_PHONE_INPUT_MASK = ['7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const DEFAULT_PHONE_INPUT_PLACEHOLDER = '7 (   ) ___ __ __';

const LOGIN_URL = '/auth/login';
const REGISTER_URL = '/auth/registration';


const appRoutes = [
    {
        exact: true,
        path: '/',
        component: LoadableModules.LoadableHomePage
    },

    {
        exact: false,
        path: '/demo',
        component: LoadableModules.LoadableDemo
    },
    {
        exact: false,
        path: '/public/club',
        component: LoadableModules.PublicClub
    },
    {
        exact: false,
        path: '/exhibitions',
        component: LoadableModules.LoadableExhibitions
    },
    {
        exact: false,
        path: LOGIN_URL,
        component: LoadableModules.LoadableAuthorization
    },
    {
        exact: false,
        path: REGISTER_URL,
        component: LoadableModules.LoadableRegistration
    },
    {
        exact: false,
        path: '/client',
        component: LoadableModules.LoadableClient
    },
    {
        exact: false,
        path: '/dog_owner',
        component: LoadableModules.LoadableClientDogOwner
    },
    {
        exact: false,
        path: '/testView',
        component: TestView
    },
    {
        exact: true,
        path: '/:route',
        component: LoadableModules.LoadableClubPage
    },
];


// Результаты Расписание рингов Карточка участника Заявки
const mainNav = [
    {
        id: 1,
        title: "Выставки",
        to: '/exhibitions'
    },
    // {
    //     id: 2,
    //     title: "Результаты",
    //     to: '/demo'
    // },
    // {
    //     id: 3,
    //     title: "Расписание рингов",
    //     to: '/demo'
    // },
    // {
    //     id: 4,
    //     title: "Карточка участника",
    //     to: '/demo'
    // },
    // {
    //     id: 5,
    //     title: "Заявки",
    //     to: '/demo'
    // },
];

const defaultReactSelectStyles = {
    defaultTheme: {
        singleValue: styles => ({
            ...styles,
            color: "#333",

        }),
        placeholder: styles => ({
            ...styles,
            color: "#CCCCCC",
            fontSize: 16,
        }),
        control: styles => ({
            ...styles,
            backgroundColor: 'white',
            borderColor: '#EBF0F2',
            borderWidth: 1,
            fontSize: 16,
            lineHeight: '100%',
            paddingTop: 7,
            paddingBottom: 6,
            paddingLeft: 4,
            borderRadius: 6,

        }),
        menuList: styles => ({
            ...styles,
            backgroundColor: 'white',
            color: 'whitesmoke',
            borderColor: '#333',
            borderRadius: 8
        }),
        option: (styles, {data, isDisabled, isFocused, isSelected}) => {
            return {
                ...styles,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? '#253C5E'
                        : '#253C5E',
                backgroundColor: isSelected ? "#F6F7F7" : 'transparent',
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
    }
};


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
        color: '#72839C'
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
        color: '#253C5E',
        lineHeight: '24px',
        fontSize: '16px',
        marginLeft: 0,
        opacity: 0.38
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
        };
    }
};
const HTTP = {
    post: "POST",
    get: "GET",
    update: "PUT",
    delete: "DELETE",
};

const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

export {
    WEEKDAYS_SHORT,
    MONTHS,
    HTTP,
    SERVER,
    appRoutes,
    mainNav,
    DEFAULT_PHONE_INPUT_MASK,
    DEFAULT_PHONE_INPUT_PLACEHOLDER,
    LOGIN_URL,
    REGISTER_URL,
    defaultReactSelectStyles
}