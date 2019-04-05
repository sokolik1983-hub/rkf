import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'



export function* fetchExhibitions(action) {
    try {
        const data = yield call(Api.fetchExhibitions, action);
        yield put(actions.fetchExhibitionsSuccess(data))
    } catch (error) {
        console.log(error.message);
        yield put(actions.fetchExhibitionsFailed(error))
    }
}

export default function* appSaga() {
    yield takeLatest(actionTypes.GET_EXHIBITIONS, fetchExhibitions);
}

