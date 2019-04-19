import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'



export function* fetchHomePage(action) {
    try {
        const data = yield call(Api.fetchHomePage, action);
        yield put(actions.fetchHomePageSuccess(data))
    } catch (error) {
        console.log(error.message);
        yield put(actions.fetchHomePageFailed(error))
    }
}

export default function* appSaga() {
    yield takeLatest(actionTypes.FETCH, fetchHomePage);
}

