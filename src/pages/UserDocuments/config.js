import React from "react";

export const userNav = (alias) => [
    {
        id: 1,
        title: 'Оформление документов',
        to: `/user/${alias}/documents`,
        disabled: true,
        icon: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="m24.7 10.9v7.2h50.3v64.1h7.2v-71.3h-57.5z"/>
                <path d="M17.8,89.1h52.7V22.7H17.8V89.1z M29.2,36.4H59V41H29.2V36.4z M29.2,47.9H59v4.6H29.2V47.9z M29.2,59.3H59v4.6H29.2V59.3z M29.2,70.8H59v4.6H29.2V70.8z"/>
            </svg>
    },
    {
        id: 2,
        title: 'Специализация',
        to: `/user/${alias}/documents/specialization`,
        icon: <svg viewBox="0 0 99.2 99.2" xmlns="http://www.w3.org/2000/svg">
                <path d="M49.6,6.7C37.1,6.7,27,16.9,27,29.3S37.1,52,49.6,52s22.6-10.1,22.6-22.6S62.1,6.7,49.6,6.7z"/>
                <path d="m86.9 73.5c-6.8-10.1-18.1-16.2-30.3-16.2h-14c-12.2 0-23.5 6.1-30.3 16.2l-0.4 0.6v18.3h75.4v-18.3l-0.4-0.6z"/>
            </svg>
    },
    {
        id: 3,
        title: 'Мои собаки',
        to: `/user/${alias}/documents/dogs`,
        disabled: true,
        icon: <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                <path d="M46.53,25.17c-12.42-3-11.37-5.8-11.37-5.8C35,17,30.57,17.9,31,14.47V8.72c0-1-.54-1.22-1.2-.44l-3.05,3.6v-5c0-1-.54-1.22-1.2-.44l-6.14,7.25c-.66.79-1.8,2-2.53,2.74L4,29.22A5.13,5.13,0,0,0,2.63,32.4v.15a3.77,3.77,0,0,0,1.58,2.86s15.29,12.86,17.9,7.13l4-6.28c2.38-4.29,12.18-1.38,15.18-3.59C41.25,32.67,50.09,26,46.53,25.17Z"/>
            </svg>
    },
    {
        id: 4,
        title: 'Запись на мероприятия',
        to: `/user/${alias}/documents/exhibitions-registration`,
        disabled: true,
        icon: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M90.2,13.26H79.08q.06-1.85.06-3.72A2.54,2.54,0,0,0,76.6,7H22.21a2.54,2.54,0,0,0-2.54,2.54c0,1.25,0,2.48.06,3.72H8.62A2.54,2.54,0,0,0,6.08,15.8c0,11.38,3,22.11,8.37,30.22S26.9,58.64,34.57,59.09a26.18,26.18,0,0,0,5.5,4.62V75H35.81a9.35,9.35,0,0,0-9.34,9.34V88.6h-.18a2.54,2.54,0,1,0,0,5.08H72.52a2.54,2.54,0,0,0,0-5.08h-.18V84.34A9.35,9.35,0,0,0,63,75H58.74V63.71a25.88,25.88,0,0,0,5.5-4.62C71.92,58.64,79,54,84.36,46s8.37-18.85,8.37-30.22A2.52,2.52,0,0,0,90.2,13.26Zm-71.52,30c-4.45-6.69-7.07-15.45-7.47-24.87H20c.92,11.59,3.64,22.3,7.89,30.8C28.59,50.49,29.3,51.77,30,53,25.81,51.38,21.9,48.05,18.68,43.21Zm61.46,0C76.92,48.05,73,51.38,68.79,53c.74-1.21,1.44-2.48,2.12-3.84,4.25-8.5,7-19.21,7.89-30.8h8.81C87.21,27.76,84.6,36.51,80.14,43.21Z"/>
            </svg>
    },
    {
        id: 5,
        title: 'Запись на очный прием',
        to: `/user/${alias}/documents/meeting-registration`,
        icon: <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M116.59.1,53.05,63.63h63.54Z"/>
                <path d="M383.84,0H146.59V93.64H53V436.8H383.84V0ZM322.06,289.84H114.74v-30H322.06Zm0-63.74H114.74v-30H322.06Zm0-63.73H114.74v-30H322.06Z"/>
                <path d="M413.84,75.2V466.8H128.16V512H459V75.2Z"/>
            </svg>

    }, {
        id: 6,
        title: 'Оценка Федерации',
        to: `/user/${alias}/documents/federation-assessment`,
        icon: <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="m37.97 36.86c-2.01-2.01-4.74-3.15-7.58-3.14-5.92 0-10.73 4.8-10.73 10.72s4.8 10.73 10.72 10.73 10.73-4.8 10.73-10.72c0-2.85-1.13-5.57-3.14-7.59z"/>
                <path d="m30.96 58.67h-1.14c-12.03 0.03-21.77 9.77-21.8 21.8v1.54c0 0.85 0.69 1.53 1.53 1.53h41.68c0.85 0 1.53-0.69 1.53-1.53v-1.54c-0.04-12.02-9.77-21.76-21.8-21.8z"/>
                <path d="m84.71 21.65c-4.96-3.47-10.89-5.29-16.95-5.2-6.06-0.1-11.99 1.72-16.95 5.2-4.5 3.31-7.28 7.92-7.28 13.06 0.01 2.32 0.58 4.61 1.66 6.66 0.97 1.83 2.24 3.48 3.77 4.87l-3.85 7.99c-0.37 0.76-0.05 1.67 0.7 2.03 0.47 0.23 1.03 0.2 1.48-0.08l8.84-5.46c1.68 0.69 3.42 1.21 5.2 1.58 2.11 0.43 4.26 0.65 6.41 0.65 6.06 0.1 11.99-1.72 16.95-5.2 4.5-3.31 7.28-7.92 7.28-13.06s-2.77-9.72-7.26-13.04zm-5.47 10.6v0.01c-0.06 0.27-0.19 0.51-0.38 0.71l-3.93 4.5 0.52 6.04c0.07 0.84-0.55 1.58-1.39 1.66-0.29 0.03-0.59-0.03-0.85-0.17l-5.46-2.3-5.58 2.37c-0.77 0.33-1.67-0.02-2-0.8-0.1-0.23-0.14-0.49-0.12-0.74l0.52-6.04-3.97-4.6c-0.55-0.64-0.48-1.61 0.17-2.16 0.19-0.16 0.41-0.27 0.64-0.33l5.9-1.37 3.12-5.15c0.43-0.73 1.37-0.96 2.1-0.53 0.22 0.13 0.4 0.31 0.53 0.53l3.11 5.17 5.9 1.37c0.83 0.19 1.35 1 1.17 1.83z"/>
            </svg>
    }, {
        id: 7,
        title: 'Моя страница',
        to: `/user/${alias}`,
        disabled: true,
        icon: <svg viewBox="0 0 512 412" xmlns="http://www.w3.org/2000/svg">
                <path transform="translate(0 -50)" d="M497,50H15A15,15,0,0,0,0,65v45H512V65A15,15,0,0,0,497,50Z"/>
                <path transform="translate(0 -50)" d="m0 140v307a15 15 0 0 0 15 15h482a15 15 0 0 0 15-15v-307zm116 58.5a20 20 0 1 1-20 20 20 20 0 0 1 20-20zm-20 90h160a15 15 0 0 1 0 30h-160a15 15 0 0 1 0-30zm320 115h-320a15 15 0 0 1 0-30h320a15 15 0 0 1 0 30zm-110-100a20 20 0 1 1 20 20 20 20 0 0 1-20-20zm70 0a20 20 0 1 1 20 20 20 20 0 0 1-20-20zm40-70h-230a15 15 0 0 1 0-30h230a15 15 0 0 1 0 30z"/>
            </svg>
    }
];