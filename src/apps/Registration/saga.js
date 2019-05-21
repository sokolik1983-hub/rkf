import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* registerUser(action) {
    try {
        const data = yield call(Api.registerUser, action);
        yield put(actions.registerUserSuccess(data))
    } catch (error) {
        console.log(error)
        if (error.response) {
            yield put(actions.registerUserFailed(error.response))
        }
    }
}

export default function* registrationSaga() {
    yield takeLatest(actionTypes.REGISTER, registerUser);
}

