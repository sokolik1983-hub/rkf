import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'

const clubClubContactsInitialState = {
    address: "",
    avatar_link: "",
    bank_data_id: null,
    city_id: null,
    club_id: null,
    contacts: [],
    correspondence_address: null,
    description: "",
    federation_id: null,
    legal_information_id: null,
    messengers: [],
    name: "",
    site: "",
    social_networks: [],
    status_id: 1,
};

const clubClubContactsReducer = createReducer(clubClubContactsInitialState, {

    [actiontypes.GET_CLUB_SUCCESS](state, action) {
        return {
            ...state,
            ...action.data,
        }
    },
});

export default clubClubContactsReducer;
