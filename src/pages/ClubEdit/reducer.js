import * as actiontypes from './actiontypes';
import ls from 'local-storage';
import createReducer from 'utils/createReducer';

const clubClubContactsInitialState = {
    address: "",
    headliner_link: "",
    logo_link: "",
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
    work_time: [],
    status_id: 1,
};

const clubClubContactsReducer = createReducer(clubClubContactsInitialState, {

    [actiontypes.GET_CLUB_SUCCESS](state, action) {
        return {
            ...state,
            ...action.data,
        }
    },
    [actiontypes.CLUB_HEADER_UPDATE_SUCCESS](state, action) {
        const {data} = action;
        const headliner_link = data.image_link;
        return {
            ...state,
            headliner_link
        }
    },
    [actiontypes.CLUB_LOGO_UPDATE_SUCCESS](state, action) {
        const {data} = action;
        const logo_link = data.avatar_link;

        ls.set('user_info', { ...ls.get('user_info'), logo_link });

        return {
            ...state,
            logo_link
        }
    },
    [actiontypes.CLUB_ALIAS_UPDATE_SUCCESS](state, action) {
        const {alias_name} = action.data;
        return {
            ...state,
            club_alias: alias_name
        }
    },
    [actiontypes.CLUB_INFO_UPDATE_SUCCESS](state, action) {
        const {data} = action;

        return {
            ...state,
            ...data
        }
    },
    [actiontypes.CLUB_SCHEDULE_UPDATE_SUCCESS](state, action) {
        const {work_time} = action.data;

        return {
            ...state,
            work_time
        }
    },
});

export default clubClubContactsReducer;
