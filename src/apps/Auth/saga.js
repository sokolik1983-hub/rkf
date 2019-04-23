import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'



export function* loginUser(action) {
    try {
        const data = yield call(Api.loginUser, action);
        yield put(actions.loginUserSuccess(data))
    } catch (error) {
        console.log(error.message);
        yield put(actions.loginUserFailed(error))
    }
}

export default function* appSaga() {
    yield takeLatest(actionTypes.LOGIN, loginUser);
}

