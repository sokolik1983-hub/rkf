import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectNews,
    selectNewsStory,
} from './selectors'

import {
    getNews,
    addNewsSuccess,
    deleteNewsStorySuccess
} from './actions'


export const connectNewsForm = connect(
    selectNews,
    dispatch => bindActionCreators(
        {
            addNewsSuccess,
        }, dispatch)
);

export const connectNewsList = connect(
    selectNews,
    dispatch => bindActionCreators(
        {
            getNews,
        }, dispatch)
);

export const connectNewsStory = connect(
    selectNewsStory,
    dispatch => bindActionCreators(
        {
            getNews,
            deleteNewsStorySuccess
        }, dispatch)
);