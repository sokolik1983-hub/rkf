import Loadable from "react-loadable";
import Loading from 'components/Loading'


export const LoadableDemo = Loadable({
    loader: () => import(/* webpackChunkName: "app.demo" */ './apps/Demo/index'),
    loading: Loading,
});


export const LoadableExhibitions = Loadable({
    loader: () => import(/* webpackChunkName: "app.exhibitions" */ './apps/Exhibitions/index'),
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
    loader: () => import(/* webpackChunkName: "app.registration" */ './apps/Registration/index'),
    loading: Loading,
});


export const LoadableClient = Loadable({
    loader: () => import(/* webpackChunkName: "app.client.root" */ './apps/Client/index'),
    loading: Loading,
});
