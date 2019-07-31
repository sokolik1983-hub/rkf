import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* getLegalInfo(action) {
    window.alert('GET_LEGAL_INFO')
    try {

        const data = yield call(Api.getLegalInfo, action);
        yield put(actions.getLegalInfoSuccess(data.result))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getLegalInfoFailed(error.response.errors))
    }
}

export default function* clientLegalInfoSaga() {
    yield takeLatest(actionTypes.GET_LEGAL_INFO, getLegalInfo);
}

