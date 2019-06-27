import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'

export function* getSchedule(action) {
    try {
        const data = yield call(Api.getSchedule, action);
        yield put(actions.getScheduleSuccess(data.result))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getScheduleFailed(error.response.errors))
    }
}


export function* deleteScheduleDate(action) {
    try {
        const data = yield call(Api.deleteScheduleDate, action);
        if (data === null) {
            yield put(actions.deleteScheduleDateSuccess(action.id))
        }
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.deleteScheduleDateFailed(action.id, error.response.errors))
    }
}

export function* deleteScheduleEvent(action) {
    try {
        const data = yield call(Api.deleteScheduleEvent, action);
        if (data === null) {
            yield put(actions.deleteScheduleEventSuccess(action.id))
        }

    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.deleteScheduleEventFailed(action.id, error.response.errors))
    }
}


export default function* clientExhibitionScheduleSaga() {
    yield takeLatest(actionTypes.GET_SCHEDULE, getSchedule);
    yield takeLatest(actionTypes.DATE_DELETE, deleteScheduleDate);
    yield takeLatest(actionTypes.EVENT_DELETE, deleteScheduleEvent);
}

