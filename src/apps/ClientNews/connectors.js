import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
    selectNewsList,
    selectListArticle,
    selectArticleCreateForm
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

export const connectArticleCreateForm = connect(
    selectArticleCreateForm,
    dispatch => bindActionCreators({}, dispatch)
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