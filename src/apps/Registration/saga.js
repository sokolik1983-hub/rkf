import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* registerUser(action) {
    try {
        const data = yield call(Api.registerUser, action);
        yield put(actions.registerUserSuccess(data))

        //TODO Добавить таймер на обнуление статуса registrationComplete:false
        //TODO Седлать переадрессацию прямо здесь
    } catch (error) {
        if (error.response) {
            console.log('registerUser.error.response', error.response)
            yield put(actions.registerUserFailed(error.response))
        }
    }
}

export default function* registrationSaga() {
    yield takeLatest(actionTypes.REGISTER, registerUser);
}

