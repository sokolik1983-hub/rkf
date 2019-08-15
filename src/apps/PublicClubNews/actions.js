import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getNewsSuccess = makeActionCreator(actionTypes.GET_NEWS_SUCCESS, 'data');