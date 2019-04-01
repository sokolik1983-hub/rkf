import {LoadableDemo} from "./appModules";

export const appRoutes = [
    {
        exact: false,
        path: '/demo',
        component: LoadableDemo
    },
];


export const mainNav = [
    {
        title: "Demo",
        to: '/demo'
    }
];