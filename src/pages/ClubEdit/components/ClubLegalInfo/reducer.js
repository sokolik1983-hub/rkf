import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'

const clubLegalInfoInfoState = {
    clubLegalInfo: null
};

const clubLegalInfoInfoReducer = createReducer(clubLegalInfoInfoState, {

    [actiontypes.GET_LEGAL_INFO_SUCCESS](state, action) {
        return {
            ...state,
            clubLegalInfo: action.data,
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
