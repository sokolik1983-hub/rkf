import {connect} from 'react-redux'
import {bindActionCreators} from "redux";

import {
    selectClubDescription,
    selectClubHead,
    selectClientData,
} from './selectors'
import {
    getClubInfoSuccess,

} from './actions'

export const connectClientProxy = connect(
    selectClientData,
    dispatch => bindActionCreators(
        {
            getClubInfoSuccess
        }, dispatch
    )
);

export const connectClubDescription = connect(
    selectClubDescription
);

export const connectClubHeader = connect(
    selectClubHead
);