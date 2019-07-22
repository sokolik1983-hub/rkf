import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* getProfile(action) {
    try {
        const data = yield call(Api.getProfile, action);
        yield put(actions.getProfileSuccess(data.result))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getProfileFailed(error.response.errors))
    }
}

export default function* clientProfileSaga() {
    yield takeLatest(actionTypes.GET_PROFILE, getProfile);
}

