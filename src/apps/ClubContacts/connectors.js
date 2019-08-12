import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectListContact,
    selectClubId,
    selectClubContact
} from './selectors'

import {
    getClubContactsListSuccess,
    addClubContactSuccess,
} from './actions'

export const connectListContact = connect(
    //Here
    selectListContact,
    dispatch => bindActionCreators({
        getClubContactsListSuccess
    }, dispatch)
);

export const connectContactFrom = connect(
    selectClubId,
    dispatch => bindActionCreators({
        addClubContactSuccess
    }, dispatch)
);

export const connectClintClubContact=connect(
    selectClubContact,
)