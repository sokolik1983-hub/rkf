import {
    LoadableDemo,
    LoadableDemoAside,
    //LoadableExhibitions,
    LoadableExhibitionsAside
} from "./appModules";
import LoadableExhibitions from 'apps/Exhibitions'
export const appRoutes = [
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
];
export const asideRoutes = [
    {
        exact: false,
        path: '/demo',
        component: LoadableDemoAside
    },
    {
        exact: false,
        path: '/exhibitions',
        component: LoadableExhibitionsAside
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