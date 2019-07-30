import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* getBankInfo(action) {
    try {
        const data = yield call(Api.getBankInfo, action);
        yield put(actions.getBankInfoSuccess(data.result))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getBankInfoFailed(error.response.errors))
    }
}

export default function* clientBankInfoSaga() {
    yield takeLatest(actionTypes.GET_LEGAL_INFO, getBankInfo);
}

