import * as LoadableModules from "./appModules";

const SERVER = 'http://dev.uep24.ru';
const DEFAULT_PHONE_INPUT_MASK = ['7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const DEFAULT_PHONE_INPUT_PLACEHOLDER = '7 (   ) ___ __ __';
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
        path: '/organizations/federations',
        component: LoadableModules.LoadableFederationsPage
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
        path: '/clubs',
        component: LoadableModules.LoadableClubs
    },
    {
        exact: false,
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
        component: LoadableModules.LoadableAuthorization
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
        exact: false,
        path: '/client',
        component: LoadableModules.LoadableClient
    },
    {
        exact: true,
        path: '/:route/news',
        component: LoadableModules.LoadableClubNews
    },
    {
        exact: false,
        path: '/:route/documents',
        component: LoadableModules.LoadableDocs
    },
    {
        exact: true,
        path: '/:route',
        component: LoadableModules.LoadableClubPage
    },
    {
        exact: true,
        path: '/:route/document-status/:query?',
        component: LoadableModules.LoadableDocumentStatus
    }
];

const mainNav = [
    {
        id: 1,
        title: "Кинологические организации",
        children: [
            {
                id: 1.1,
                title: "РКФ",
                to: '/rkf',
                exact: true
            },
            {
                id: 1.2,
                title: "Федерации",
                to: '/organizations/federations',
                exact: false
            },
            {
                id: 1.3,
                title: "Клубы",
                to: '/clubs',
                exact: false
            },
            {
                id: 1.4,
                title: "Национальные Клубы Пород",
                to: '/organizations/national-breed-clubs',
                exact: false
            },
            {
                id: 1.5,
                title: "Питомники",
                to: '/organizations/nurseries',
                exact: false
            }
        ]
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
    noImage: '/static/images/noimg/icon-no-image.svg'
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
            touchThreshold: 5
        }
    },
    {
        breakpoint: 769,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            centerPadding: '100px'
        }
    },
    {
        breakpoint: 561,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            centerPadding: '25px'
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
    responsiveSliderConfig,
    DEFAULT_PHONE_INPUT_MASK,
    DEFAULT_PHONE_INPUT_PLACEHOLDER,
    DEFAULT_EMAIL_INPUT_PLACEHOLDER,
    LOGIN_URL,
    REGISTRATION_URL,
    DEFAULT_IMG,
    BAD_SITES
}
