import {
    LoadableDemo,
    LoadableDemoAside,
    LoadableExhibitions,
    LoadableExhibitionsAside
} from "./appModules";

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
        title: "Выставки",
        to: '/exhibitions'
    },
    {
        title: "Результаты",
        to: '/demo'
    },
    {
        title: "Расписание рингов",
        to: '/demo'
    },
    {
        title: "Карточка участника",
        to: '/demo'
    },
    {
        title: "Заявки",
        to: '/demo'
    },
];