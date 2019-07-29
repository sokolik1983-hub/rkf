import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectClubInfo
} from './selectors'

import {
    getClubInfo,
} from './actions'



export const connectClubInfo = connect(
    selectClubInfo,
    dispatch => bindActionCreators(
        {
            getClubInfo
        }, dispatch)
);