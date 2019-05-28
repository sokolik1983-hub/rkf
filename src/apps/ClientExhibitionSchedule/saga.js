import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'

export function* getSchedule(action) {
    try {
        const data = yield call(Api.getSchedule, action);
        yield put(actions.getScheduleSuccess(data))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getScheduleFailed(error.response))
    }
}

export function* addDay(action) {
    try {
        const data = yield call(Api.addDay, action);
        yield put(actions.addDaySuccess(data))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.addDayFailed(error.response))
    }
}

export function* updateDay(action) {
    try {
        const data = yield call(Api.updateDay, action);
        yield put(actions.updateDaySuccess(action.id, data))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.updateDayFailed(action.id, error.response))
    }
}

export function* deleteDay(action) {
    try {
        const data = yield call(Api.deleteDay, action);
        if (data === null) {
            yield put(actions.deleteDaySuccess(action.id))
        }
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.deleteDayFailed(action.id, error.response))
    }
}


export function* addDayItem(action) {
    try {
        const data = yield call(Api.addDayItem, action);
        yield put(actions.addDayItemSuccess(data))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.addDayItemFailed(error.response))
    }
}

export function* updateDayItem(action) {
    try {
        const data = yield call(Api.updateDayItem, action);
        yield put(actions.updateDayItemSuccess(action.id, data))
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.updateDayItemFailed(action.id, error.response))
    }
}

export function* deleteDayItem(action) {
    try {
        const data = yield call(Api.deleteDayItem, action);
        if (data === null) {
            yield put(actions.deleteDayItemSuccess(action.id))
        }

    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.deleteDayItemFailed(action.id, error.response))
    }
}


export default function* clientExhibitionScheduleSaga() {
    yield takeLatest(actionTypes.GET_SCHEDULE, getSchedule);

    yield takeLatest(actionTypes.DAY_ADD, addDay);
    yield takeLatest(actionTypes.DAY_UPDATE, updateDay);
    yield takeLatest(actionTypes.DAY_DELETE, deleteDay);

    yield takeLatest(actionTypes.DAY_ITEM_ADD, addDayItem);
    yield takeLatest(actionTypes.DAY_ITEM_UPDATE, updateDayItem);
    yield takeLatest(actionTypes.DAY_ITEM_DELETE, deleteDayItem);
}

