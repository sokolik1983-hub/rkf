import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectLegalInfo
} from './selectors'

import {
    getLegalInfo,
    updateLegalInfoSuccess
} from './actions'



export const connectLegalInfo = connect(
    selectLegalInfo,
    dispatch => bindActionCreators(
        {
            getLegalInfo
        }, dispatch)
);

export const connectLegalInfoForm = connect(
    selectLegalInfo,
    dispatch => bindActionCreators(
        {
            updateLegalInfoSuccess
        }, dispatch)
);