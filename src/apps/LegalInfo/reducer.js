import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'

const clubLegalInfoInfoState = {
    loadingApi: false,
    clubLegalInfo: null
};

const clubLegalInfoInfoReducer = createReducer(clubLegalInfoInfoState, {
    [actiontypes.GET_LEGAL_INFO](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_LEGAL_INFO_SUCCESS](state, action) {
        return {
            ...state,
            clubLegalInfo: action.data,
            loading: false,
        }
    },

    [actiontypes.GET_LEGAL_INFO_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        }
    },
    [actiontypes.UPDATE_LEGAL_INFO_SUCCESS](state, action){
        return {
            ...state,
            clubLegalInfo: action.data
        }
    }
});

export default clubLegalInfoInfoReducer;
