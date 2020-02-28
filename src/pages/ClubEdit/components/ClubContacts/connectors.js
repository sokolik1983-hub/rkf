import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectContactsList,
    selectClubId,
    selectClubContact,

} from './selectors'

import {
    getClubContactsListSuccess,
    addClubContactSuccess,
    updateClubContactSuccess,
    deleteClubContactSuccess,
} from './actions'

export const connectContactsProxy = connect(
    //Here
    selectClubId,
    dispatch => bindActionCreators({
        getClubContactsListSuccess
    }, dispatch)
);

export const connectContactsList = connect(
    //Here
    selectContactsList,
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

export const connectClientClubContactListItem = connect(
    selectClubContact,
    dispatch => bindActionCreators({
        updateClubContactSuccess,
        deleteClubContactSuccess
    }, dispatch)
);

