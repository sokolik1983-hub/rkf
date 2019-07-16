import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectNews,
    selectNewsStory,
} from './selectors'

import {
    getNews,
} from './actions'



export const connectNewsList = connect(
    selectNews,
    dispatch => bindActionCreators(
        {
            getNews
        }, dispatch)
);

export const connectNewsStory = connect(
    selectNewsStory,
    dispatch => bindActionCreators(
        {
            getNews
        }, dispatch)
);