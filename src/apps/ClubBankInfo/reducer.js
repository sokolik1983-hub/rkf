import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'

const clubBankInfoInfoState = {
    loadingApi: false,
    clubBankInfo: null
};

const clubBankInfoInfoReducer = createReducer(clubBankInfoInfoState, {
    [actiontypes.GET_LEGAL_INFO](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_LEGAL_INFO_SUCCESS](state, action) {
        return {
            ...state,
            clubBankInfo: action.data,
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
            clubBankInfo: action.data
        }
    }
});

export default clubBankInfoInfoReducer;
