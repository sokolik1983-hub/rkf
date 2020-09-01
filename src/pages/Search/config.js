export const endpointGetSearchResults = '/api/club/elastic_search_full';

export const defaultFilters = [
    {
        name: 'Кинологические организации',
        items: [
            {name: 'РКФ и Федерации', search_type: 1, count: 0},
            {name: 'Клубы', search_type: 2, count: 0},
            {name: 'Питомники', search_type: 3, count: 0},
            {name: 'НКП', search_type: 4, count: 0}
        ]
    },
    {
        name: 'Мероприятия',
        items: [
            {name: 'Выставочные мероприятия', search_type: 5, count: 0},
            {name: 'Племенные мероприятия', search_type: 6, count: 0},
            {name: 'Состязания и испытания рабочих качеств', search_type: 7, count: 0, disabled: true},
        ]
    },
    {
        name: 'Публикации',
        items: [
            {name: 'Новости', search_type: 8, count: 0},
            {name: 'Объявления', search_type: 9, count: 0}
        ]
    }
];