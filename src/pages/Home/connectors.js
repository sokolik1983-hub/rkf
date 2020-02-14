import { connect } from 'react-redux';
import { getNewsSuccess } from './actions';
import { bindActionCreators } from "redux";


export const connectNewsList = connect(
    null,
    dispatch => bindActionCreators(
        {
            getNewsSuccess
        }, dispatch)
);