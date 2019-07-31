export const dictionariesInitialState = {
    classTypes: {
        url: '',
        dictionary: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
    dogBreeds: {
        url: '',
        dictionary: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
    referees: {
        url: '/api/Referee/all',
        dictionary: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
    cities: {
        options: [],
        url: '/api/exhibition/city/all',
        dictionary: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
};