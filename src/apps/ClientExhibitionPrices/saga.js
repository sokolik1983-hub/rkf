import {call, put, takeLatest} from 'redux-saga/effects'

import Api from './api'

import * as actionTypes from './actiontypes'
import * as actions from './actions'


export function* addExhibitionPrice(action) {
    try {
        const data = yield call(Api.addExhibitionPrice, action);
        yield put(actions.addExhibitionPriceSuccess(data))
    } catch (error) {
        yield put(actions.addExhibitionPriceFailed(error.response))
    }
}

export default function* authSaga() {
    yield takeLatest(actionTypes.ADD, addExhibitionPrice);
}

