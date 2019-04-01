import * as actiontypes from './actiontypes';


const demoInitialState = {
    loadingApi: false,
};

export default function demoReducer(state = demoInitialState, action) {

    switch (action.type) {

        case actiontypes.FETCH_DEMO: {
            return {
                ...state,
                loadingApi: true,
            };
        }
        case actiontypes.FETCH_DEMO_SUCCESS: {
            return {
                ...state,
                loadingApi: false,
            };
        }
        case actiontypes.FETCH_DEMO_FAILED: {
            return {
                ...state,
                loadingApi: false,
            };
        }

        default:
            return state;
    }
}
