import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {
    selectLegalInfo
} from './selectors'

import {
    getLegalInfoSuccess,
    updateLegalInfoSuccess
} from './actions'



export const connectLegalInfo = connect(
    selectLegalInfo,
    dispatch => bindActionCreators(
        {
            getLegalInfoSuccess
        }, dispatch)
);

export const connectLegalInfoForm = connect(
    selectLegalInfo,
    dispatch => bindActionCreators(
        {
            updateLegalInfoSuccess
        }, dispatch)
);