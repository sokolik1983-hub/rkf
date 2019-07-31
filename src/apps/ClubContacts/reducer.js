import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'

const clubClubContactsInfoState = {
    loadingApi: false,
    clubClubContactsClubContacts: null
};

const clubClubContactsInfoReducer = createReducer(clubClubContactsInfoState, {
    [actiontypes.GET_LEGAL_INFO](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_LEGAL_INFO_SUCCESS](state, action) {
        return {
            ...state,
            clubClubContactsClubContacts: action.data,
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
            clubClubContactsClubContacts: action.data
        }
    }
});

export default clubClubContactsInfoReducer;
