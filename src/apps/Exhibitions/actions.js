import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const loadingApi = makeActionCreator(actionTypes.LOADING, 'bool');


export const fetchDemo = makeActionCreator(actionTypes.FETCH_DEMO);
export const fetchDemoSuccess = makeActionCreator(actionTypes.FETCH_DEMO_SUCCESS, 'data');
export const fetchDemoFailed = makeActionCreator(actionTypes.FETCH_DEMO_FAILED, 'errors');