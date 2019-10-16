import TestView from 'apps/TestView'
import * as LoadableModules from "./appModules";

const SERVER = 'http://dev.uep24.ru';

const DEFAULT_PHONE_INPUT_MASK = ['7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const DEFAULT_PHONE_INPUT_PLACEHOLDER = '7 (   ) ___ __ __';
const DEFAULT_EMAIL_INPUT_PLACEHOLDER = 'Введите ваш Email';
const DEFAULT_CONTENT_LENGTH = 180;


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

const DEFAULT_IMG = {
    clubAvatar: '/static/icons/default/club-avatar.svg',
};

export {
    WEEKDAYS_SHORT,
    MONTHS,
    HTTP,
    SERVER,
    appRoutes,
    mainNav,
    DEFAULT_PHONE_INPUT_MASK,
    DEFAULT_PHONE_INPUT_PLACEHOLDER,
    DEFAULT_EMAIL_INPUT_PLACEHOLDER,
    DEFAULT_CONTENT_LENGTH,
    LOGIN_URL,
    REGISTER_URL,
    DEFAULT_IMG
}