import React from 'react';
import * as LoadableModules from './appModules';

const SERVER = 'http://dev.uep24.ru';
const DEFAULT_PHONE_INPUT_MASK = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
const DEFAULT_PHONE_INPUT_PLACEHOLDER = '+7(   )___-__-__';
const DEFAULT_EMAIL_INPUT_PLACEHOLDER = 'Введите ваш E-mail';
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
        path: '/confirm-password-success',
        component: LoadableModules.LoadableConfirmPasswordSuccess
    },
    {
        exact: true,
        path: '/confirm-password-failed',
        component: LoadableModules.LoadableConfirmPasswordFailed
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
        path: '/bank-details',
        component: LoadableModules.LoadableBankDetails
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
        path: '/specialists',
        component: LoadableModules.LoadableSpecialists
    },
    {
        exact: false,
        path: '/educationals/:id',
        component: LoadableModules.LoadableEducational
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
        path: '/user/:route',
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
        exact: true,
        path: ['/:route/news-feed/:id?', '/kennel/:route/news-feed/:id?', '/user/:route/news-feed/:id?'],
        component: LoadableModules.LoadableNewsFeed
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
        path: '/docs/:id',
        component: LoadableModules.LoadableDocumentsPage
    },
    {
        exact: true,
        path: '/details-viewer/:id',
        component: LoadableModules.LoadableDetailsViewer
    },
    {
        exact: true,
        path: '/pedigree-viewer/:id',
        component: LoadableModules.LoadablePedigreeViewer
    },
    {
        exact: true,
        path: '/:route',
        component: LoadableModules.LoadableClubPage
    },
    {
        exact: false,
        path: '/:route/uploaded-documents/',
        component: LoadableModules.LoadableClubUploadedDocuments
    },
    {
        exact: false,
        path: '/kennel/:route/uploaded-documents/',
        component: LoadableModules.LoadableNurseryUploadedDocuments
    },
    {
        exact: false,
        path: '/user/:route/uploaded-documents/',
        component: LoadableModules.LoadableUserUploadedDocuments
    }
];

const mainNav = [
    {
        id: 1,
        title: 'Кинологические организации',
        name: 'Организации',
        to: '/organizations',
        exact: true,
        image: <svg id='Layer_1' className='header__nav-icon' width='30' height='30' data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
            <path
                d='M179.38,78.68a3.42,3.42,0,0,1-2-.65l-64.56-46.2a21.79,21.79,0,0,0-25.66,0L22.61,78a3.46,3.46,0,0,1-5.05-1.16,4.23,4.23,0,0,1,1.06-5.54L83.18,25.14a28.51,28.51,0,0,1,33.64,0l64.56,46.19a4.23,4.23,0,0,1,1.06,5.54A3.57,3.57,0,0,1,179.38,78.68Z' />
            <circle
                cx='115.01' cy='96.56' r='4.58' />
            <circle cx='85.07' cy='96.56' r='4.58' />
            <path
                d='M148.82,81.76a31.91,31.91,0,0,1-8.72-5.35,27,27,0,0,1-3.57-3.8A13,13,0,0,0,130.75,68c-4.06-1.66-9.33-1.84-12.26-.41a5.59,5.59,0,0,0-.6.35C113,65.37,107,64.09,100.1,64.15H100c-.24,0-.46,0-.71,0v0a37.82,37.82,0,0,0-17.49,3.62l-.34-.19c-2.93-1.42-8.2-1.25-12.26.41a13,13,0,0,0-5.78,4.61,27,27,0,0,1-3.57,3.8,31.91,31.91,0,0,1-8.72,5.35c-3.38,1.53-6.57,3-8.7,7.46a15.15,15.15,0,0,0-1.41,7.23c.34,6.39,3.81,11,7.51,14.93.83.89,1.5,1.6,2.06,2.18,2.12,2.24,2.3,2.43,3.25,4.38a22.56,22.56,0,0,1,1.83,6c.37,1.94.79,4.13,3,4.62a2.84,2.84,0,0,0,.69.08,3.65,3.65,0,0,0,2.14-.74c2.34-1.68,4.56-6.53,5.12-11.13,2.24,8.28,5.93,17.27,9.26,19.69l0-.08a17.27,17.27,0,0,0,9.67,8.14,11.36,11.36,0,0,0,1.28.31l-.06,0a12.16,12.16,0,0,0,2.76,2.79v2.49a10.42,10.42,0,1,0,20.84,0v-2.49a12.19,12.19,0,0,0,2.76-2.8l-.08-.06a7.86,7.86,0,0,0,1.26-.27,17,17,0,0,0,10.07-8.95c3.25-3.48,6.65-12.34,8.64-20.18.06.37.13.73.17,1.11.51,4.68,2.77,9.68,5.16,11.4a3.65,3.65,0,0,0,2.14.74,2.84,2.84,0,0,0,.69-.08c2.21-.49,2.63-2.68,3-4.62a22.56,22.56,0,0,1,1.83-6c.95-2,1.13-2.14,3.25-4.38.56-.58,1.23-1.29,2.06-2.18,3.7-4,7.17-8.54,7.51-14.93a15.15,15.15,0,0,0-1.41-7.23C155.39,84.74,152.2,83.29,148.82,81.76ZM61.5,116a17.43,17.43,0,0,1-1.15,4.57,24.66,24.66,0,0,0-1.75-4.88A17.71,17.71,0,0,0,54.44,110l-2-2.15c-4.24-4.57-5.9-7.72-6.1-11.63a10,10,0,0,1,.91-4.72c1.3-2.74,3-3.52,6.12-4.93a37.09,37.09,0,0,0,10-6.17,31.7,31.7,0,0,0,4.21-4.46,7.9,7.9,0,0,1,3.69-3.05,13.48,13.48,0,0,1,4.62-1c-.26.23-.53.44-.78.68-6.4,6.25-9.89,15.93-10.42,28.77-.32,1.59-.73,3.17-1.16,4.84A67,67,0,0,0,61.5,116ZM100,155.34a5.18,5.18,0,0,1-5.17-5.18v-6.9a21,21,0,0,0,2.55-1.71v4.72a2.61,2.61,0,0,0,2.62,2.61h0a2.62,2.62,0,0,0,2.62-2.62v-4.81a26.91,26.91,0,0,0,2.57,1.48v7.23A5.19,5.19,0,0,1,100,155.34Zm25.07-32a28.45,28.45,0,0,0-4.73-8.37l-.13-.17a2.62,2.62,0,1,0-4.22,3.1l.12.17c3.08,4.2,5.52,7.52,4.06,13.86-.89,3.88-4.46,6.66-7.4,7.61-1.4.45-4.54-.65-7.48-2.62a7.5,7.5,0,0,1-.81-.69c-.28-.27-.55-.53-.8-.79-.44-.45-.8-.86-1.06-1.18v-3.39a44.4,44.4,0,0,0,5.07-5.19,6.86,6.86,0,0,0,1.58-6.41,4.26,4.26,0,0,0-.33-.88c-1.89-3.52-16-3.52-17.87,0a3.76,3.76,0,0,0-.34.88,6.88,6.88,0,0,0,1.58,6.41,45.25,45.25,0,0,0,5.07,5.19v3.4c-.26.31-.62.72-1.07,1.18a16.43,16.43,0,0,1-5.13,3.77,6.66,6.66,0,0,1-2,.52H89a4.23,4.23,0,0,1-1.73-.21c-2.94-1-6.51-3.74-7.4-7.61-1.46-6.33,1-9.65,4.06-13.86l.69-.94a2.62,2.62,0,1,0-4.24-3.08l-.67.92c-2,2.68-4.08,5.58-5,9.35-2.51-6.36-4.88-14.91-4.87-19.7,0-13,3-22.57,8.91-28.32C83.18,72,89.47,69.68,97.4,69.42a45.22,45.22,0,0,1,11.95,1c.82.19,1.64.41,2.44.65.46.14.92.29,1.37.47a23.82,23.82,0,0,1,4.49,2.31c.54.36,1.07.75,1.58,1.16.26.21.51.42.75.64s.46.54.71.66c5.9,5.76,8.89,15.28,8.92,28.32C129.61,109.17,127.48,117.11,125.11,123.35Zm28.58-27.17c-.2,3.91-1.86,7.06-6.1,11.63l-2,2.15a17.71,17.71,0,0,0-4.16,5.68,24.66,24.66,0,0,0-1.75,4.88A17.43,17.43,0,0,1,138.5,116a47.87,47.87,0,0,0-2.24-9.38,52.37,52.37,0,0,1-1.49-5.35c-.54-12.79-4-22.43-10.41-28.67-.25-.24-.54-.45-.8-.69a13.9,13.9,0,0,1,5.2,1,7.9,7.9,0,0,1,3.69,3.05,31.7,31.7,0,0,0,4.21,4.46,37.09,37.09,0,0,0,10,6.17c3.11,1.41,4.82,2.19,6.12,4.93A10,10,0,0,1,153.69,96.18Z' />
            <path
                className='cls-1'
                d='M152.1,181.13H47.9c-11.08,0-20.09-9.88-20.09-22v-91a3.85,3.85,0,0,1,3.65-4,3.84,3.84,0,0,1,3.65,4v91c0,7.72,5.74,14,12.79,14H152.1c7.05,0,12.79-6.29,12.79-14v-91a3.67,3.67,0,1,1,7.3,0v91C172.19,171.25,163.18,181.13,152.1,181.13Z' />
        </svg>
    },
    {
        id: 2,
        title: 'Календарь мероприятий',
        name: 'Календарь',
        to: '/exhibitions',
        exact: false,
        image: <svg id='Layer_1' className='header__nav-icon' width='30' height='30' data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
            <path
                d='M156.44,180.5H43.56a23,23,0,0,1-23-23V60.17a23,23,0,0,1,23-23H156.44a23,23,0,0,1,23,23v97.32A23,23,0,0,1,156.44,180.5ZM43.56,45.15a15,15,0,0,0-15,15v97.32a15,15,0,0,0,15,15H156.44a15,15,0,0,0,15-15V60.17a15,15,0,0,0-15-15Z' />
            <path
                d='M52.59,56.53a4,4,0,0,1-4-4v-29a4,4,0,1,1,8,0v29A4,4,0,0,1,52.59,56.53Z' />
            <path
                d='M100,56.53a4,4,0,0,1-4-4v-29a4,4,0,0,1,8,0v29A4,4,0,0,1,100,56.53Z' />
            <path
                d='M147.41,56.53a4,4,0,0,1-4-4v-29a4,4,0,1,1,8,0v29A4,4,0,0,1,147.41,56.53Z' />
            <path
                d='M66.72,112.84H53.9a11,11,0,0,1-11-11V89.06a11,11,0,0,1,11-11H66.72a11,11,0,0,1,11,11v12.82A11,11,0,0,1,66.72,112.84ZM53.9,86.1a3,3,0,0,0-3,3v12.82a3,3,0,0,0,3,3H66.72a3,3,0,0,0,3-3V89.06a3,3,0,0,0-3-3Z' />
            <path
                d='M106.41,112.84H93.59a11,11,0,0,1-11-11V89.06a11,11,0,0,1,11-11h12.82a11,11,0,0,1,11,11v12.82A11,11,0,0,1,106.41,112.84ZM93.59,86.1a3,3,0,0,0-3,3v12.82a3,3,0,0,0,3,3h12.82a3,3,0,0,0,3-3V89.06a3,3,0,0,0-3-3Z' />
            <path
                d='M66.72,155.64H53.9a11,11,0,0,1-11-10.95V131.86a11,11,0,0,1,11-11H66.72a11,11,0,0,1,11,11v12.83A11,11,0,0,1,66.72,155.64ZM53.9,128.91a3,3,0,0,0-3,3v12.83a3,3,0,0,0,3,2.95H66.72a3,3,0,0,0,3-2.95V131.86a3,3,0,0,0-3-3Z' />
            <path
                d='M106.41,155.64H93.59a11,11,0,0,1-11-10.95V131.86a11,11,0,0,1,11-11h12.82a11,11,0,0,1,11,11v12.83A11,11,0,0,1,106.41,155.64ZM93.59,128.91a3,3,0,0,0-3,3v12.83a3,3,0,0,0,3,2.95h12.82a3,3,0,0,0,3-2.95V131.86a3,3,0,0,0-3-3Z' />
            <path
                d='M146.1,112.84H133.28a11,11,0,0,1-11-11V89.06a11,11,0,0,1,11-11H146.1a11,11,0,0,1,11,11v12.82A11,11,0,0,1,146.1,112.84ZM133.28,86.1a3,3,0,0,0-3,3v12.82a3,3,0,0,0,3,3H146.1a3,3,0,0,0,3-3V89.06a3,3,0,0,0-3-3Z' />
        </svg>
    },
    {
        id: 3,
        title: 'Специалисты',
        name: 'Специалисты',
        to: '/',
        disabled: true,
        exact: true,
        image: <svg id='Layer_1' className='header__nav-icon' width='30' height='30' data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
            <path
                d='M60.58,80.89A24.48,24.48,0,1,1,77.9,36a40.51,40.51,0,0,1,7.72-3.9A32.16,32.16,0,1,0,46.29,82.94c-9.2,1.75-17.08,5-20,10.34-2.76,5-5.83,15.13-9.12,30A3.85,3.85,0,1,0,24.67,125c3.9-17.65,6.7-25,8.36-28,2.07-3.77,13.48-7.77,30.71-8A40.44,40.44,0,0,1,60.58,80.89Z' />
            <path
                d='M154.38,170.9c-.32-2.05-8-50.41-15.6-64.13-2.93-5.34-10.81-8.6-20-10.34a32.18,32.18,0,1,0-37.54,0c-9.2,1.74-17.07,5-20,10.34-7.54,13.72-15.27,62.08-15.59,64.13a3.85,3.85,0,1,0,7.6,1.21c2.16-13.61,9-51.22,14.74-61.64,2.13-3.87,14.07-8,32.05-8s29.9,4.11,32,8c5.72,10.42,12.58,48,14.74,61.64a3.85,3.85,0,0,0,3.8,3.25,4.3,4.3,0,0,0,.61-.05A3.85,3.85,0,0,0,154.38,170.9ZM75.51,70.31A24.48,24.48,0,1,1,100,94.8,24.51,24.51,0,0,1,75.51,70.31Z' />
            <path
                d='M139.42,80.89A24.48,24.48,0,1,0,122.1,36a40.51,40.51,0,0,0-7.72-3.9,32.16,32.16,0,1,1,39.33,50.85c9.2,1.75,17.08,5,20,10.34,2.76,5,5.83,15.13,9.12,30a3.85,3.85,0,1,1-7.51,1.67c-3.9-17.65-6.7-25-8.36-28-2.07-3.77-13.48-7.77-30.71-8A40.44,40.44,0,0,0,139.42,80.89Z' />
        </svg>
    },
    {
        id: 4,
        title: 'Поиск по базе РКФ',
        name: 'Поиск по базе РКФ',
        to: '/base-search',
        exact: true,
        image: <svg id='Layer_1' className='header__nav-icon' width='30' height='30' data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
            <circle cx='53.21' cy='74.3' r='5' />
            <circle
                cx='53.21' cy='110.04' r='5' />
            <circle cx='53.21' cy='145.78' r='5' />
            <path
                d='M125.78,163.06c-7.41.7-16,1.13-25.78,1.13-40.7,0-60.48-7.37-62-10.51V127.37A64.27,64.27,0,0,0,52.44,132c4.09.88,8.6,1.64,13.44,2.26a45.89,45.89,0,0,1-3.67-8.58c-15.41-2.43-23.3-6-24.26-7.9V91.48A64.84,64.84,0,0,0,52.44,96.1c3.05.66,6.34,1.25,9.81,1.77a45.78,45.78,0,0,1,3.16-7.61C47.88,87.84,39,84,38,81.88V55.58A64.32,64.32,0,0,0,52.44,60.2C65.19,63,82.08,64.5,100,64.5s34.81-1.53,47.56-4.3a64.32,64.32,0,0,0,14.49-4.62v26.3c-.77,1.55-6,4.12-15.88,6.33a45.67,45.67,0,0,1,3.55,7.4,60,60,0,0,0,12.33-4.13v26.3c-.62,1.25-4.15,3.18-10.74,5-.14.57-.27,1.15-.43,1.72l5.2,5.2a45.82,45.82,0,0,0,6-2.37v8.34l8,8V46.16c0-6.17-7.35-10.77-22.49-14-12.75-2.77-29.64-4.3-47.56-4.3s-34.81,1.53-47.56,4.3C37.3,35.39,30,40,30,46.16V153.84c0,6.17,7.35,10.77,22.49,14,12.75,2.77,29.64,4.3,47.56,4.3a274.43,274.43,0,0,0,33-1.89ZM100,35.81c40,0,59.78,7.11,62,10.35-2.18,3.23-22,10.34-62,10.34S40.22,49.39,38,46.16C40.22,42.92,60,35.81,100,35.81Z' />
            <path
                d='M169.16,154.13l-27.48-27.48a38.25,38.25,0,1,0-20.5,20.5l27.48,27.48a14.5,14.5,0,0,0,20.5-20.5ZM85,133.26a30.29,30.29,0,1,1,42.84,0A30.33,30.33,0,0,1,85,133.26Zm48.5,5.66a38.47,38.47,0,0,0,4.19-5l3.11,3.1-9.19,9.19-3.1-3.11A39.29,39.29,0,0,0,133.45,138.92ZM163.5,169a6.52,6.52,0,0,1-9.18,0l-17.1-17.1,9.18-9.18,17.1,17.1a6.52,6.52,0,0,1,0,9.18Z' />
        </svg>
    },
    {
        id: 5,
        title: 'O RKF.Online',
        name: 'O RKF.Online',
        to: '/about',
        exact: false,
        image: <svg id='Layer_1' className='header__nav-icon' width='30' height='30' data-name='Layer 1'
                    xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'>
            <path
                d='M139.56,152.52H60.4A12.94,12.94,0,0,1,47.48,139.6V60.44A12.93,12.93,0,0,1,60.4,47.53h79.16a12.93,12.93,0,0,1,12.92,12.91V139.6A12.94,12.94,0,0,1,139.56,152.52ZM60.4,54.31a6.14,6.14,0,0,0-6.13,6.13V139.6a6.14,6.14,0,0,0,6.13,6.13h79.16a6.14,6.14,0,0,0,6.13-6.13V60.44a6.14,6.14,0,0,0-6.13-6.13Z' />
            <path
                d='M126.74,137.74H73.22a11,11,0,0,1-11-11V73.26a11,11,0,0,1,11-11h53.52a11,11,0,0,1,11,11v53.52A11,11,0,0,1,126.74,137.74ZM73.22,69.08A4.19,4.19,0,0,0,69,73.26v53.52A4.19,4.19,0,0,0,73.22,131h53.52a4.19,4.19,0,0,0,4.18-4.18V73.26a4.19,4.19,0,0,0-4.18-4.18Z' />
            <path
                d='M109,120H90.94A11,11,0,0,1,80,109.06V91A11,11,0,0,1,90.94,80H109A11,11,0,0,1,120,91v18.08A11,11,0,0,1,109,120ZM90.94,86.82A4.17,4.17,0,0,0,86.78,91v18.08a4.17,4.17,0,0,0,4.16,4.16H109a4.17,4.17,0,0,0,4.16-4.16V91A4.17,4.17,0,0,0,109,86.82Z' />
            <path
                d='M39.8,143.91H27.59a3.39,3.39,0,0,1,0-6.78H39.8a3.39,3.39,0,0,1,0,6.78Z' />
            <path
                d='M39.8,127.7H27.59a3.39,3.39,0,1,1,0-6.78H39.8a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M39.8,111.49H27.59a3.39,3.39,0,1,1,0-6.78H39.8a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M39.8,95.29H27.59a3.39,3.39,0,1,1,0-6.78H39.8a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M39.8,79.08H27.59a3.39,3.39,0,1,1,0-6.78H39.8a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M39.8,62.87H27.59a3.39,3.39,0,0,1,0-6.78H39.8a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M172.41,143.91H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M172.41,127.7H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M172.41,111.49H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M172.41,95.29H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M172.41,79.08H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M172.41,62.87H160.2a3.39,3.39,0,1,1,0-6.78h12.21a3.39,3.39,0,1,1,0,6.78Z' />
            <path
                d='M59.48,43.19a3.39,3.39,0,0,1-3.39-3.39V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,59.48,43.19Z' />
            <path
                d='M75.69,43.19A3.39,3.39,0,0,1,72.3,39.8V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,75.69,43.19Z' />
            <path
                d='M91.9,43.19a3.39,3.39,0,0,1-3.39-3.39V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,91.9,43.19Z' />
            <path
                d='M108.1,43.19a3.39,3.39,0,0,1-3.39-3.39V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,108.1,43.19Z' />
            <path
                d='M124.31,43.19a3.39,3.39,0,0,1-3.39-3.39V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,124.31,43.19Z' />
            <path
                d='M140.52,43.19a3.39,3.39,0,0,1-3.39-3.39V27.59a3.39,3.39,0,1,1,6.78,0V39.8A3.39,3.39,0,0,1,140.52,43.19Z' />
            <path
                d='M59.48,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,0,1,6.78,0v12.21A3.39,3.39,0,0,1,59.48,175.8Z' />
            <path
                d='M75.69,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,0,1,6.78,0v12.21A3.39,3.39,0,0,1,75.69,175.8Z' />
            <path
                d='M91.9,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,0,1,6.78,0v12.21A3.39,3.39,0,0,1,91.9,175.8Z' />
            <path
                d='M108.1,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,0,1,6.78,0v12.21A3.39,3.39,0,0,1,108.1,175.8Z' />
            <path
                d='M124.31,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,0,1,6.78,0v12.21A3.39,3.39,0,0,1,124.31,175.8Z' />
            <path
                d='M140.52,175.8a3.39,3.39,0,0,1-3.39-3.39V160.2a3.39,3.39,0,1,1,6.78,0v12.21A3.39,3.39,0,0,1,140.52,175.8Z' />
        </svg>
    },
    {
        id: 6,
        title: 'Записаться',
        name: 'Записаться',
        to: '/booking',
        disabled: true,
        exact: false,
        image: <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M17.9238 6.3894H7.11886C6.5516 6.3894 6.1059 6.83511 6.1059 7.40237C6.1059 7.96963 6.56511 8.41534 7.11886 8.41534H17.9238C18.4776 8.41534 18.9368 7.95612 18.9368 7.40237C18.9368 6.84862 18.4776 6.3894 17.9238 6.3894Z'
                fill='#8F989D' />
            <path
                d='M11.9136 14.9389L12.2782 14.5742H7.11886C6.56511 14.5742 6.1059 15.0334 6.1059 15.5872C6.1059 16.1409 6.56511 16.6002 7.11886 16.6002H12.0486L11.9136 14.9389Z'
                fill='#8F989D' />
            <path
                d='M7.11886 18.6667C6.56511 18.6667 6.1059 19.126 6.1059 19.6797C6.1059 20.2335 6.56511 20.6927 7.11886 20.6927H10.644C11.1977 20.6927 11.657 20.2335 11.657 19.6797C11.657 19.126 11.1977 18.6667 10.644 18.6667H7.11886Z'
                fill='#8F989D' />
            <path
                d='M7.11886 12.5079H14.3582L16.3841 10.4819H7.11886C6.56511 10.4819 6.1059 10.9411 6.1059 11.4949C6.1059 12.0487 6.5516 12.5079 7.11886 12.5079Z'
                fill='#8F989D' />
            <path
                d='M21.1383 17.0189V24.0827C21.1383 24.5824 20.7331 24.9876 20.2334 24.9876H4.93085C4.43112 24.9876 4.02593 24.5824 4.02593 24.0827V4.93085C4.02593 4.43112 4.43112 4.02593 4.93085 4.02593H20.2469C20.7466 4.02593 21.1518 4.43112 21.1518 4.93085V6.01134C21.6515 5.76823 22.2053 5.61966 22.7726 5.61966C22.9076 5.61966 23.0427 5.64668 23.1777 5.66018V4.93085C23.1777 3.3101 21.8676 2 20.2469 2H4.93085C3.3101 2 2 3.3101 2 4.93085V24.0692C2 25.6764 3.3101 27 4.93085 27H20.2469C21.8676 27 23.1777 25.6899 23.1777 24.0692V14.993L21.1383 17.0189Z'
                fill='#8F989D' />
            <path
                d='M17.2755 19.8013L13.0211 19.4906L12.7104 15.2362L20.7061 7.24049C21.8542 6.09246 23.7045 6.10596 24.839 7.24049L25.2712 7.67268C25.825 8.22644 26.1221 8.95577 26.1221 9.73913C26.1221 10.5225 25.8115 11.2518 25.2712 11.8056L17.2755 19.8013ZM14.912 17.5998L16.4922 17.7213L23.8261 10.3874C24.0016 10.2119 24.0962 9.99575 24.0962 9.75264C24.0962 9.50953 24.0016 9.27992 23.8261 9.11785L23.3939 8.68565C23.0427 8.33449 22.4754 8.33449 22.1243 8.68565L14.7904 16.0195L14.912 17.5998Z'
                fill='#8F989D' />
        </svg>
    }
];

const footerNav = [
    {
        id: 1,
        title: 'Главная',
        to: '/',
        image: <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M21 11L11 2L1 11' stroke='#90999E' strokeWidth='1.32' strokeMiterlimit='10'
                  strokeLinejoin='round' />
            <path d='M3 9.5V21H8.33333V13.9286H13.6667V21H19V9.5' stroke='#90999E' strokeWidth='1.32'
                  strokeMiterlimit='10' strokeLinejoin='round' />
        </svg>
    },

    {
        id: 2,
        title: 'Чат',
        to: '',
        image: <svg width='22' height='20' viewBox='0 0 22 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M21 1.86957L21 14.913C21 15.3913 20.6087 15.7826 20.1304 15.7826H6.21739L1 19.2609V15.7826L1 1.86957C1 1.3913 1.39131 1 1.86957 1H20.1304C20.6087 1 21 1.3913 21 1.86957Z'
                stroke='#90999E' strokeWidth='1.32' strokeMiterlimit='10' strokeLinejoin='round' />
        </svg>
    },
    {
        id: 3,
        title: 'Профиль',
        to: '',
        image: <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z'
                stroke='#979797' strokeWidth='1.32' strokeMiterlimit='10'
                strokeLinejoin='round' />
            <path
                d='M4.18259 18.3131C5.29563 15.8087 7.93041 14.0435 11 14.0435C14.0695 14.0435 16.7043 15.8087 17.8174 18.3131'
                stroke='#979797' strokeWidth='1.32' strokeMiterlimit='10' strokeLinejoin='round' />
            <path
                d='M11 11.7217C13.0795 11.7217 14.7652 10.036 14.7652 7.95653C14.7652 5.87706 13.0795 4.19131 11 4.19131C8.92051 4.19131 7.23477 5.87706 7.23477 7.95653C7.23477 10.036 8.92051 11.7217 11 11.7217Z'
                stroke='#979797' strokeWidth='1.32' strokeMiterlimit='10' strokeLinejoin='round' />
        </svg>


    },
    {
        id: 4,
        title: 'Мое меню',
        to: '',
        image: <svg width='28' height='22' viewBox='0 0 28 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z'
                stroke='#979797' strokeWidth='1.32' strokeMiterlimit='10' strokeLinecap='round'
                strokeLinejoin='round' />
            <path d='M5.78261 7.08694H16.2174' stroke='#979797' strokeWidth='1.32' strokeMiterlimit='10' />
            <path d='M5.78261 11H16.2174' stroke='#979797' strokeWidth='1.32' strokeMiterlimit='10'
                  strokeLinejoin='round' />
            <path d='M5.78261 14.9131H16.2174' stroke='#979797' strokeWidth='1.32' strokeMiterlimit='10'
                  strokeLinejoin='round' />
        </svg>
    },
    {
        id: 5,
        title: 'Еще',
        to: '',
        image: <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M5.04099 13.8913C3.99341 13.5411 3.42809 12.4079 3.7783 11.3604C4.12852 10.3128 5.26165 9.74745 6.30923 10.0977C7.35681 10.4479 7.92214 11.581 7.57192 12.6286C7.40374 13.1317 7.04261 13.5473 6.56797 13.7841C6.09333 14.0209 5.54406 14.0595 5.04099 13.8913ZM11.3655 13.8968C10.318 13.5466 9.75264 12.4135 10.1029 11.3659C10.4531 10.3183 11.5862 9.753 12.6338 10.1032C13.6814 10.4534 14.2467 11.5866 13.8965 12.6341C13.7283 13.1372 13.3672 13.5529 12.8925 13.7897C12.4179 14.0265 11.8686 14.065 11.3655 13.8968ZM17.6901 13.9024C16.6425 13.5522 16.0772 12.419 16.4274 11.3715C16.7776 10.3239 17.9108 9.75855 18.9583 10.1088C20.0059 10.459 20.5712 11.5921 20.221 12.6397C20.0528 13.1428 19.6917 13.5584 19.2171 13.7952C18.7424 14.032 18.1932 14.0706 17.6901 13.9024Z'
                fill='#979797' />
        </svg>

    },
    {
        id: 6,
        title: 'Записаться',
        name: 'Записаться',
        to: '/booking',
        disabled: true,
        exact: false,
        image: <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M17.6608 4.82128V2.66961C17.6608 1.7525 16.92 1 15.9912 1H2.66961C1.74074 1 1 1.74074 1 2.66961V19.3304C1 20.2475 1.74074 21 2.66961 21H16.0029C16.92 21 17.6725 20.2593 17.6725 19.3304V10.1123'
                stroke='#8F989D' strokeWidth='1.32' strokeMiterlimit='10' strokeLinejoin='round' />
            <path
                d='M10.5356 14.5215L13.0753 14.7096L19.7537 8.03118C20.4004 7.3845 20.4004 6.3263 19.7537 5.67962L19.3775 5.30337C18.7308 4.65669 17.6726 4.65669 17.0259 5.30337L10.3475 11.9818L10.5356 14.5215Z'
                stroke='#8F989D' strokeWidth='1.32' strokeMiterlimit='10' strokeLinejoin='round' />
            <path d='M4.57434 4.82129H13.9806' stroke='#8F989D' strokeWidth='1.32' strokeMiterlimit='10'
                  strokeLinejoin='round' />
            <path d='M4.57434 8.38391H13.522' stroke='#8F989D' strokeWidth='1.32' strokeMiterlimit='10'
                  strokeLinejoin='round' />
            <path d='M4.57434 11.9465H10.3474' stroke='#8F989D' strokeWidth='1.32' strokeMiterlimit='10'
                  strokeLinejoin='round' />
            <path d='M4.57434 15.5092H8.24277' stroke='#8F989D' strokeWidth='1.32' strokeMiterlimit='10'
                  strokeLinejoin='round' />
        </svg>

    },
    {
        id: 7,
        title: 'Вход',
        name: 'Вход',
        to: '/auth/login',
        disabled: false,
        exact: false,
        image: <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M14.7096 17.7255L20.6898 11.7367C20.7846 11.6419 20.8621 11.5213 20.9138 11.392C20.9655 11.2628 20.9914 11.1249 20.9914 10.987C20.9914 10.8491 20.9655 10.7113 20.9138 10.582C20.8621 10.4528 20.7846 10.3407 20.6898 10.2373L14.7096 4.24854'
                stroke='#90999E' strokeWidth='1.32' strokeMiterlimit='10' strokeLinejoin='round' />
            <path d='M5.75659 10.9956H21' stroke='#90999E' strokeWidth='1.32' strokeMiterlimit='10'
                  strokeLinejoin='round' />
            <path
                d='M21 6.56657V2.99052C21 2.72339 20.9483 2.4735 20.8449 2.23223C20.7415 1.99095 20.6036 1.77553 20.414 1.58595C20.2245 1.39638 20.009 1.25851 19.7678 1.15511C19.5265 1.0517 19.268 1 19.0095 1H2.99052C2.72339 1 2.4735 1.0517 2.23223 1.15511C1.98234 1.24989 1.76691 1.39638 1.58595 1.58595C1.39638 1.76691 1.24989 1.98234 1.15511 2.23223C1.06032 2.48212 1 2.72339 1 2.99052V19.0095C1 19.2766 1.0517 19.5265 1.15511 19.7678C1.25851 20.009 1.39638 20.2245 1.58595 20.414C1.77553 20.6036 1.99095 20.7415 2.23223 20.8449C2.4735 20.9483 2.73201 21 2.99052 21H19.0095C19.2766 21 19.5265 20.9483 19.7678 20.8449C20.009 20.7415 20.2245 20.6036 20.414 20.414C20.6036 20.2245 20.7415 20.009 20.8449 19.7678C20.9483 19.5265 21 19.268 21 19.0095V15.4334'
                stroke='#90999E' strokeWidth='1.32' strokeLinejoin='round' />
        </svg>

    },
    {
        id: 8,
        title: 'Регистрация',
        name: 'Регистрация',
        to: '/auth/registration',
        disabled: false,
        exact: false,
        image: <svg width='22' height='22' viewBox='0 0 22 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M17.6117 12.2923L19.0362 13.6872C19.1317 13.7807 19.1795 13.8898 19.1795 14.0145C19.1795 14.1392 19.1317 14.2561 19.0362 14.3418L12.5422 20.701C12.4626 20.779 12.3671 20.8179 12.2557 20.8335L10.664 20.9972C10.5924 21.005 10.5207 20.9972 10.4571 20.9738C10.3855 20.9504 10.3297 20.9114 10.2819 20.8647C10.2342 20.8179 10.1945 20.7556 10.1706 20.6932C10.1467 20.6231 10.1387 20.5608 10.1467 20.4906L10.3138 18.932C10.3217 18.8229 10.3695 18.7294 10.4491 18.6514L16.9431 12.2923C17.0386 12.1987 17.1501 12.152 17.2854 12.152C17.4047 12.1442 17.5241 12.1987 17.6117 12.2923Z'
                stroke='#90999E' strokeWidth='1.32' strokeMiterlimit='10' />
            <path d='M17.8425 15.5107L15.7494 13.4534' stroke='#90999E' strokeWidth='1.32' strokeMiterlimit='10' />
            <path
                d='M14.5795 5.06801C14.5795 5.33297 14.5557 5.59794 14.5 5.8629C14.4443 6.12787 14.3646 6.37725 14.2612 6.62663C14.1577 6.87601 14.0304 7.1098 13.8792 7.32801C13.728 7.54622 13.5529 7.75663 13.3619 7.94367C13.1709 8.1307 12.9561 8.30215 12.7332 8.45022C12.5104 8.59829 12.2636 8.72298 12.0169 8.82429C11.7623 8.9256 11.5076 9.00353 11.237 9.05808C10.9664 9.11263 10.6958 9.13601 10.4252 9.13601C10.1546 9.13601 9.88404 9.11263 9.61346 9.05808C9.34287 9.00353 9.08821 8.9256 8.83354 8.82429C8.57887 8.72298 8.3401 8.59829 8.11726 8.45022C7.89442 8.30215 7.67961 8.1307 7.48861 7.94367C7.2976 7.75663 7.1225 7.54622 6.97128 7.32801C6.82007 7.1098 6.69275 6.86821 6.58929 6.62663C6.48583 6.37725 6.40621 6.12787 6.3505 5.8629C6.29479 5.59794 6.27094 5.33297 6.27094 5.06801C6.27094 4.80304 6.29479 4.53807 6.3505 4.27311C6.40621 4.00814 6.48583 3.75876 6.58929 3.50938C6.69275 3.26 6.82007 3.02621 6.97128 2.808C7.1225 2.582 7.2976 2.37938 7.48861 2.19235C7.67961 2.00531 7.89442 1.83386 8.11726 1.68579C8.34805 1.53773 8.58683 1.41303 8.83354 1.31172C9.08821 1.21041 9.34287 1.13248 9.61346 1.07793C9.88404 1.02338 10.1546 1 10.4252 1C10.6958 1 10.9664 1.02338 11.237 1.07793C11.5076 1.13248 11.7623 1.21041 12.0169 1.31172C12.2716 1.41303 12.5104 1.53773 12.7332 1.68579C12.9561 1.83386 13.1709 2.00531 13.3619 2.19235C13.5529 2.37938 13.728 2.5898 13.8792 2.808C14.0304 3.02621 14.1577 3.2678 14.2612 3.50938C14.3646 3.75876 14.4443 4.00814 14.5 4.27311C14.5557 4.53807 14.5795 4.80304 14.5795 5.06801Z'
                stroke='#90999E' strokeWidth='1.32' strokeMiterlimit='10' />
            <path
                d='M15.8529 11.0765C15.7813 10.8972 15.7017 10.7258 15.6142 10.5621C14.5398 8.6528 6.30271 8.6528 5.22832 10.5621C4.15392 12.4714 3 19.5943 3 19.5943'
                stroke='#90999E' strokeWidth='1.32' strokeMiterlimit='10' strokeLinejoin='round' />
        </svg>


    }
];

const WEEKDAYS = [
    {
        'id': 1,
        'name': 'Понедельник',
        'short_name': 'Пн',
        'name_eng': 'Monday',
        'short_name_eng': 'Mo',
        'week_day_number': 1
    },
    {
        'id': 2,
        'name': 'Вторник',
        'short_name': 'Вт',
        'name_eng': 'Tuesday',
        'short_name_eng': 'Tu',
        'week_day_number': 2
    },
    {
        'id': 3,
        'name': 'Среда',
        'short_name': 'Ср',
        'name_eng': 'Wednesday',
        'short_name_eng': 'We',
        'week_day_number': 3
    },
    {
        'id': 4,
        'name': 'Четверг',
        'short_name': 'Чт',
        'name_eng': 'Thursday',
        'short_name_eng': 'Th',
        'week_day_number': 4
    },
    {
        'id': 5,
        'name': 'Пятница',
        'short_name': 'Пт',
        'name_eng': 'Friday',
        'short_name_eng': 'Fr',
        'week_day_number': 5
    },
    {
        'id': 6,
        'name': 'Суббота',
        'short_name': 'Сб',
        'name_eng': 'Saturday',
        'short_name_eng': 'Sa',
        'week_day_number': 6
    },
    {
        'id': 7,
        'name': 'Воскресенье',
        'short_name': 'Вс',
        'name_eng': 'Sunday',
        'short_name_eng': 'Su',
        'week_day_number': 7
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
    'Декабрь'
];

const DEFAULT_IMG = {
    clubAvatar: '/static/icons/default/club-avatar.svg',
    userAvatar: '/static/icons/default/user-avatar.svg',
    exhibitionPicture: '/static/images/exhibitions/default.png',
    authPicture: '/static/images/registration/banner.png',
    noImage: '/static/images/noimg/icon-no-image.svg',
    noNews: '/static/images/news/no-news-small.png',
    emptyGallery: '/static/images/noimg/empty-gallery.png',
    emptyPhotoGallery: '/static/images/noimg/empty-photo-gallery.svg',
    emptyVideoGallery: '/static/images/noimg/empty-video-gallery.svg'
};

const BAD_SITES = [
    'zooportal.pro',
    'kinolog.org'
];

const BANNER_TYPES = {
    homePageSlider: 1,
    homePageRightSiteBar: 2,
    homePageArticle: 3,
    exhibitionPageLeftSiteBar: 4,
    aboutRkfOnlineRightSiteBar: 5,
    clubPageUnderPhotos: 6,
    kennelPageUnderPhotos: 7
};

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
    footerNav,
    responsiveSliderConfig,
    DEFAULT_PHONE_INPUT_MASK,
    DEFAULT_PHONE_INPUT_PLACEHOLDER,
    DEFAULT_EMAIL_INPUT_PLACEHOLDER,
    LOGIN_URL,
    REGISTRATION_URL,
    DEFAULT_IMG,
    BAD_SITES,
    BANNER_TYPES
};
