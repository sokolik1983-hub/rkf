import {LoadableDemo, LoadableDemoAside} from "./appModules";

export const appRoutes = [
    {
        exact: false,
        path: '/demo',
        component: LoadableDemo
    },
];
export const asideRoutes = [
    {
        exact: false,
        path: '/demo',
        component: LoadableDemoAside
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