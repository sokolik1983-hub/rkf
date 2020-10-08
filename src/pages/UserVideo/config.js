import React from "react";

export const endpointGetUserInfo = '/api/owners/owner/public_full/';

export const userNav = (alias) => [
    {
        id: 1,
        title: 'Собаки',
        to: `/user/${alias}/dogs`,
        disabled: true,
        icon: <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <path d="M46.53,25.17c-12.42-3-11.37-5.8-11.37-5.8C35,17,30.57,17.9,31,14.47V8.72c0-1-.54-1.22-1.2-.44l-3.05,3.6v-5c0-1-.54-1.22-1.2-.44l-6.14,7.25c-.66.79-1.8,2-2.53,2.74L4,29.22A5.13,5.13,0,0,0,2.63,32.4v.15a3.77,3.77,0,0,0,1.58,2.86s15.29,12.86,17.9,7.13l4-6.28c2.38-4.29,12.18-1.38,15.18-3.59C41.25,32.67,50.09,26,46.53,25.17Z"/>
        </svg>
    },
    {
        id: 2,
        title: 'Публикации',
        to: `/user/${alias}/news`,
        disabled: true,
        icon: <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path d="M116.59.1,53.05,63.63h63.54Z"/>
            <path d="M383.84,0H146.59V93.64H53V436.8H383.84V0ZM322.06,289.84H114.74v-30H322.06Zm0-63.74H114.74v-30H322.06Zm0-63.73H114.74v-30H322.06Z"/>
            <path d="M413.84,75.2V466.8H128.16V512H459V75.2Z"/>
        </svg>
    },
    {
        id: 3,
        title: 'Фотогалерея',
        to: `/user/${alias}/gallery`,
        disabled: true,
        icon: <svg viewBox="0 0 36.174 36.174" xmlns="http://www.w3.org/2000/svg">
            <path d="m23.921 20.528c0 3.217-2.617 5.834-5.834 5.834s-5.833-2.617-5.833-5.834 2.616-5.834 5.833-5.834 5.834 2.618 5.834 5.834zm12.253-8.284v16.57c0 2.209-1.791 4-4 4h-28.174c-2.209 0-4-1.791-4-4v-16.57c0-2.209 1.791-4 4-4h4.92v-1.384c0-1.933 1.566-3.5 3.5-3.5h11.334c1.934 0 3.5 1.567 3.5 3.5v1.383h4.92c2.209 1e-3 4 1.792 4 4.001zm-9.253 8.284c0-4.871-3.963-8.834-8.834-8.834-4.87 0-8.833 3.963-8.833 8.834s3.963 8.834 8.833 8.834c4.871 0 8.834-3.963 8.834-8.834z"/>
        </svg>
    },
    {
        id: 4,
        title: 'Видеозаписи',
        to: `/user/${alias}/video`,
        icon: <svg viewBox="0 0 477.9 477.9" xmlns="http://www.w3.org/2000/svg">
            <path d="m469.8 122c-5-3.1-11.3-3.4-16.6-0.8l-111.8 55.9v-40.7c0-28.3-22.9-51.2-51.2-51.2h-239c-28.3 0.1-51.2 23.1-51.2 51.3v204.8c0 28.3 22.9 51.2 51.2 51.2h238.9c28.3 0 51.2-22.9 51.2-51.2v-40.7l111.8 56c8.4 4.2 18.7 0.8 22.9-7.6 1.2-2.4 1.8-5 1.8-7.7v-204.8c0.1-5.9-3-11.4-8-14.5zm-299.1 185.2c-37.7 0-68.3-30.6-68.3-68.3s30.6-68.3 68.3-68.3 68.3 30.6 68.3 68.3-30.6 68.3-68.3 68.3z"/>
        </svg>
    },
    {
        id: 5,
        title: 'Статус документов',
        to: `/user/${alias}/documents-status`,
        disabled: true,
        icon: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m24.7 10.9v7.2h50.3v64.1h7.2v-71.3h-57.5z"/>
            <path d="M17.8,89.1h52.7V22.7H17.8V89.1z M29.2,36.4H59V41H29.2V36.4z M29.2,47.9H59v4.6H29.2V47.9z M29.2,59.3H59v4.6H29.2V59.3z M29.2,70.8H59v4.6H29.2V70.8z"/>
        </svg>
    },
    {
        id: 6,
        title: 'Cтраница пользователя',
        to: `/user/${alias}`,
        icon: <svg viewBox="0 0 512 412" xmlns="http://www.w3.org/2000/svg">
            <path transform="translate(0 -50)" d="M497,50H15A15,15,0,0,0,0,65v45H512V65A15,15,0,0,0,497,50Z"/>
            <path transform="translate(0 -50)" d="m0 140v307a15 15 0 0 0 15 15h482a15 15 0 0 0 15-15v-307zm116 58.5a20 20 0 1 1-20 20 20 20 0 0 1 20-20zm-20 90h160a15 15 0 0 1 0 30h-160a15 15 0 0 1 0-30zm320 115h-320a15 15 0 0 1 0-30h320a15 15 0 0 1 0 30zm-110-100a20 20 0 1 1 20 20 20 20 0 0 1-20-20zm70 0a20 20 0 1 1 20 20 20 20 0 0 1-20-20zm40-70h-230a15 15 0 0 1 0-30h230a15 15 0 0 1 0 30z"/>
        </svg>
    }
];