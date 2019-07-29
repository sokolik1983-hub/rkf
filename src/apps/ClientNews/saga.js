import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'

import {newsArr} from './config'

export function* getNews(action) {
    try {
        const data = yield call(Api.getNews, action);
        yield put(actions.getNewsSuccess(data.result));
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getNewsFailed(error.response.errors))
    }
}

export default function* clientExhibitionScheduleSaga() {
    yield takeLatest(actionTypes.GET_NEWS, getNews);
}

