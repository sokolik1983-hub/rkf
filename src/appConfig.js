import React from 'react';
import * as LoadableModules from "./appModules";

const SERVER = 'http://dev.uep24.ru';
const DEFAULT_PHONE_INPUT_MASK = ['+', '7','(', /[1-9]/, /\d/, /\d/, ')',/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
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
        path: '/base-search',
        component: LoadableModules.LoadableBaseSearch
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
        path: '/auth/registration/activate',
        component: LoadableModules.LoadableRegistrationActivate
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
        exact: true,
        path: '/user/:id',
        component: LoadableModules.LoadableUserPage
    },
    {
        exact: true,
        path: '/user/:id/video',
        component: LoadableModules.LoadableUserVideo
    },
    {
        exact: true,
        path: '/user/:id/gallery',
        component: LoadableModules.LoadableUserGallery
    },
    {
        exact: true,
        path: '/user/:id/gallery/edit',
        component: LoadableModules.LoadableUserGalleryEdit
    },
    {
        exact: true,
        path: '/user/:id/gallery/:album?/edit',
        component: LoadableModules.LoadableUserGalleryEdit
    },
    {
        exact: true,
        path: '/user/:id/gallery/:album?',
        component: LoadableModules.LoadableUserGallery
    },
    {
        exact: false,
        path: '/user/:id/documents',
        component: LoadableModules.LoadableUserDocuments
    },
    {
        exact: false,
        path: '/user/:id/edit',
        component: LoadableModules.LoadableUserEdit
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
        exact: true,
        path: '/:id/video',
        component: LoadableModules.LoadableClubVideo
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
        path: '/kennel/:id/video',
        component: LoadableModules.LoadableNurseryVideo
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
        path: '/kennel/:route/document-status',
        component: LoadableModules.LoadableNurseryDocumentStatus
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
        exact: true,
        image: <svg id="Layer_1" className="header__nav-icon" width="30" height="30" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M179.38,78.68a3.42,3.42,0,0,1-2-.65l-64.56-46.2a21.79,21.79,0,0,0-25.66,0L22.61,78a3.46,3.46,0,0,1-5.05-1.16,4.23,4.23,0,0,1,1.06-5.54L83.18,25.14a28.51,28.51,0,0,1,33.64,0l64.56,46.19a4.23,4.23,0,0,1,1.06,5.54A3.57,3.57,0,0,1,179.38,78.68Z"/><circle cx="115.01" cy="96.56" r="4.58"/><circle cx="85.07" cy="96.56" r="4.58"/><path d="M148.82,81.76a31.91,31.91,0,0,1-8.72-5.35,27,27,0,0,1-3.57-3.8A13,13,0,0,0,130.75,68c-4.06-1.66-9.33-1.84-12.26-.41a5.59,5.59,0,0,0-.6.35C113,65.37,107,64.09,100.1,64.15H100c-.24,0-.46,0-.71,0v0a37.82,37.82,0,0,0-17.49,3.62l-.34-.19c-2.93-1.42-8.2-1.25-12.26.41a13,13,0,0,0-5.78,4.61,27,27,0,0,1-3.57,3.8,31.91,31.91,0,0,1-8.72,5.35c-3.38,1.53-6.57,3-8.7,7.46a15.15,15.15,0,0,0-1.41,7.23c.34,6.39,3.81,11,7.51,14.93.83.89,1.5,1.6,2.06,2.18,2.12,2.24,2.3,2.43,3.25,4.38a22.56,22.56,0,0,1,1.83,6c.37,1.94.79,4.13,3,4.62a2.84,2.84,0,0,0,.69.08,3.65,3.65,0,0,0,2.14-.74c2.34-1.68,4.56-6.53,5.12-11.13,2.24,8.28,5.93,17.27,9.26,19.69l0-.08a17.27,17.27,0,0,0,9.67,8.14,11.36,11.36,0,0,0,1.28.31l-.06,0a12.16,12.16,0,0,0,2.76,2.79v2.49a10.42,10.42,0,1,0,20.84,0v-2.49a12.19,12.19,0,0,0,2.76-2.8l-.08-.06a7.86,7.86,0,0,0,1.26-.27,17,17,0,0,0,10.07-8.95c3.25-3.48,6.65-12.34,8.64-20.18.06.37.13.73.17,1.11.51,4.68,2.77,9.68,5.16,11.4a3.65,3.65,0,0,0,2.14.74,2.84,2.84,0,0,0,.69-.08c2.21-.49,2.63-2.68,3-4.62a22.56,22.56,0,0,1,1.83-6c.95-2,1.13-2.14,3.25-4.38.56-.58,1.23-1.29,2.06-2.18,3.7-4,7.17-8.54,7.51-14.93a15.15,15.15,0,0,0-1.41-7.23C155.39,84.74,152.2,83.29,148.82,81.76ZM61.5,116a17.43,17.43,0,0,1-1.15,4.57,24.66,24.66,0,0,0-1.75-4.88A17.71,17.71,0,0,0,54.44,110l-2-2.15c-4.24-4.57-5.9-7.72-6.1-11.63a10,10,0,0,1,.91-4.72c1.3-2.74,3-3.52,6.12-4.93a37.09,37.09,0,0,0,10-6.17,31.7,31.7,0,0,0,4.21-4.46,7.9,7.9,0,0,1,3.69-3.05,13.48,13.48,0,0,1,4.62-1c-.26.23-.53.44-.78.68-6.4,6.25-9.89,15.93-10.42,28.77-.32,1.59-.73,3.17-1.16,4.84A67,67,0,0,0,61.5,116ZM100,155.34a5.18,5.18,0,0,1-5.17-5.18v-6.9a21,21,0,0,0,2.55-1.71v4.72a2.61,2.61,0,0,0,2.62,2.61h0a2.62,2.62,0,0,0,2.62-2.62v-4.81a26.91,26.91,0,0,0,2.57,1.48v7.23A5.19,5.19,0,0,1,100,155.34Zm25.07-32a28.45,28.45,0,0,0-4.73-8.37l-.13-.17a2.62,2.62,0,1,0-4.22,3.1l.12.17c3.08,4.2,5.52,7.52,4.06,13.86-.89,3.88-4.46,6.66-7.4,7.61-1.4.45-4.54-.65-7.48-2.62a7.5,7.5,0,0,1-.81-.69c-.28-.27-.55-.53-.8-.79-.44-.45-.8-.86-1.06-1.18v-3.39a44.4,44.4,0,0,0,5.07-5.19,6.86,6.86,0,0,0,1.58-6.41,4.26,4.26,0,0,0-.33-.88c-1.89-3.52-16-3.52-17.87,0a3.76,3.76,0,0,0-.34.88,6.88,6.88,0,0,0,1.58,6.41,45.25,45.25,0,0,0,5.07,5.19v3.4c-.26.31-.62.72-1.07,1.18a16.43,16.43,0,0,1-5.13,3.77,6.66,6.66,0,0,1-2,.52H89a4.23,4.23,0,0,1-1.73-.21c-2.94-1-6.51-3.74-7.4-7.61-1.46-6.33,1-9.65,4.06-13.86l.69-.94a2.62,2.62,0,1,0-4.24-3.08l-.67.92c-2,2.68-4.08,5.58-5,9.35-2.51-6.36-4.88-14.91-4.87-19.7,0-13,3-22.57,8.91-28.32C83.18,72,89.47,69.68,97.4,69.42a45.22,45.22,0,0,1,11.95,1c.82.19,1.64.41,2.44.65.46.14.92.29,1.37.47a23.82,23.82,0,0,1,4.49,2.31c.54.36,1.07.75,1.58,1.16.26.21.51.42.75.64s.46.54.71.66c5.9,5.76,8.89,15.28,8.92,28.32C129.61,109.17,127.48,117.11,125.11,123.35Zm28.58-27.17c-.2,3.91-1.86,7.06-6.1,11.63l-2,2.15a17.71,17.71,0,0,0-4.16,5.68,24.66,24.66,0,0,0-1.75,4.88A17.43,17.43,0,0,1,138.5,116a47.87,47.87,0,0,0-2.24-9.38,52.37,52.37,0,0,1-1.49-5.35c-.54-12.79-4-22.43-10.41-28.67-.25-.24-.54-.45-.8-.69a13.9,13.9,0,0,1,5.2,1,7.9,7.9,0,0,1,3.69,3.05,31.7,31.7,0,0,0,4.21,4.46,37.09,37.09,0,0,0,10,6.17c3.11,1.41,4.82,2.19,6.12,4.93A10,10,0,0,1,153.69,96.18Z"/><path className="cls-1" d="M152.1,181.13H47.9c-11.08,0-20.09-9.88-20.09-22v-91a3.85,3.85,0,0,1,3.65-4,3.84,3.84,0,0,1,3.65,4v91c0,7.72,5.74,14,12.79,14H152.1c7.05,0,12.79-6.29,12.79-14v-91a3.67,3.67,0,1,1,7.3,0v91C172.19,171.25,163.18,181.13,152.1,181.13Z"/></svg>,
    },
    {
        id: 2,
        title: "Календарь мероприятий",
        to: '/exhibitions',
        exact: false,
        image: <svg id="Layer_1" className="header__nav-icon" width="30" height="30" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M156.44,180.5H43.56a23,23,0,0,1-23-23V60.17a23,23,0,0,1,23-23H156.44a23,23,0,0,1,23,23v97.32A23,23,0,0,1,156.44,180.5ZM43.56,45.15a15,15,0,0,0-15,15v97.32a15,15,0,0,0,15,15H156.44a15,15,0,0,0,15-15V60.17a15,15,0,0,0-15-15Z"/><path d="M52.59,56.53a4,4,0,0,1-4-4v-29a4,4,0,1,1,8,0v29A4,4,0,0,1,52.59,56.53Z"/><path d="M100,56.53a4,4,0,0,1-4-4v-29a4,4,0,0,1,8,0v29A4,4,0,0,1,100,56.53Z"/><path d="M147.41,56.53a4,4,0,0,1-4-4v-29a4,4,0,1,1,8,0v29A4,4,0,0,1,147.41,56.53Z"/><path d="M66.72,112.84H53.9a11,11,0,0,1-11-11V89.06a11,11,0,0,1,11-11H66.72a11,11,0,0,1,11,11v12.82A11,11,0,0,1,66.72,112.84ZM53.9,86.1a3,3,0,0,0-3,3v12.82a3,3,0,0,0,3,3H66.72a3,3,0,0,0,3-3V89.06a3,3,0,0,0-3-3Z"/><path d="M106.41,112.84H93.59a11,11,0,0,1-11-11V89.06a11,11,0,0,1,11-11h12.82a11,11,0,0,1,11,11v12.82A11,11,0,0,1,106.41,112.84ZM93.59,86.1a3,3,0,0,0-3,3v12.82a3,3,0,0,0,3,3h12.82a3,3,0,0,0,3-3V89.06a3,3,0,0,0-3-3Z"/><path d="M66.72,155.64H53.9a11,11,0,0,1-11-10.95V131.86a11,11,0,0,1,11-11H66.72a11,11,0,0,1,11,11v12.83A11,11,0,0,1,66.72,155.64ZM53.9,128.91a3,3,0,0,0-3,3v12.83a3,3,0,0,0,3,2.95H66.72a3,3,0,0,0,3-2.95V131.86a3,3,0,0,0-3-3Z"/><path d="M106.41,155.64H93.59a11,11,0,0,1-11-10.95V131.86a11,11,0,0,1,11-11h12.82a11,11,0,0,1,11,11v12.83A11,11,0,0,1,106.41,155.64ZM93.59,128.91a3,3,0,0,0-3,3v12.83a3,3,0,0,0,3,2.95h12.82a3,3,0,0,0,3-2.95V131.86a3,3,0,0,0-3-3Z"/><path d="M146.1,112.84H133.28a11,11,0,0,1-11-11V89.06a11,11,0,0,1,11-11H146.1a11,11,0,0,1,11,11v12.82A11,11,0,0,1,146.1,112.84ZM133.28,86.1a3,3,0,0,0-3,3v12.82a3,3,0,0,0,3,3H146.1a3,3,0,0,0,3-3V89.06a3,3,0,0,0-3-3Z"/></svg>,
    },
    {
        id: 3,
        title: "Специалисты",
        to: '/specialists',
        exact: true,
        image: <svg id="Layer_1" className="header__nav-icon" width="30" height="30" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M60.58,80.89A24.48,24.48,0,1,1,77.9,36a40.51,40.51,0,0,1,7.72-3.9A32.16,32.16,0,1,0,46.29,82.94c-9.2,1.75-17.08,5-20,10.34-2.76,5-5.83,15.13-9.12,30A3.85,3.85,0,1,0,24.67,125c3.9-17.65,6.7-25,8.36-28,2.07-3.77,13.48-7.77,30.71-8A40.44,40.44,0,0,1,60.58,80.89Z"/><path d="M154.38,170.9c-.32-2.05-8-50.41-15.6-64.13-2.93-5.34-10.81-8.6-20-10.34a32.18,32.18,0,1,0-37.54,0c-9.2,1.74-17.07,5-20,10.34-7.54,13.72-15.27,62.08-15.59,64.13a3.85,3.85,0,1,0,7.6,1.21c2.16-13.61,9-51.22,14.74-61.64,2.13-3.87,14.07-8,32.05-8s29.9,4.11,32,8c5.72,10.42,12.58,48,14.74,61.64a3.85,3.85,0,0,0,3.8,3.25,4.3,4.3,0,0,0,.61-.05A3.85,3.85,0,0,0,154.38,170.9ZM75.51,70.31A24.48,24.48,0,1,1,100,94.8,24.51,24.51,0,0,1,75.51,70.31Z"/><path d="M139.42,80.89A24.48,24.48,0,1,0,122.1,36a40.51,40.51,0,0,0-7.72-3.9,32.16,32.16,0,1,1,39.33,50.85c9.2,1.75,17.08,5,20,10.34,2.76,5,5.83,15.13,9.12,30a3.85,3.85,0,1,1-7.51,1.67c-3.9-17.65-6.7-25-8.36-28-2.07-3.77-13.48-7.77-30.71-8A40.44,40.44,0,0,0,139.42,80.89Z"/></svg>,
        disabled: true,
    },
    {
        id: 4,
        title: "Поиск по базе РКФ",
        to: '/base-search',
        exact: true,
        image: <svg id="Layer_1" className="header__nav-icon" width="30" height="30" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle cx="53.21" cy="74.3" r="5"/><circle cx="53.21" cy="110.04" r="5"/><circle cx="53.21" cy="145.78" r="5"/><path d="M125.78,163.06c-7.41.7-16,1.13-25.78,1.13-40.7,0-60.48-7.37-62-10.51V127.37A64.27,64.27,0,0,0,52.44,132c4.09.88,8.6,1.64,13.44,2.26a45.89,45.89,0,0,1-3.67-8.58c-15.41-2.43-23.3-6-24.26-7.9V91.48A64.84,64.84,0,0,0,52.44,96.1c3.05.66,6.34,1.25,9.81,1.77a45.78,45.78,0,0,1,3.16-7.61C47.88,87.84,39,84,38,81.88V55.58A64.32,64.32,0,0,0,52.44,60.2C65.19,63,82.08,64.5,100,64.5s34.81-1.53,47.56-4.3a64.32,64.32,0,0,0,14.49-4.62v26.3c-.77,1.55-6,4.12-15.88,6.33a45.67,45.67,0,0,1,3.55,7.4,60,60,0,0,0,12.33-4.13v26.3c-.62,1.25-4.15,3.18-10.74,5-.14.57-.27,1.15-.43,1.72l5.2,5.2a45.82,45.82,0,0,0,6-2.37v8.34l8,8V46.16c0-6.17-7.35-10.77-22.49-14-12.75-2.77-29.64-4.3-47.56-4.3s-34.81,1.53-47.56,4.3C37.3,35.39,30,40,30,46.16V153.84c0,6.17,7.35,10.77,22.49,14,12.75,2.77,29.64,4.3,47.56,4.3a274.43,274.43,0,0,0,33-1.89ZM100,35.81c40,0,59.78,7.11,62,10.35-2.18,3.23-22,10.34-62,10.34S40.22,49.39,38,46.16C40.22,42.92,60,35.81,100,35.81Z"/><path d="M169.16,154.13l-27.48-27.48a38.25,38.25,0,1,0-20.5,20.5l27.48,27.48a14.5,14.5,0,0,0,20.5-20.5ZM85,133.26a30.29,30.29,0,1,1,42.84,0A30.33,30.33,0,0,1,85,133.26Zm48.5,5.66a38.47,38.47,0,0,0,4.19-5l3.11,3.1-9.19,9.19-3.1-3.11A39.29,39.29,0,0,0,133.45,138.92ZM163.5,169a6.52,6.52,0,0,1-9.18,0l-17.1-17.1,9.18-9.18,17.1,17.1a6.52,6.52,0,0,1,0,9.18Z"/></svg>,
    },
    {
        id: 5,
        title: "O RKF.Online",
        to: '/about',
        exact: false,
        image: <svg id="Layer_1" className="header__nav-icon" width="30" height="30" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><path d="M139.56,152.52H60.4A12.94,12.94,0,0,1,47.48,139.6V60.44A12.93,12.93,0,0,1,60.4,47.53h79.16a12.93,12.93,0,0,1,12.92,12.91V139.6A12.94,12.94,0,0,1,139.56,152.52ZM60.4,54.31a6.14,6.14,0,0,0-6.13,6.13V139.6a6.14,6.14,0,0,0,6.13,6.13h79.16a6.14,6.14,0,0,0,6.13-6.13V60.44a6.14,6.14,0,0,0-6.13-6.13Z"/><path d="M126.74,137.74H73.22a11,11,0,0,1-11-11V73.26a11,11,0,0,1,11-11h53.52a11,11,0,0,1,11,11v53.52A11,11,0,0,1,126.74,137.74ZM73.22,69.08A4.19,4.19,0,0,0,69,73.26v53.52A4.19,4.19,0,0,0,73.22,131h53.52a4.19,4.19,0,0,0,4.18-4.18V73.26a4.19,4.19,0,0,0-4.18-4.18Z"/><path d="M109,120H90.94A11,11,0,0,1,80,109.06V91A11,11,0,0,1,90.94,80H109A11,11,0,0,1,120,91v18.08A11,11,0,0,1,109,120ZM90.94,86.82A4.17,4.17,0,0,0,86.78,91v18.08a4.17,4.17,0,0,0,4.16,4.16H109a4.17,4.17,0,0,0,4.16-4.16V91A4.17,4.17,0,0,0,109,86.82Z"/><path d="M39.8,143.91H27.59a3.39,3.39,0,0,1,0-6.78H39.8a3.39,3.39,0,0,1,0,6.78Z"/><path d="M39.8,127.7H27.59a3.39,3.39,0,1,1,0-6.78H39.8a3.39,3.39,0,1,1,0,6.78Z"/><path d="M39.8,111.49H27.59a3.39,3.39,0,1,1,0-6.78H39.8a3.39,3.39,0,1,1,0,6.78Z"/><path d="M39.8,95.29H27.59a3.39,3.39,0,1,1,0-6.78H39.8a3.39,3.39,0,1,1,0,6.78Z"/><path d="M39.8,79.08H27.59a3.39,3.39,0,1,1,0-6.78H39.8a3.39,3.39,0,1,1,0,6.78Z"/><path d="M39.8,62.87H27.59a3.39,3.39,0,0,1,0-6.78H39.8a3.39,3.39,0,1,1,0,6.78Z"/><path d="M172.41,143.91H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z"/><path d="M172.41,127.7H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z"/><path d="M172.41,111.49H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z"/><path d="M172.41,95.29H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z"/><path d="M172.41,79.08H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z"/><path d="M172.41,62.87H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z"/><path d="M59.48,43.19a3.39,3.39,0,0,1-3.39-3.39V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,59.48,43.19Z"/><path d="M75.69,43.19A3.39,3.39,0,0,1,72.3,39.8V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,75.69,43.19Z"/><path d="M91.9,43.19a3.39,3.39,0,0,1-3.39-3.39V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,91.9,43.19Z"/><path d="M108.1,43.19a3.39,3.39,0,0,1-3.39-3.39V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,108.1,43.19Z"/><path d="M124.31,43.19a3.39,3.39,0,0,1-3.39-3.39V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,124.31,43.19Z"/><path d="M140.52,43.19a3.39,3.39,0,0,1-3.39-3.39V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,140.52,43.19Z"/><path d="M59.48,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,0,1,6.78,0v12.21A3.39,3.39,0,0,1,59.48,175.8Z"/><path d="M75.69,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,0,1,6.78,0v12.21A3.39,3.39,0,0,1,75.69,175.8Z"/><path d="M91.9,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,0,1,6.78,0v12.21A3.39,3.39,0,0,1,91.9,175.8Z"/><path d="M108.1,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,0,1,6.78,0v12.21A3.39,3.39,0,0,1,108.1,175.8Z"/><path d="M124.31,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,0,1,6.78,0v12.21A3.39,3.39,0,0,1,124.31,175.8Z"/><path d="M140.52,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,1,1,6.78,0v12.21A3.39,3.39,0,0,1,140.52,175.8Z"/></svg>,
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
    userAvatar: '/static/icons/default/user-avatar.svg',
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
    responsiveSliderConfig,
    DEFAULT_PHONE_INPUT_MASK,
    DEFAULT_PHONE_INPUT_PLACEHOLDER,
    DEFAULT_EMAIL_INPUT_PLACEHOLDER,
    LOGIN_URL,
    REGISTRATION_URL,
    DEFAULT_IMG,
    BAD_SITES
}
