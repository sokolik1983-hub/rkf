import {call, put, takeLatest} from 'redux-saga/effects'
import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* getDict(action) {
    console.log('action', action)
    try {
        const data = yield call(Api.getDict, action);
        yield put(actions.getDictSuccess(action.dictName, data.result))
    } catch (error) {
        console.error(error, error.responseStatus, error.response);
        yield put(actions.getDictFailed(error.response.errors))
    }
}



export default function* dictionariesSaga() {
    yield takeLatest(actionTypes.GET_DICT, getDict);
}

