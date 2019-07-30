import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'



export function* fetchExhibitions(action) {
    try {
        const data = yield call(Api.fetchExhibitions, action);
        yield put(actions.fetchExhibitionsSuccess(data.result))
    } catch (error) {
        console.log(error.message);
        yield put(actions.fetchExhibitionsFailed(error))
    }
}
export function* getDetails(action) {
    try {
        const data = yield call(Api.getDetails, action);
        yield put(actions.getDetailsSuccess(data.result))
    } catch (error) {
        console.log(error.message);
        yield put(actions.getDetailsFailed(error))
    }
}

export default function* appSaga() {
    yield takeLatest(actionTypes.GET_EXHIBITIONS, fetchExhibitions);
    yield takeLatest(actionTypes.GET_EXHIBITION_DETAILS, getDetails);
}

