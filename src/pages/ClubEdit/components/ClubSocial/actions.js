import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getClubSocialListSuccess = makeActionCreator(actionTypes.GET_LIST_SUCCESS, 'data');
export const addClubSocialSuccess = makeActionCreator(actionTypes.ADD_SOCIAL_SUCCESS, 'data');
export const updateClubSocialSuccess = makeActionCreator(actionTypes.UPDATE_SOCIAL_SUCCESS, 'data');
export const deleteClubSocialSuccess = makeActionCreator(actionTypes.DELETE_SOCIAL_SUCCESS, 'data');
