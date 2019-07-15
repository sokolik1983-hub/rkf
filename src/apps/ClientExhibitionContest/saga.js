import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'

export function* getContest(action) {
    try {
        const data = yield call(Api.getContest, action);
        yield put(actions.getContestSuccess(data.result))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getContestFailed(error.response.errors))
    }
}


export function* deleteContestDate(action) {
    try {
        const data = yield call(Api.deleteContestDate, action);
        if (data === null) {
            yield put(actions.deleteContestDateSuccess(action.id))
        }
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.deleteContestDateFailed(action.id, error.response.errors))
    }
}

export function* deleteContestEvent(action) {
    try {
        const data = yield call(Api.deleteContestEvent, action);
        if (data.result) {
            yield put(actions.deleteContestEventSuccess(action.id, action.day))
        }

    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.deleteContestEventFailed(action.id, error.response.errors))
    }
}


export default function* clientExhibitionContestSaga() {
    yield takeLatest(actionTypes.GET_SCHEDULE, getContest);
    yield takeLatest(actionTypes.DATE_DELETE, deleteContestDate);
    yield takeLatest(actionTypes.EVENT_DELETE, deleteContestEvent);
}

