import {
    LoadableDemo,
    LoadableExhibitions,
    LoadableHomePage,
    //LoadableAuthorization
    LoadableRegistration
} from "./appModules";
//import LoadableExhibitions from 'apps/Exhibitions'
import LoadableAuthorization from 'apps/Auth'
export const LOGIN_URL = '/auth/login';
export const REGISTER_URL = '/auth/registration';

export const appRoutes = [
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
];


// Результаты Расписание рингов Карточка участника Заявки
export const mainNav = [
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