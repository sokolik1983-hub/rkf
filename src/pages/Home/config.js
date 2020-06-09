export const endpointGetNews = '/api/Article/public_all';

export const partners = [
    {
        url: 'http://www.fci.be/en/',
        title: 'Fédération Cynologique Internationale',
        img: '/static/images/partners/fci-colored.png',
        id: 1
    },
    {
        url: 'https://www.skoltech.ru/en/',
        title: 'Skoltech',
        img: '/static/images/partners/skoltech-colored.png',
        id: 2
    },
    {
        url: 'https://www.adamant.ru/',
        title: 'Холдинговая компания «Адамант»',
        img: '/static/images/partners/adamant-colored.png',
        id: 3
    },
    {
        url: 'https://www.sogaz.ru/',
        title: 'АО «СОГАЗ»',
        img: '/static/images/partners/sogaz-colored.png',
        id: 4
    }
];

export const exhibitions = [
    {
        name: 'Россия',
        url: 'http://rkf.org.ru/vystavki/russia/',
        logo: '/static/images/exhibitions/rus.png',
        id: 1
    },
    {
        name: 'Мазовер',
        url: 'http://rkf.org.ru/vystavki/mazover/',
        logo: '/static/images/exhibitions/maz.png',
        id: 2
    },
    {
        name: 'Евразия',
        url: 'http://rkf.org.ru/vystavki/eurasia/',
        logo: '/static/images/exhibitions/eur.png',
        id: 3
    },
    // {
    //     name: 'Золотой ошейник',
    //     url: 'http://rkf.org.ru/vystavki/golden_collar/',
    //     logo: '/static/images/exhibitions/zol.png'
    // },
];

export const RKFInfo = {
    aboutTitle: 'О РКФ',
    about: 'Российская кинологическая федерация (РКФ) является некоммерческим, добровольным, самоуправляемым, основанным на членстве союзом общественных объединений, созданным по инициативе общественных объединений, объединившихся на основе общности их интересов для достижения целей, определенных Уставом РКФ.',
    contacts: [
        {
            class: 'pin',
            text: 'Адрес: Москва, Гостиничная, 9'
        },
        {
            class: 'phone',
            text: 'Телефон: +7 (499) 753-22-33'
        },
        {
            class: 'email',
            text: 'E-mail: ',
            link: 'mailto:rkf@rkf.org.ru',
            linkTitle: 'rkf@rkf.org.ru'
        },
        {
            class: 'web',
            text: 'Сайт: ',
            link: 'http://rkf.org.ru',
            linkTitle: 'rkf.org.ru'
        }
    ]
};

export const slides = [
    {
        id: 1,
        title: 'IDS «Eurasia»',
        url: 'http://rkf.org.ru/vystavochnaja-dejatelnost/eurasia/',
        img: '/static/images/exhibitions/eur-big.png'
    },
    {
        id: 2,
        title: 'Мемориал А.П. Мазовера',
        url: 'http://rkf.org.ru/vystavochnaja-dejatelnost/mazover/',
        img: '/static/images/exhibitions/maz-big.png'
    },
    {
        id: 3,
        title: 'IDS «Russia»',
        url: 'http://rkf.org.ru/vystavochnaja-dejatelnost/russia/',
        img: '/static/images/exhibitions/rus-big.png'
    },
    // {
    //     id: 4,
    //     title: 'Шоу чемпионов «Золотой ошейник»',
    //     url: 'http://rkf.org.ru/vystavochnaja-dejatelnost/golden_collar/',
    //     img: '/static/images/exhibitions/zol-big.png'
    // }
];