export const dictionariesInitialState = {
    rank_type: {
        url: '/api/exhibitions/Rank/with_deleted',
        dictionary: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
    class_types: {
        url: '/api/exhibitions/Caste',
        dictionary: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
    dignity_types: {
        url: '/api/exhibitions/dignity',
        dictionary: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
    breed_types: {
        url: '/api/dog/Breed',
        dictionary: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
    referees: {
        url: '/api/Referee',
        dictionary: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
    cities: {
        options: [],
        url: '/api/city',
        dictionary: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    }
};

export const DICTIONARIES = {
    rank_type: 'rank_type',
    class_types: 'class_types',
    dignity_types: 'dignity_types',
    breed_types: 'breed_types',
    referees: 'referees',
    cities: 'cities'
};