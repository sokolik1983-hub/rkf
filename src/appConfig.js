import TestView from 'apps/TestView'
import {
    LoadableDemo,
    //LoadableExhibitions,
    LoadableHomePage,
    LoadableAuthorization,
    LoadableRegistration,
    LoadableClient,
} from "./appModules";
import LoadableExhibitions from 'apps/Exhibitions'
//import LoadableAuthorization from 'apps/Auth/index'
const SERVER = 'http://services.development.ueplatform.ru';

const DEFAULT_PHONE_INPUT_MASK = ['7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const DEFAULT_PHONE_INPUT_PLACEHOLDER = '7 (   ) ___ __ __';

const LOGIN_URL = '/auth/login';
const REGISTER_URL = '/auth/registration';


const appRoutes = [
    {
        exact: true,
        path: '/',
        component: LoadableHomePage
    },
    {
        exact: false,
        path: '/demo',
        component: LoadableDemo
    },
    {
        exact: false,
        path: '/exhibitions',
        component: LoadableExhibitions
    },
    {
        exact: false,
        path: LOGIN_URL,
        component: LoadableAuthorization
    },
    {
        exact: false,
        path: REGISTER_URL,
        component: LoadableRegistration
    },
    {
        exact: false,
        path: '/client',
        component: LoadableClient
    },
    {
        exact: false,
        path: '/testView',
        component: TestView
    },
];


// Результаты Расписание рингов Карточка участника Заявки
const mainNav = [
    {
        id: 1,
        title: "Выставки",
        to: '/exhibitions'
    },
    {
        id: 2,
        title: "Результаты",
        to: '/demo'
    },
    {
        id: 3,
        title: "Расписание рингов",
        to: '/demo'
    },
    {
        id: 4,
        title: "Карточка участника",
        to: '/demo'
    },
    {
        id: 5,
        title: "Заявки",
        to: '/demo'
    },
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

        }),
        control: styles => ({
            ...styles,
            backgroundColor: 'white',
            borderColor: '#EBF0F2',
            borderWidth: 1,
            fontSize: 18,
            lineHeight: '100%',
            paddingTop: 4,
            paddingBottom: 4,
            paddingLeft: 2,
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

export {
    SERVER,
    appRoutes,
    mainNav,
    DEFAULT_PHONE_INPUT_MASK,
    DEFAULT_PHONE_INPUT_PLACEHOLDER,
    LOGIN_URL,
    REGISTER_URL,
    defaultReactSelectStyles
}