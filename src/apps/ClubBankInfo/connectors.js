import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectBankInfo
} from './selectors'

import {
    getBankInfo,
    updateBankInfoSuccess
} from './actions'



export const connectBankInfo = connect(
    selectBankInfo,
    dispatch => bindActionCreators(
        {
            getBankInfo
        }, dispatch)
);

export const connectBankInfoForm = connect(
    selectBankInfo,
    dispatch => bindActionCreators(
        {
            updateBankInfoSuccess
        }, dispatch)
);