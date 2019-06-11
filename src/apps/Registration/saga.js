import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* registerUser(action) {
    try {
        const data = yield call(Api.registerUser, action);
        console.log('registerUser.success', data)
        yield put(actions.registerUserSuccess(data))

        //TODO Добавить таймер на обнуление статуса registrationComplete:false
    } catch (error) {
        console.log('registerUser.error', error)
        if (error.response) {
            console.log('registerUser.error.response', error.response)
            yield put(actions.registerUserFailed(error.response))
        }
    }
}

export default function* registrationSaga() {
    yield takeLatest(actionTypes.REGISTER, registerUser);
}

