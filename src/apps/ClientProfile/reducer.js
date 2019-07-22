import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'

const clientNewsInitialState = {
    loadingApi: false,
    profile: {},
};

const clientExhibitionScheduleReducer = createReducer(clientNewsInitialState, {
    [actiontypes.GET_PROFILE](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_PROFILE_SUCCESS](state, action) {
        return {
            ...state,
            profile: action.data,
            loading: false,
        }
    },

    [actiontypes.GET_PROFILE_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        }
    },
});

export default clientExhibitionScheduleReducer;
