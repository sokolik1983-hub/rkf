import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'

export function* getExhibitionDocuments(action) {
    try {
        const data = yield call(Api.getExhibitionDocuments, action);
        yield put(actions.getExhibitionDocumentsSuccess(data.result));
    } catch (error) {
        console.log(error, error.responseStatus, error.response);
        yield put(actions.getExhibitionDocumentsFailed(error.response.errors))
    }
}

export default function* clientExhibitionScheduleSaga() {
    yield takeLatest(actionTypes.GET_LIST, getExhibitionDocuments);
}

