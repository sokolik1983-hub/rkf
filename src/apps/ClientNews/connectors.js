import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectNewsList,
    selectListArticle
} from './selectors'
import {
    getNewsSuccess,
    addArticleSuccess,
    deleteArticleSuccess,
} from './actions'

export const connectNewsList = connect(
    selectNewsList,
    dispatch => bindActionCreators({
        getNewsSuccess
    }, dispatch)
);

export const connectListArticle = connect(
    selectListArticle,
    dispatch => bindActionCreators({
        deleteArticleSuccess
    }, dispatch)
);

export const connectArticleForm = connect(
    null,
    dispatch => bindActionCreators({
        addArticleSuccess
    }, dispatch)
);