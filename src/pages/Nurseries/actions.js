import * as actiontypes from './actiontypes';
import {makeActionCreator} from "../../utils";

export const setFilters = makeActionCreator(actiontypes.SET_FILTERS_SUCCESS, 'data');