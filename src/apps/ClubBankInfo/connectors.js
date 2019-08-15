import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import {
    selectBankInfo
} from './selectors'

import {
    getBankInfoSuccess,
    updateBankInfoSuccess
} from './actions'



export const connectBankInfo = connect(
    selectBankInfo,
    dispatch => bindActionCreators(
        {
            getBankInfoSuccess
        }, dispatch)
);

export const connectBankInfoForm = connect(
    selectBankInfo,
    dispatch => bindActionCreators(
        {
            updateBankInfoSuccess
        }, dispatch)
);