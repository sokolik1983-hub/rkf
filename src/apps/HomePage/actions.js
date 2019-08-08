import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getExhibitionsSuccess = makeActionCreator(actionTypes.GET_EXHIBITIONS_SUCCESS, 'data');
export const getNewsSuccess = makeActionCreator(actionTypes.GET_NEWS_SUCCESS, 'data');