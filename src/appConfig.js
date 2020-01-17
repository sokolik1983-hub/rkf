import * as LoadableModules from "./appModules";

const SERVER = 'http://dev.uep24.ru';
const DEFAULT_PHONE_INPUT_MASK = ['7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const DEFAULT_PHONE_INPUT_PLACEHOLDER = '7 (   ) ___ __ __';
const DEFAULT_EMAIL_INPUT_PLACEHOLDER = 'Введите ваш Email';
const DEFAULT_CONTENT_LENGTH = 180;
const LOGIN_URL = '/auth/login';
const REGISTER_URL = '/auth/registration';

const appRoutes = [
    {
        exact: true,
        path: '/',
        component: LoadableModules.LoadableHomePage
    },
    {
        exact: true,
        path: '/exhibitions',
        component: LoadableModules.LoadableExhibitions
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
        exact: false,
        path: LOGIN_URL,
        component: LoadableModules.LoadableAuthorization
    },
    {
        exact: false,
        path: REGISTER_URL,
        component: LoadableModules.LoadableRegistration
    },
    {
        exact: false,
        path: '/client',
        component: LoadableModules.LoadableClient
    },
    {
        exact: false,
        path: '/dog_owner',
        component: LoadableModules.LoadableClientDogOwner
    },
    {
        exact: true,
        path: '/:route',
        component: LoadableModules.LoadableClubPage
    },
];

const mainNav = [
    {
        id: 1,
        title: "Главная",
        to: '/',
        exact: true
    },
    {
        id: 2,
        title: "Кинологические организации ",
        children: [
            {
                id: 2.1,
                title: "Национальные клубы пород",
                to: '/organizations/national-breed-clubs',
                exact: false
            },
            {
                id: 2.2,
                title: "Кинологические клубы и союзы",
                to: '/organizations/clubs-and-unions',
                exact: false
            },
            {
                id: 2.3,
                title: "Питомники",
                to: '/organizations/nurseries',
                exact: false
            }
        ]
    },
    {
        id: 3,
        title: "Выставки",
        children: [
            {
                id: 3.1,
                title: "Календарь выставок",
                to: '/exhibitions',
                exact: false
            },
            {
                id: 3.2,
                title: "Результаты выставок CAC",
                to: '/results/cac',
                exact: false
            },
            {
                id: 3.3,
                title: "Результаты выставок CACIB",
                to: '/results/cacib',
                exact: false
            }
        ]
    },
    {
        id: 4,
        title: "Обратная связь",
        to: '/',
        exact: false
    },
    {
        id: 5,
        title: "Клубы",
        to: '/clubs',
        exact: false
    }
];

const HTTP = {
    post: "POST",
    get: "GET",
    update: "PUT",
    delete: "DELETE",
};

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
    noImage: '/static/images/noimg/icon-no-image.svg'
};

export {
    WEEKDAYS_SHORT,
    MONTHS,
    HTTP,
    SERVER,
    appRoutes,
    mainNav,
    DEFAULT_PHONE_INPUT_MASK,
    DEFAULT_PHONE_INPUT_PLACEHOLDER,
    DEFAULT_EMAIL_INPUT_PLACEHOLDER,
    DEFAULT_CONTENT_LENGTH,
    LOGIN_URL,
    REGISTER_URL,
    DEFAULT_IMG
}