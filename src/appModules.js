import Loadable from "react-loadable";
import Loading from './components/Loading';


export const LoadableReports = Loadable({
    loader: () => import('./pages/Reports'),
    loading: Loading
});

export const LoadableDocs = Loadable({
    loader: () => import('./pages/Docs'),
    loading: Loading
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
    loading: Loading
});

export const LoadableClubNews = Loadable({
    loader: () => import('./pages/Club/NewsPage'),
    loading: Loading
});

export const LoadableLogin = Loadable({
    loader: () => import('./pages/Login'),
    loading: Loading
});

export const LoadableRegistration = Loadable({
    loader: () => import('./pages/Registration'),
    loading: Loading
});

export const LoadablePasswordRecovery = Loadable({
    loader: () => import('./pages/Login/components/PasswordRecovery'),
    loading: Loading
});

export const LoadableNurseries = Loadable({
    loader: () => import('./pages/Nurseries'),
    loading: Loading
});

export const LoadableNurseryPage = Loadable({
    loader: () => import('./pages/Nursery'),
    loading: Loading
});

export const LoadableNurseryDocuments = Loadable({
    loader: () => import('./pages/NurseryDocuments'),
    loading: Loading
});

export const LoadableNotConfirmed = Loadable({
    loader: () => import('./pages/NotConfirmed'),
    loading: Loading
});

export const LoadableNurseryActivation = Loadable({
    loader: () => import('./pages/NurseryActivation'),
    loading: Loading
});

export const LoadableClient = Loadable({
    loader: () => import(/* webpackChunkName: "app.client.root" */ './pages/ClubEdit'),
    loading: Loading
});

export const LoadableNotFound = Loadable({
    loader: () => import('./pages/404/index'),
    loading: Loading
});

export const LoadableDocumentStatus = Loadable({
    loader: () => import('./pages/Club/DocumentStatus'),
    loading: Loading
});
