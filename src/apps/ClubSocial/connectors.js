import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectListSocial,
    selectClubId,
    selectClubSocial,

} from './selectors'

import {
    getClubSocialListSuccess,
    addClubSocialSuccess,
    updateClubSocialSuccess,
    deleteClubSocialSuccess,
} from './actions'

export const connectListSocial = connect(
    //Here
    selectListSocial,
    dispatch => bindActionCreators({
        getClubSocialListSuccess
    }, dispatch)
);

export const connectSocialFrom = connect(
    selectClubId,
    dispatch => bindActionCreators({
        addClubSocialSuccess
    }, dispatch)
);

export const connectClientClubListItem = connect(
    selectClubSocial,
    dispatch => bindActionCreators({
        updateClubSocialSuccess,
        deleteClubSocialSuccess
    }, dispatch)
)