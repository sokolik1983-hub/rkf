import * as actiontypes from './actiontypes';


const demoInitialState = {
    loadingApi: false,
    exhibitions: []
};

export default function demoReducer(state = demoInitialState, action) {

    switch (action.type) {

        case actiontypes.GET_EXHIBITIONS: {
            return {
                ...state,
                loadingApi: true,
            };
        }
        case actiontypes.GET_EXHIBITIONS_SUCCESS: {
            const {exhibitions, cities} = action.data;
            return {
                ...state,
                exhibitions: exhibitions,
                cities: cities,
                loadingApi: false,
            };
        }
        case actiontypes.GET_EXHIBITIONS_FAILED: {
            return {
                ...state,
                loadingApi: false,
            };
        }

        default:
            return state;
    }
}
