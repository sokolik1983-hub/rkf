import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'

const clubInfoState = {
    loadingApi: false,
    clubInfo: null
};

const clubInfoReducer = createReducer(clubInfoState, {
    [actiontypes.GET_CLUB_INFO](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_CLUB_INFO_SUCCESS](state, action) {
        return {
            ...state,
            clubInfo: action.data,
            loading: false,
        }
    },

    [actiontypes.GET_CLUB_INFO_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        }
    },
});

export default clubInfoReducer;
