import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'


export const getNewsSuccess = makeActionCreator(actionTypes.GET_NEWS_SUCCESS, 'data');

export const addArticleSuccess = makeActionCreator(actionTypes.ADD_ARTICLE_SUCCESS, 'data');

export const deleteArticleSuccess = makeActionCreator(actionTypes.DELETE_ARTICLE_SUCCESS, 'id');