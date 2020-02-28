import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'

const clubBankInfoInfoState = {
    clubBankInfo: null
};

const clubBankInfoInfoReducer = createReducer(clubBankInfoInfoState, {

    [actiontypes.GET_BANK_INFO_SUCCESS](state, action) {
        return {
            ...state,
            clubBankInfo: action.data,
        }
    },
    [actiontypes.UPDATE_BANK_INFO_SUCCESS](state, action){
        return {
            ...state,
            clubBankInfo: action.data
        }
    }
});

export default clubBankInfoInfoReducer;
