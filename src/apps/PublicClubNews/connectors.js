import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectNews,
    selectNewsStory,
} from './selectors'

import {
    getNewsSuccess,
} from './actions'


export const connectNewsList = connect(
    selectNews,
    dispatch => bindActionCreators(
        {
            getNewsSuccess,
        }, dispatch)
);

export const connectNewsStory = connect(
    selectNewsStory,
);