import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getExhibitionDocumentsListSuccess = makeActionCreator(actionTypes.GET_LIST_SUCCESS, 'data');