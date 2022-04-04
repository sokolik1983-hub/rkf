export const categories = [
    {
        name: 'Новые',
        id: 7,
        icon: 'news-feed__icon news-feed__icon--new',
    },
    {
        name: 'Важные',
        id: 5,
        icon: 'news-feed__icon news-feed__icon--required',
    },
    {
        name: 'Заявки',
        id: 6,
        icon: 'news-feed__icon news-feed__icon--applications',
    },
    {
        name: 'Подписки',
        id: 8,
        icon: 'news-feed__icon news-feed__icon--subscriptions',
    },
    {
        name: 'Все',
        id: 1,
        icon: 'news-feed__icon news-feed__icon--publications',
    },
    {
        name: 'Архив',
        id: 9,
        icon: 'news-feed__icon news-feed__icon--archive',
    }
];

export const endpointGetLinkNewsFeed = "/api/document/publicdocument";