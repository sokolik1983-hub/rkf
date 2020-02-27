import Loadable from "react-loadable";
import Loading from './components/Loading';


export const LoadableReports = Loadable({
    loader: () => import('./pages/Reports'),
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
    loading: () => null
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
    loader: () => import('./pages/Login'),
    loading: Loading,
});

export const LoadableRegistration = Loadable({
    loader: () => import('./pages/Registration'),
    loading: Loading,
});

export const LoadableNotConfirmed = Loadable({
    loader: () => import('./pages/NotConfirmed'),
    loading: Loading,
});

export const LoadableClient = Loadable({
    loader: () => import(/* webpackChunkName: "app.client.root" */ './pages/ClubEdit'),
    loading: Loading,
});

export const LoadableNotFound = Loadable({
    loader: () => import('./pages/404/index'),
    loading: Loading,
});
