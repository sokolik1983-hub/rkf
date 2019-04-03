import {LoadableDemo} from "./appModules";

export const appRoutes = [
    {
        exact: false,
        path: '/demo',
        component: LoadableDemo
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