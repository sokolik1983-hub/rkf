import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');

export const getNews = makeActionCreator(actionTypes.GET_NEWS, 'clubId');
export const getNewsSuccess = makeActionCreator(actionTypes.GET_NEWS_SUCCESS, 'data');
export const getNewsFailed = makeActionCreator(actionTypes.GET_NEWS_FAILED, 'errors');