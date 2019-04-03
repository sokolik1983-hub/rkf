import Loadable from "react-loadable";
import Loading from 'components/Loading'


export const LoadableDemo = Loadable({
    loader: () => import(/* webpackChunkName: "app.demo" */ './apps/Demo/index'),
    loading: Loading,
});

export const LoadableDemoAside = Loadable({
    loader: () => import(/* webpackChunkName: "app.demo.aside" */ './apps/Demo/Aside/index'),
    loading: Loading,
});


export const LoadableExhibitions = Loadable({
    loader: () => import(/* webpackChunkName: "app.exhibitions.aside" */ './apps/Exhibitions/index'),
    loading: Loading,
});

export const LoadableExhibitionsAside = Loadable({
    loader: () => import(/* webpackChunkName: "app.exhibitions.aside" */ './apps/Exhibitions/Aside/index'),
    loading: Loading,
});
