import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectClubContacts
} from './selectors'

import {
    getClubContacts,
    updateClubContactsSuccess
} from './actions'



export const connectClubContacts = connect(
    selectClubContacts,
    dispatch => bindActionCreators(
        {
            getClubContacts
        }, dispatch)
);

export const connectClubContactsForm = connect(
    selectClubContacts,
    dispatch => bindActionCreators(
        {
            updateClubContactsSuccess
        }, dispatch)
);