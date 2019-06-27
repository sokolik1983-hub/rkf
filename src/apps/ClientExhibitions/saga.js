import {call, put, takeLatest} from 'redux-saga/effects'
import { push } from 'connected-react-router'
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

export function* addExhibition(action) {
    try {
        const data = yield call(Api.addExhibition, action);
        const {id} = data.result;
        yield put(actions.addExhibitionSuccess(data.result));
        yield put(push(`/client/exhibitions/${id}/details/schedule`))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.addExhibitionFailed(error.response.errors))
    }
}

export function* updateExhibition(action) {
    try {
        const data = yield call(Api.updateExhibition, action);
        yield put(actions.updateExhibitionSuccess(data.result))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.updateExhibitionFailed(error.response.errors))
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
    yield takeLatest(actionTypes.ADD, addExhibition);
}

