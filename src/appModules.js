import Loadable from "react-loadable";
import Loading from './components/Loading';


export const LoadableReports = Loadable({
    loader: () => import(/* webpackChunkName: "app.exhibitions" */ './apps/Reports/index'),
    loading: Loading,
});

export const LoadableHomePage = Loadable({
    loader: () => import('./pages/Home'),
    loading: Loading
});

export const LoadableExhibitions = Loadable({
    loader: () => import('./pages/Exhibitions'),
    loading: Loading
});

export const LoadableExhibition = Loadable({
    loader: () => import('./pages/Exhibition'),
    loading: Loading
});

export const LoadableClubPage = Loadable({
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

export const LoadableClientDogOwner = Loadable({
    loader: () => import(/* webpackChunkName: "app.dog.owner.root" */ './apps/DogOwner/index'),
    loading: Loading,
});

export const LoadableNotFound = Loadable({
    loader: () => import(/* webpackChunkName: "app.404" */ './pages/404/index'),
    loading: Loading,
});
