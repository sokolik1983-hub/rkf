export const endpointGetSearchResults = '/api/search/global';

export const defaultFilters = [
    {
        name: 'Кинологические организации',
        count: 0,
        items: [
            {name: 'РКФ и Федерации', search_type: 101, count: 0, filters: []},
            {name: 'Клубы', search_type: 102, count: 0, filters: ['federations', 'active_member', 'activated', 'regions', 'cities']},
            {name: 'Питомники', search_type: 103, count: 0, filters: ['federations', 'active_member', 'activated', 'breeds', 'cities']},
            {name: 'НКП', search_type: 104, count: 0, filters: ['breeds']}
        ]
    },
    {
        name: 'Мероприятия',
        count: 0,
        items: [
            {name: 'Выставочные мероприятия', search_type: 301, count: 0, filters: ['calendar', 'breeds', 'cities', 'ranks']},
            {name: 'Племенные мероприятия', search_type: 302, count: 0, filters: ['calendar', 'breeds', 'cities', 'ranks']},
            {name: 'Состязания и испытания рабочих качеств', search_type: 303, count: 0, filters: ['calendar', 'breeds', 'cities', 'ranks']}
        ]
    },
    {
        name: 'Публикации',
        count: 0,
        items: [
            {name: 'Новости', search_type: 201, count: 0, filters: []},
            {name: 'Объявления', search_type: 202, count: 0, filters: ['breeds', 'cities', 'price']}
        ]
    },
    {
        name: 'Судьи и специалисты',
        count: 0,
        items: [
            {name: 'По породам', search_type: 401, count: 0, filters: ['regions', 'cities', 'rank', 'contests', 'breed_groups', 'breeds']},
            {name: 'По служебным и игровым дисциплинам', search_type: 402, count: 0, filters: ['regions', 'cities', 'classification', 'disciplines']},
            {name: 'По охотничьим дисциплинам', search_type: 403, count: 0, filters: ['regions', 'cities', 'classification', 'disciplines']},
            {name: 'Специалисты', search_type: 404, count: 0, filters: ['regions', 'cities', 'specializations', 'disciplines']},
        ]
    }
];
