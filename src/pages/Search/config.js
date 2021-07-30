export const endpointGetSearchResults = '/api/club/elastic_search_full';

export const defaultFilters = [
    {
        name: 'Кинологические организации',
        count: 0,
        items: [
            {name: 'РКФ и Федерации', search_type: 1, count: 0, filters: []},
            {name: 'Клубы', search_type: 2, count: 0, filters: ['federations', 'active_member', 'activated', 'cities']},
            {name: 'Питомники', search_type: 3, count: 0, filters: ['federations', 'active_member', 'activated', 'breeds', 'cities']},
            {name: 'НКП', search_type: 4, count: 0, filters: ['breeds']}
        ]
    },
    {
        name: 'Мероприятия',
        count: 0,
        items: [
            {name: 'Выставочные мероприятия', search_type: 5, count: 0, filters: ['calendar', 'breeds', 'cities', 'ranks']},
            {name: 'Племенные мероприятия', search_type: 6, count: 0, filters: ['calendar', 'breeds', 'cities', 'ranks']},
            {name: 'Состязания и испытания рабочих качеств', search_type: 7, count: 0, filters: ['calendar', 'breeds', 'cities', 'ranks']}
        ]
    },
    {
        name: 'Публикации',
        count: 0,
        items: [
            {name: 'Новости', search_type: 8, count: 0, filters: []},
            {name: 'Объявления', search_type: 9, count: 0, filters: ['breeds', 'cities', 'price']}
        ]
    },
    {
        name: 'Судьи и специалисты',
        count: 0,
        items: [
            {name: 'По породам', search_type: 13, count: 0, filters: ['regions', 'cities', 'rank', 'contests', 'breed_groups', 'breeds']},
            {name: 'По служебным и игровым дисциплинам', search_type: 10, count: 0, filters: ['regions', 'cities', 'classification', 'disciplines']},
            {name: 'По охотничьим дисциплинам', search_type: 11, count: 0, filters: ['regions', 'cities', 'classification', 'disciplines']},
            {name: 'Специалисты', search_type: 12, count: 0, filters: ['regions', 'cities', 'specializations', 'disciplines']},
        ]
    }
];