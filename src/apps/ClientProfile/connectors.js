import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectProfile
} from './selectors'

import {
    getProfile,
} from './actions'



export const connectProfile = connect(
    selectProfile,
    dispatch => bindActionCreators(
        {
            getProfile
        }, dispatch)
);