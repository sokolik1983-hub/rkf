import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'


export const getDict = makeActionCreator(actionTypes.GET_DICT, 'dictName');
export const getDictSuccess = makeActionCreator(actionTypes.GET_DICT_SUCCESS, 'dictName', 'data');
export const getDictFailed = makeActionCreator(actionTypes.GET_DICT_FAILED, 'dictName', 'errors');