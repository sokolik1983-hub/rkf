import Loadable from "react-loadable";
import Loading from 'components/Loading'


export const LoadableDemo = Loadable({
    loader: () => import(/* webpackChunkName: "app.demo" */ './apps/Demo/index'),
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

export const LoadableHomePage = Loadable({
    loader: () => import(/* webpackChunkName: "app.homepage" */ './apps/HomePage/index'),
    loading: Loading,
});


export const LoadableAuthorization = Loadable({
    loader: () => import(/* webpackChunkName: "app.authorization" */ './apps/Auth/index'),
    loading: Loading,
});

export const LoadableRegistration = Loadable({
    loader: () => import(/* webpackChunkName: "app.authorization" */ './apps/Registration/index'),
    loading: Loading,
});
