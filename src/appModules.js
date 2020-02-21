import Loadable from "react-loadable";
import Loading from './components/Loading';


export const LoadableReports = Loadable({
    loader: () => import(/* webpackChunkName: "app.exhibitions" */ './pages/Reports'),
    loading: Loading,
});

export const LoadableHomePage = Loadable({
    loader: () => import('./pages/Home'),
    loading: Loading
});

export const LoadableMapPage = Loadable({
    loader: () => import('./pages/Map'),
    loading: Loading
});

export const LoadableAboutPage = Loadable({
    loader: () => import('./pages/About'),
    loading: Loading
});

export const LoadableRKFPage = Loadable({
    loader: () => import('./pages/RKF'),
    loading: Loading
});

export const LoadableFederationPage = Loadable({
    loader: () => import('./pages/Federation'),
    loading: Loading
});

export const LoadableFederationsPage = Loadable({
    loader: () => import('./pages/Federations'),
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

export const LoadableExhibitionEdit = Loadable({
    loader: () => import('./pages/ExhibitionEdit'),
    loading: Loading
});

export const LoadableNews = Loadable({
    loader: () => import('./pages/News'),
    loading: Loading
});

export const LoadableClubs = Loadable({
    loader: () => import('./pages/Clubs'),
    loading: Loading
});

export const LoadableClubPage = Loadable({
    loader: () => import('./pages/Club'),
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
