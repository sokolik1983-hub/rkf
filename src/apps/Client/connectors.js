import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {defaultReduxKey} from "./config";
import {
    selectClubDescription,
    selectClubHead
} from './selectors'
import {
    getClubInfoSuccess,

} from './actions'

export const connectClientProxy = connect(
    state => ({...state[defaultReduxKey]}),
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