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

export const LoadablePersonalDataProcessingPolicyPage = Loadable({
    loader: () => import('./pages/PersonalDataProcessingPolicy'),
    loading: Loading
});

export const LoadableRKFPage = Loadable({
    loader: () => import('./pages/RKF'),
    loading: Loading
});

export const LoadableFederationPage = Loadable({
    loader: () => import('./pages/FederationRedesign'),
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
export const LoadableReferee= Loadable({
    loader: () => import('./pages/Referee'),
    loading: Loading
});

export const LoadableEducational = Loadable({
    loader: () => import('./pages/Educational'),
    loading: Loading
});

export const LoadableExhibitionEdit = Loadable({
    loader: () => import('./pages/ExhibitionEdit'),
    loading: Loading
});

export const LoadableSpecialists = Loadable({
    loader: () => import('./pages/Specialists'),
    loading: Loading
});

export const LoadableNewsFeed = Loadable({
    loader: () => import('./pages/NewsFeed'),
    loading: Loading
});

export const LoadableNews = Loadable({
    loader: () => import('./pages/News'),
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

export const LoadableClubGallery = Loadable({
    loader: () => import('./pages/ClubGallery'),
    loading: Loading
});

export const LoadableClubGalleryEdit = Loadable({
    loader: () => import('./pages/ClubGallery/ClubGalleryEdit'),
    loading: Loading
});

export const LoadableClubVideo = Loadable({
    loader: () => import('./pages/ClubVideo'),
    loading: Loading
});

export const LoadableNurseryNews = Loadable({
    loader: () => import('./pages/Nursery/NewsPage'),
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

export const LoadableRegistrationActivate = Loadable({
    loader: () => import('./pages/Registration/components/IndividualRegistration/confirm'),
    loading: Loading
});

export const LoadablePasswordRecovery = Loadable({
    loader: () => import('./pages/Login/components/PasswordRecovery'),
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

export const LoadableUserDocuments = Loadable({
    loader: () => import('./pages/UserDocuments'),
    loading: Loading
});

export const LoadableUserEdit = Loadable({
    loader: () => import('./pages/UserEditKendo'),
    loading: Loading
});

export const LoadableUserPage = Loadable({
    loader: () => import('./pages/User'),
    loading: Loading
});

export const LoadableNBCPage = Loadable({
    loader: () => import('./pages/NBC'),
    loading: Loading
});
export const LoadableNBCPageEdit = Loadable({
    loader: () => import('./pages/NBCEdit'),
    loading: Loading
});
export const LoadableNBCGallery = Loadable({
    loader: () => import('./pages/NBCGallery'),
    loading: Loading
});

export const LoadableNBCGalleryEdit = Loadable({
    loader: () => import('./pages/NBCGallery/components/NBCGalleryEdit'),
    loading: Loading
});

export const LoadableNBCVideo = Loadable({
    loader: () => import('./pages/NBCVideo'),
    loading: Loading
});
export const LoadableNBCDocuments = Loadable({
    loader: () => import('./pages/NBCDocHome'),
    loading: Loading
});
export const LoadableNBCUploadedDocuments = Loadable({
    loader: () => import('./pages/NBCUploadedDocuments'),
    loading: Loading
});
export const LoadableUserVideo = Loadable({
    loader: () => import('./pages/UserVideo'),
    loading: Loading
});

export const LoadableNurseryGallery = Loadable({
    loader: () => import('./pages/NurseryGallery'),
    loading: Loading
});

export const LoadableNurseryGalleryEdit = Loadable({
    loader: () => import('./pages/NurseryGallery/NurseryGalleryEdit'),
    loading: Loading
});

export const LoadableNurseryVideo = Loadable({
    loader: () => import('./pages/NurseryVideo'),
    loading: Loading
});

export const LoadableUserGallery = Loadable({
    loader: () => import('./pages/UserPhotos'),
    loading: Loading
});

export const LoadableUserGalleryEdit = Loadable({
    loader: () => import('./pages/UserPhotos/UserPhotosEdit'),
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

export const LoadableNurseryEdit = Loadable({
    loader: () => import('./pages/NurseryEdit'),
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

export const LoadableNurseryDocumentStatus = Loadable({
    loader: () => import('./pages/Nursery/NurseryDocumentStatus'),
    loading: Loading
});

export const LoadableOrganizations = Loadable({
    loader: () => import('./pages/Organizations'),
    loading: Loading
});

export const LoadableSearchPage = Loadable({
    loader: () => import('./pages/Search'),
    loading: Loading
});

export const LoadableDocumentsPage = Loadable({
    loader: () => import('./pages/Documents'),
    loading: Loading
});

export const LoadableDetailsViewer = Loadable({
    loader: () => import('./pages/DetailsViewer'),
    loading: Loading
});

export const LoadablePedigreeViewer = Loadable({
    loader: () => import('./pages/PedigreeViewer'),
    loading: Loading
});

export const LoadableBaseSearch = Loadable({
    loader: () => import('./pages/BaseSearch'),
    loading: Loading
});

export const LoadableBankDetails = Loadable({
    loader: () => import('./pages/BankDetails'),
    loading: Loading
});

export const LoadableConfirmPasswordSuccess = Loadable({
    loader: () => import('./pages/ConfirmPassword/ConfirmSuccess'),
    loading: Loading
});

export const LoadableConfirmPasswordFailed = Loadable({
    loader: () => import('./pages/ConfirmPassword/ConfirmFailed'),
    loading: Loading
});

export const LoadableUserUploadedDocuments = Loadable({
    loader: () => import('./pages/UserUploadedDocuments'),
    loading: Loading
});

export const LoadableClubUploadedDocuments = Loadable({
    loader: () => import('./pages/ClubUploadedDocuments'),
    loading: Loading
});

export const LoadableNurseryUploadedDocuments = Loadable({
    loader: () => import('./pages/NurseryUploadedDocuments'),
    loading: Loading
});


export const LoadableMetricsDocPage = Loadable({
    loader: () => import('./pages/MetricsDocPage'),
    loading: Loading
});


export const LoadableNKPPage = Loadable({
    loader: () => import('./pages/NKP'),
    loading: Loading
});