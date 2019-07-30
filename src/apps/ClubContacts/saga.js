import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* getClubContacts(action) {
    try {
        const data = yield call(Api.getClubContacts, action);
        yield put(actions.getClubContactsSuccess(data.result))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getClubContactsFailed(error.response.errors))
    }
}

export default function* clientClubContactsSaga() {
    yield takeLatest(actionTypes.GET_LEGAL_INFO, getClubContacts);
}

