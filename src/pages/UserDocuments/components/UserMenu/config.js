export const userNav = (alias) => [
    {
        id: 1,
        title: 'Оформление документов',
        to: `user/${alias}/documents`,
        disabled: true
    },
    {
        id: 2,
        title: 'Специализация',
        to: `user/${alias}/documents/specialization`
    },
    {
        id: 3,
        title: 'Мои собаки',
        to: `user/${alias}/documents/dogs`,
        disabled: true
    },
    {
        id: 4,
        title: 'Запись на мероприятия',
        to: `user/${alias}/documents/exhibitions-registration`,
        disabled: true
    },
    {
        id: 5,
        title: 'Запись на очный прием',
        to: `user/${alias}/documents/meeting-registration`
    },{
        id: 6,
        title: 'Оценка Федерации',
        to: `user/${alias}/documents/federation-assessment`
    },{
        id: 7,
        title: 'Моя страница',
        to: `user/${alias}`,
        disabled: true
    }
];