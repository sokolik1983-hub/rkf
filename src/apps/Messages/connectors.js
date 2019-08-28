import {bindActionCreators} from "redux";
import {connect} from 'react-redux'

import {
    selectMessages
} from './selectors'

import {
    pushMessage,
    removeMessage,
} from './actions'


export const connectMessages = connect(
    selectMessages,
    dispatch => bindActionCreators(
        {
            pushMessage,
            removeMessage,
        }, dispatch)
);

export const connectMessage = connect(
    null,
    dispatch => bindActionCreators(
        {
            removeMessage,
        }, dispatch)
);
