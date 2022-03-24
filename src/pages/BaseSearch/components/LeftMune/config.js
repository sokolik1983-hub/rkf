import React from 'react';

export const sections = {
    foundInfo: {
        name: 'Информация о найденных собаках',
        id: 0,
        icon: 'icon-found_info'
    },
    checkStatus: {
        name: 'Статус документов',
        id: 1,
        icon: 'icon-check_status'
    },
    checkRegistration: {
        name: 'Регистрационные данные собаки',
        id: 2,
        icon: 'icon-check_registration'
    },
    stampSearch: {
        name: 'Поиск клуба/питомника по клейму',
        id: 3,
        icon: 'icon-stamp_search'
    },
    publicationSearch: {
        name: 'Поиск по объявлениям',
        id: 4,
        icon: 'icon-publication_search'
    }
}

export const SvgSelector = ({icon}) => {
    switch (icon) {
        case 'icon-found_info':
            return (
                <svg width="20" height="18" viewBox="0 0 20 20" fill="current" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 19C5.04182 19 1 14.9582 1 10C1 5.04182 5.04182 1 10 1C14.9582 1 19 5.04182 19 10C19 14.9582 14.9582 19 10 19ZM10 2.63636C5.94182 2.63636 2.63636 5.94182 2.63636 10C2.63636 14.0582 5.94182 17.3636 10 17.3636C14.0582 17.3636 17.3636 14.0582 17.3636 10C17.3636 5.94182 14.0582 2.63636 10 2.63636Z"
                        fill="#8F989D"/>
                    <path
                        d="M9.99982 6.51454C10.4517 6.51454 10.818 6.14823 10.818 5.69636C10.818 5.24449 10.4517 4.87817 9.99982 4.87817C9.54795 4.87817 9.18164 5.24449 9.18164 5.69636C9.18164 6.14823 9.54795 6.51454 9.99982 6.51454Z"
                        fill="#8F989D"/>
                    <path
                        d="M9.99982 15.9564C9.54164 15.9564 9.18164 15.58 9.18164 15.1382V8.44544C9.18164 7.98726 9.54164 7.62726 9.99982 7.62726C10.458 7.62726 10.818 8.00362 10.818 8.44544V15.1218C10.818 15.58 10.458 15.9564 9.99982 15.9564Z"
                        fill="#8F989D"/>
                </svg>
            );

        case 'icon-check_status':
            return (
                <svg width="20" height="18" viewBox="0 0 20 20" fill="current" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 19C5.04182 19 1 14.9582 1 10C1 5.04182 5.04182 1 10 1C14.9582 1 19 5.04182 19 10C19 14.9582 14.9582 19 10 19ZM10 2.63636C5.94182 2.63636 2.63636 5.94182 2.63636 10C2.63636 14.0582 5.94182 17.3636 10 17.3636C14.0582 17.3636 17.3636 14.0582 17.3636 10C17.3636 5.94182 14.0582 2.63636 10 2.63636Z"
                        fill="#8F989D"/>
                    <path
                        d="M9.99982 6.51454C10.4517 6.51454 10.818 6.14823 10.818 5.69636C10.818 5.24449 10.4517 4.87817 9.99982 4.87817C9.54795 4.87817 9.18164 5.24449 9.18164 5.69636C9.18164 6.14823 9.54795 6.51454 9.99982 6.51454Z"
                        fill="#8F989D"/>
                    <path
                        d="M9.99982 15.9564C9.54164 15.9564 9.18164 15.58 9.18164 15.1382V8.44544C9.18164 7.98726 9.54164 7.62726 9.99982 7.62726C10.458 7.62726 10.818 8.00362 10.818 8.44544V15.1218C10.818 15.58 10.458 15.9564 9.99982 15.9564Z"
                        fill="#8F989D"/>
                </svg>
            );

        case 'icon-check_registration':
            return (
                <svg width="20" height="18" viewBox="0 0 20 20" fill="current" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 19C5.04182 19 1 14.9582 1 10C1 5.04182 5.04182 1 10 1C14.9582 1 19 5.04182 19 10C19 14.9582 14.9582 19 10 19ZM10 2.63636C5.94182 2.63636 2.63636 5.94182 2.63636 10C2.63636 14.0582 5.94182 17.3636 10 17.3636C14.0582 17.3636 17.3636 14.0582 17.3636 10C17.3636 5.94182 14.0582 2.63636 10 2.63636Z"
                        fill="#8F989D"/>
                    <path
                        d="M9.99982 6.51454C10.4517 6.51454 10.818 6.14823 10.818 5.69636C10.818 5.24449 10.4517 4.87817 9.99982 4.87817C9.54795 4.87817 9.18164 5.24449 9.18164 5.69636C9.18164 6.14823 9.54795 6.51454 9.99982 6.51454Z"
                        fill="#8F989D"/>
                    <path
                        d="M9.99982 15.9564C9.54164 15.9564 9.18164 15.58 9.18164 15.1382V8.44544C9.18164 7.98726 9.54164 7.62726 9.99982 7.62726C10.458 7.62726 10.818 8.00362 10.818 8.44544V15.1218C10.818 15.58 10.458 15.9564 9.99982 15.9564Z"
                        fill="#8F989D"/>
                </svg>
            );

        case 'icon-stamp_search':
            return (
                <svg width="20" height="18" viewBox="0 0 20 20" fill="current" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 19C5.04182 19 1 14.9582 1 10C1 5.04182 5.04182 1 10 1C14.9582 1 19 5.04182 19 10C19 14.9582 14.9582 19 10 19ZM10 2.63636C5.94182 2.63636 2.63636 5.94182 2.63636 10C2.63636 14.0582 5.94182 17.3636 10 17.3636C14.0582 17.3636 17.3636 14.0582 17.3636 10C17.3636 5.94182 14.0582 2.63636 10 2.63636Z"
                        fill="#8F989D"/>
                    <path
                        d="M9.99982 6.51454C10.4517 6.51454 10.818 6.14823 10.818 5.69636C10.818 5.24449 10.4517 4.87817 9.99982 4.87817C9.54795 4.87817 9.18164 5.24449 9.18164 5.69636C9.18164 6.14823 9.54795 6.51454 9.99982 6.51454Z"
                        fill="#8F989D"/>
                    <path
                        d="M9.99982 15.9564C9.54164 15.9564 9.18164 15.58 9.18164 15.1382V8.44544C9.18164 7.98726 9.54164 7.62726 9.99982 7.62726C10.458 7.62726 10.818 8.00362 10.818 8.44544V15.1218C10.818 15.58 10.458 15.9564 9.99982 15.9564Z"
                        fill="#8F989D"/>
                </svg>
            );

        case 'icon-publication_search':
            return (
                <svg width="20" height="18" viewBox="0 0 20 20" fill="current" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 19C5.04182 19 1 14.9582 1 10C1 5.04182 5.04182 1 10 1C14.9582 1 19 5.04182 19 10C19 14.9582 14.9582 19 10 19ZM10 2.63636C5.94182 2.63636 2.63636 5.94182 2.63636 10C2.63636 14.0582 5.94182 17.3636 10 17.3636C14.0582 17.3636 17.3636 14.0582 17.3636 10C17.3636 5.94182 14.0582 2.63636 10 2.63636Z"
                        fill="#8F989D"/>
                    <path
                        d="M9.99982 6.51454C10.4517 6.51454 10.818 6.14823 10.818 5.69636C10.818 5.24449 10.4517 4.87817 9.99982 4.87817C9.54795 4.87817 9.18164 5.24449 9.18164 5.69636C9.18164 6.14823 9.54795 6.51454 9.99982 6.51454Z"
                        fill="#8F989D"/>
                    <path
                        d="M9.99982 15.9564C9.54164 15.9564 9.18164 15.58 9.18164 15.1382V8.44544C9.18164 7.98726 9.54164 7.62726 9.99982 7.62726C10.458 7.62726 10.818 8.00362 10.818 8.44544V15.1218C10.818 15.58 10.458 15.9564 9.99982 15.9564Z"
                        fill="#8F989D"/>
                </svg>
            );

        default:
            return null
    }
}

