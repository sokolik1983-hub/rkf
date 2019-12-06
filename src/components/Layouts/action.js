import * as actionTypes from './actionTypes';
import {makeActionCreator} from "../../utils";

export const setShowFilters = makeActionCreator(actionTypes.SET_SHOW_FILTERS, 'data');