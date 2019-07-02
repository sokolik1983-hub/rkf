import {call, put, takeLatest} from 'redux-saga/effects'
import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* getExhibitionList(action) {
    try {
        const data = yield call(Api.getExhibitionList, action);
        yield put(actions.getExhibitionListSuccess(data.result))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getExhibitionListFailed(error.response.errors))
    }
}

export function* getExhibitionDetails(action) {
    try {
        const data = yield call(Api.getExhibitionDetails, action);
        yield put(actions.getExhibitionDetailsSuccess(data.result))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getExhibitionDetailsFailed(error.response.errors))
    }
}


export function* deleteExhibition(action) {
    try {
        const data = yield call(Api.deleteExhibition, action);
        yield put(actions.deleteExhibitionSuccess(data))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.deleteExhibitionFailed(error.response))
    }
}


export default function* clientExhibitionScheduleSaga() {
    yield takeLatest(actionTypes.GET_LIST, getExhibitionList);
    yield takeLatest(actionTypes.DETAILS, getExhibitionDetails);
}

