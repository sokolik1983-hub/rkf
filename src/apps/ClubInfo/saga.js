import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* getClubInfo(action) {
    try {
        const data = yield call(Api.getClubInfo, action);
        yield put(actions.getClubInfoSuccess(data.result))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getClubInfoFailed(error.response.errors))
    }
}

export default function* clientClubInfoSaga() {
    yield takeLatest(actionTypes.GET_CLUB_INFO, getClubInfo);
}

