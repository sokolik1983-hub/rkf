import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectListContact,
    selectClubId,
    selectClubContact,

} from './selectors'

import {
    getClubContactsListSuccess,
    addClubContactSuccess,
    updateClubContactSuccess,
    deleteClubContactSuccess,
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

export const connectClientClubListItem = connect(
    selectClubContact,
    dispatch => bindActionCreators({
        updateClubContactSuccess,
        deleteClubContactSuccess
    }, dispatch)
)