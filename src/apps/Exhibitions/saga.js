import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'



export function* fetchDemo(action) {
    try {
        const data = yield call(Api.fetchDemo, action);
        yield put(actions.fetchDemoSuccess(data))
    } catch (error) {
        console.log(error.message);
        yield put(actions.fetchDemoFailed(error))
    }
}

export default function* appSaga() {
    yield takeLatest(actionTypes.FETCH_DEMO, fetchDemo);
}

