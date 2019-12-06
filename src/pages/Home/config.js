export const endpointGetNews = '/api/ClubArticle/public_all';

export const partners = [
    {
        url: 'http://www.fci.be/en/',
        title: 'Fédération Cynologique Internationale',
        img: '/static/images/partners/fci.png'
    },
    {
        url: 'https://www.adamant.ru/',
        title: 'Холдинговая компания «Адамант»',
        img: '/static/images/partners/adamant.png'
    },
    {
        url: 'https://www.skoltech.ru/en/',
        title: 'Skoltech',
        img: '/static/images/partners/skoltech.png'
    }
];

export const exhibitions = {
    title: "Всероссийские выставки",
    items: [
        {
            name: 'Россия',
            url: 'http://rkf.org.ru/vystavki/russia/',
            logo: '/static/images/exhibitions/rus.png'
        },
        {
            name: 'Мазовер',
            url: 'http://rkf.org.ru/vystavki/mazover/',
            logo: '/static/images/exhibitions/maz.png'
        },
        {
            name: 'Евразия',
            url: 'http://rkf.org.ru/vystavki/eurasia/',
            logo: '/static/images/exhibitions/eur.png'
        },
        {
            name: 'Золотой ошейник',
            url: 'http://rkf.org.ru/vystavki/golden_collar/',
            logo: '/static/images/exhibitions/zol.png'
        },

    ]
};

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
            link: 'https://rkf.org.ru',
            linkTitle: 'rkf.org.ru'
        }
    ]
};