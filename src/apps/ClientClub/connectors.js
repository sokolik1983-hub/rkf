import {connect} from "react-redux";
import {
    selectClubHeader,
    selectClubDescription,
    selectClubContacts
} from './selectors'

import {getClubSuccess} from './actions'
import {bindActionCreators} from "redux";


export const connectClientClubHeader = connect(
    selectClubHeader
);

export const connectClientClubDescription =  connect(
    selectClubDescription
);

export const connectClientClubContacts =  connect(
    selectClubContacts
);

export const connectClientClub = connect(
    null,
    dispatch => bindActionCreators({
        getClubSuccess
    }, dispatch)
);