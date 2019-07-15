export const AppDicts = {
    cities: {
        url: '',
    }
};

export const dictionariesInitialState = {
    dogBreeds: {
        url: '',
        dict: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
    referees: {
        url: '/api/Referee/all',
        dict: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
    cities: {
        options: [],
        url: '/api/exhibition/city/all',
        dict: {},
        dictIndex: [],
        loaded: false,
        loading: false,
    },
};