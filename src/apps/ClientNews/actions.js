import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');

export const getNews = makeActionCreator(actionTypes.GET_NEWS, 'clubId');
export const getNewsSuccess = makeActionCreator(actionTypes.GET_NEWS_SUCCESS, 'data');
export const getNewsFailed = makeActionCreator(actionTypes.GET_NEWS_FAILED, 'errors');

export const addNews = makeActionCreator(actionTypes.ADD_NEWS, 'data');
export const addNewsSuccess = makeActionCreator(actionTypes.ADD_NEWS_SUCCESS, 'data');
export const addNewsFailed = makeActionCreator(actionTypes.ADD_NEWS_FAILED, 'errors');

export const deleteNewsStorySuccess = makeActionCreator(actionTypes.DELETE_NEWS_SUCCESS, 'id');