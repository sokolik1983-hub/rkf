export const endpointGetSearchResults = '/api/club/elastic_search_full';

export const filters = [
    {
        name: 'Кинологические организации',
        items: [
            {name: 'РКФ и Федерации', search_type: 1},
            {name: 'Клубы', search_type: 2},
            {name: 'Питомники', search_type: 3},
            {name: 'НКП', search_type: 4}
        ]
    },
    {
        name: 'Мероприятия',
        items: [
            {name: 'Выставочные мероприятия', search_type: 5},
            {name: 'Племенные мероприятия', search_type: 6},
            {name: 'Состязания и испытания рабочих качеств', search_type: 7, disabled: true},
        ]
    },
    {
        name: 'Публикации',
        items: [
            {name: 'Новости', search_type: 8},
            {name: 'Объявления', search_type: 9}
        ]
    }
];