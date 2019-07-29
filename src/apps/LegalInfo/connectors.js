import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectLegalInfo
} from './selectors'

import {
    getLegalInfo,
} from './actions'



export const connectLegalInfo = connect(
    selectLegalInfo,
    dispatch => bindActionCreators(
        {
            getLegalInfo
        }, dispatch)
);