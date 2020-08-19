import React from "react";
import * as LoadableModules from "./appModules";

const SERVER = 'http://dev.uep24.ru';
const DEFAULT_PHONE_INPUT_MASK = ['+7', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
const DEFAULT_PHONE_INPUT_PLACEHOLDER = '+7(   )___-__-__';
const DEFAULT_EMAIL_INPUT_PLACEHOLDER = 'Введите ваш Email';
const LOGIN_URL = '/auth/login';
const REGISTRATION_URL = '/auth/registration';

const appRoutes = [
    {
        exact: true,
        path: '/',
        component: LoadableModules.LoadableHomePage
    },
    {
        exact: true,
        path: '/clubs-map',
        component: LoadableModules.LoadableMapPage
    },
    {
        exact: true,
        path: '/about',
        component: LoadableModules.LoadableAboutPage
    },
    {
        exact: true,
        path: '/search',
        component: LoadableModules.LoadableSearchPage
    },
    {
        exact: true,
        path: '/organizations',
        component: LoadableModules.LoadableOrganizations
    },
    {
        exact: true,
        path: '/rkf',
        component: LoadableModules.LoadableRKFPage
    },
    {
        exact: true,
        path: '/rfls',
        component: LoadableModules.LoadableFederationPage
    },
    {
        exact: true,
        path: '/rfss',
        component: LoadableModules.LoadableFederationPage
    },
    {
        exact: true,
        path: '/oankoo',
        component: LoadableModules.LoadableFederationPage
    },
    {
        exact: true,
        path: '/rfos',
        component: LoadableModules.LoadableFederationPage
    },
    {
        exact: true,
        path: '/exhibitions',
        component: LoadableModules.LoadableExhibitions
    },
    {
        exact: false,
        path: '/exhibitions/:id/edit',
        component: LoadableModules.LoadableExhibitionEdit
    },
    {
        exact: false,
        path: '/exhibitions/:id',
        component: LoadableModules.LoadableExhibition
    },
    {
        exact: true,
        path: '/news/:id/edit',
        component: LoadableModules.LoadableNews
    },
    {
        exact: true,
        path: '/news/:id',
        component: LoadableModules.LoadableNews
    },
    {
        exact: false,
        path: '/reports',
        component: LoadableModules.LoadableReports
    },
    {
        exact: true,
        path: '/recovery',
        component: LoadableModules.LoadablePasswordRecovery
    },
    {
        exact: true,
        path: '/auth/login',
        component: LoadableModules.LoadableLogin
    },
    {
        exact: true,
        path: '/auth/registration',
        component: LoadableModules.LoadableRegistration
    },
    {
        exact: true,
        path: '/not-confirmed',
        component: LoadableModules.LoadableNotConfirmed
    },
    {
        exact: true,
        path: '/kennel/activation',
        component: LoadableModules.LoadableNurseryActivation
    },
    {
        exact: true,
        path: '/kennel/:id',
        component: LoadableModules.LoadableNurseryPage
    },
    {
        exact: false,
        path: '/kennel/:id/documents',
        component: LoadableModules.LoadableNurseryDocuments
    },
    {
        exact: false,
        path: '/client',
        component: LoadableModules.LoadableClient
    },
    {
        exact: true,
        path: '/:id/gallery/:album?/edit',
        component: LoadableModules.LoadableClubGalleryEdit
    },
    {
        exact: true,
        path: '/:id/gallery/:album?',
        component: LoadableModules.LoadableClubGallery
    },
    {
        exact: false,
        path: '/kennel/:id/edit',
        component: LoadableModules.LoadableNurseryEdit
    },
    {
        exact: true,
        path: '/kennel/:id/gallery/:album?/edit',
        component: LoadableModules.LoadableNurseryGalleryEdit
    },
    {
        exact: true,
        path: '/kennel/:id/gallery/:album?',
        component: LoadableModules.LoadableNurseryGallery
    },

    {
        exact: true,
        path: '/:route/news',
        component: LoadableModules.LoadableClubNews
    },
    {
        exact: true,
        path: '/kennel/:route/news',
        component: LoadableModules.LoadableNurseryNews
    },
    {
        exact: false,
        path: '/:route/documents',
        component: LoadableModules.LoadableDocs
    },
    {
        exact: true,
        path: '/:route/document-status',
        component: LoadableModules.LoadableDocumentStatus
    },
    {
        exact: true,
        path: '/:route/document-status/:query',
        component: LoadableModules.LoadableDocumentStatus
    },
    {
        exact: true,
        path: '/:route',
        component: LoadableModules.LoadableClubPage
    }
];

const mainNav = [
    {
        id: 1,
        title: "Кинологические организации",
        to: '/organizations',
        exact: true
    },
    {
        id: 2,
        title: "Календарь мероприятий",
        to: '/exhibitions',
        exact: false
        // children: [
        //     {
        //         id: 2.1,
        //         title: "Календарь мероприятий",
        //         to: '/exhibitions',
        //         exact: false
        //     },
        //     {
        //         id: 2.2,
        //         title: "Результаты мероприятий CACIB",
        //         to: '/results/cacib',
        //         exact: false
        //     },
        //     {
        //         id: 2.3,
        //         title: "Результаты мероприятий CAC",
        //         to: '/results/cac',
        //         exact: false
        //     },
        //     {
        //         id: 2.4,
        //         title: "Результаты монопородных мероприятий",
        //         to: '/',
        //         exact: true,
        //         disabled: true
        //     },
        //     {
        //         id: 2.5,
        //         title: "Племенные мероприятия",
        //         to: '/',
        //         exact: true,
        //         disabled: true
        //     },
        //     {
        //         id: 2.6,
        //         title: "Состязания и испытания рабочих качеств",
        //         to: '/',
        //         exact: true,
        //         disabled: true
        //     }
        // ]
    },
    {
        id: 3,
        title: "О RKF.Online",
        to: '/about',
        exact: false
    }
];

const mainNavIcons = [
    {
        id: 1,
        title: "Кинологические организации",
        to: '/organizations',
        exact: true,
        image: <svg className="header__nav-icon" width="22" height="22" viewBox="0 0 24 24"><path d="M5.909,21.542A4.97,4.97,0,0,0,9.438,23h6.068a4.97,4.97,0,0,0,3.529-1.458c2.863-2.851,2.5-6.188,2.915-7.913a4.934,4.934,0,0,0-2.507-5.023h0c-1.672-.939-3.219-.489-6.41-.606V4.111a3.087,3.087,0,0,0-2.509-3.07A3.005,3.005,0,0,0,7.018,4V14.182a3.087,3.087,0,0,0-3.756-.223,3,3,0,0,0-.38,4.567ZM4.428,15.584a1.1,1.1,0,0,1,1.37.191l1.514,1.509a1,1,0,0,0,1.706-.709V4a1,1,0,0,1,.353-.76,1.012,1.012,0,0,1,.832-.226,1.09,1.09,0,0,1,.83,1.1V9a1,1,0,0,0,1,1c4.576.092,5.4-.227,6.431.35a2.948,2.948,0,0,1,1.507,3c-.411,1.8-.06,4.5-2.347,6.78A2.983,2.983,0,0,1,15.506,21H9.438a2.983,2.983,0,0,1-2.118-.875L4.294,17.109A1,1,0,0,1,4.428,15.584Z"/></svg>,
    },
    {
        id: 2,
        title: "Календарь мероприятий",
        to: '/exhibitions',
        exact: false,
        image: <svg className="header__nav-icon" width="22" height="22" viewBox="0 0 24 24"><path d="M5.909,21.542A4.97,4.97,0,0,0,9.438,23h6.068a4.97,4.97,0,0,0,3.529-1.458c2.863-2.851,2.5-6.188,2.915-7.913a4.934,4.934,0,0,0-2.507-5.023h0c-1.672-.939-3.219-.489-6.41-.606V4.111a3.087,3.087,0,0,0-2.509-3.07A3.005,3.005,0,0,0,7.018,4V14.182a3.087,3.087,0,0,0-3.756-.223,3,3,0,0,0-.38,4.567ZM4.428,15.584a1.1,1.1,0,0,1,1.37.191l1.514,1.509a1,1,0,0,0,1.706-.709V4a1,1,0,0,1,.353-.76,1.012,1.012,0,0,1,.832-.226,1.09,1.09,0,0,1,.83,1.1V9a1,1,0,0,0,1,1c4.576.092,5.4-.227,6.431.35a2.948,2.948,0,0,1,1.507,3c-.411,1.8-.06,4.5-2.347,6.78A2.983,2.983,0,0,1,15.506,21H9.438a2.983,2.983,0,0,1-2.118-.875L4.294,17.109A1,1,0,0,1,4.428,15.584Z"/></svg>,
    },
    {
        id: 3,
        title: "Специалисты",
        to: '/',
        exact: true,
        image: <svg className="header__nav-icon" width="22" height="22" viewBox="0 0 24 24"><path d="M5.909,21.542A4.97,4.97,0,0,0,9.438,23h6.068a4.97,4.97,0,0,0,3.529-1.458c2.863-2.851,2.5-6.188,2.915-7.913a4.934,4.934,0,0,0-2.507-5.023h0c-1.672-.939-3.219-.489-6.41-.606V4.111a3.087,3.087,0,0,0-2.509-3.07A3.005,3.005,0,0,0,7.018,4V14.182a3.087,3.087,0,0,0-3.756-.223,3,3,0,0,0-.38,4.567ZM4.428,15.584a1.1,1.1,0,0,1,1.37.191l1.514,1.509a1,1,0,0,0,1.706-.709V4a1,1,0,0,1,.353-.76,1.012,1.012,0,0,1,.832-.226,1.09,1.09,0,0,1,.83,1.1V9a1,1,0,0,0,1,1c4.576.092,5.4-.227,6.431.35a2.948,2.948,0,0,1,1.507,3c-.411,1.8-.06,4.5-2.347,6.78A2.983,2.983,0,0,1,15.506,21H9.438a2.983,2.983,0,0,1-2.118-.875L4.294,17.109A1,1,0,0,1,4.428,15.584Z"/></svg>,
    },
    {
        id: 4,
        title: "Поиск по базе РКФ",
        to: '/search',
        exact: true,
        image: <svg className="header__nav-icon" width="22" height="22" viewBox="0 0 24 24"><path d="M5.909,21.542A4.97,4.97,0,0,0,9.438,23h6.068a4.97,4.97,0,0,0,3.529-1.458c2.863-2.851,2.5-6.188,2.915-7.913a4.934,4.934,0,0,0-2.507-5.023h0c-1.672-.939-3.219-.489-6.41-.606V4.111a3.087,3.087,0,0,0-2.509-3.07A3.005,3.005,0,0,0,7.018,4V14.182a3.087,3.087,0,0,0-3.756-.223,3,3,0,0,0-.38,4.567ZM4.428,15.584a1.1,1.1,0,0,1,1.37.191l1.514,1.509a1,1,0,0,0,1.706-.709V4a1,1,0,0,1,.353-.76,1.012,1.012,0,0,1,.832-.226,1.09,1.09,0,0,1,.83,1.1V9a1,1,0,0,0,1,1c4.576.092,5.4-.227,6.431.35a2.948,2.948,0,0,1,1.507,3c-.411,1.8-.06,4.5-2.347,6.78A2.983,2.983,0,0,1,15.506,21H9.438a2.983,2.983,0,0,1-2.118-.875L4.294,17.109A1,1,0,0,1,4.428,15.584Z"/></svg>,
    },
    {
        id: 5,
        title: "O RKF.Online",
        to: '/about',
        exact: false,
        image: <svg className="header__nav-icon" width="22" height="22" viewBox="0 0 24 24"><path d="M5.909,21.542A4.97,4.97,0,0,0,9.438,23h6.068a4.97,4.97,0,0,0,3.529-1.458c2.863-2.851,2.5-6.188,2.915-7.913a4.934,4.934,0,0,0-2.507-5.023h0c-1.672-.939-3.219-.489-6.41-.606V4.111a3.087,3.087,0,0,0-2.509-3.07A3.005,3.005,0,0,0,7.018,4V14.182a3.087,3.087,0,0,0-3.756-.223,3,3,0,0,0-.38,4.567ZM4.428,15.584a1.1,1.1,0,0,1,1.37.191l1.514,1.509a1,1,0,0,0,1.706-.709V4a1,1,0,0,1,.353-.76,1.012,1.012,0,0,1,.832-.226,1.09,1.09,0,0,1,.83,1.1V9a1,1,0,0,0,1,1c4.576.092,5.4-.227,6.431.35a2.948,2.948,0,0,1,1.507,3c-.411,1.8-.06,4.5-2.347,6.78A2.983,2.983,0,0,1,15.506,21H9.438a2.983,2.983,0,0,1-2.118-.875L4.294,17.109A1,1,0,0,1,4.428,15.584Z"/></svg>,
    }
];

const WEEKDAYS = [
    {
        "id": 1,
        "name": "Понедельник",
        "short_name": "Пн",
        "name_eng": "Monday",
        "short_name_eng": "Mo",
        "week_day_number": 1
    },
    {
        "id": 2,
        "name": "Вторник",
        "short_name": "Вт",
        "name_eng": "Tuesday",
        "short_name_eng": "Tu",
        "week_day_number": 2
    },
    {
        "id": 3,
        "name": "Среда",
        "short_name": "Ср",
        "name_eng": "Wednesday",
        "short_name_eng": "We",
        "week_day_number": 3
    },
    {
        "id": 4,
        "name": "Четверг",
        "short_name": "Чт",
        "name_eng": "Thursday",
        "short_name_eng": "Th",
        "week_day_number": 4
    },
    {
        "id": 5,
        "name": "Пятница",
        "short_name": "Пт",
        "name_eng": "Friday",
        "short_name_eng": "Fr",
        "week_day_number": 5
    },
    {
        "id": 6,
        "name": "Суббота",
        "short_name": "Сб",
        "name_eng": "Saturday",
        "short_name_eng": "Sa",
        "week_day_number": 6
    },
    {
        "id": 7,
        "name": "Воскресенье",
        "short_name": "Вс",
        "name_eng": "Sunday",
        "short_name_eng": "Su",
        "week_day_number": 7
    }
];

const WEEKDAYS_SHORT = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const MONTHS = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

const DEFAULT_IMG = {
    clubAvatar: '/static/icons/default/club-avatar.svg',
    exhibitionPicture: '/static/images/exhibitions/default.png',
    authPicture: '/static/images/registration/banner.png',
    noImage: '/static/images/noimg/icon-no-image.svg',
    noNews: '/static/images/news/no-news-small.png',
    emptyGallery: '/static/images/noimg/empty-gallery.png'
};

const BAD_SITES = [
    'zooportal.pro',
    'kinolog.org'
];

const responsiveSliderConfig = [
    {
        breakpoint: 1181,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            touchThreshold: 5,
            variableWidth: false
        }
    },
    {
        breakpoint: 768,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            centerPadding: '25px',
            variableWidth: false
        }
    },
    {
        breakpoint: 561,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            centerPadding: '25px',
            variableWidth: false
        }
    }
];

export {
    WEEKDAYS,
    WEEKDAYS_SHORT,
    MONTHS,
    SERVER,
    appRoutes,
    mainNav,
    mainNavIcons,
    responsiveSliderConfig,
    DEFAULT_PHONE_INPUT_MASK,
    DEFAULT_PHONE_INPUT_PLACEHOLDER,
    DEFAULT_EMAIL_INPUT_PLACEHOLDER,
    LOGIN_URL,
    REGISTRATION_URL,
    DEFAULT_IMG,
    BAD_SITES
}
