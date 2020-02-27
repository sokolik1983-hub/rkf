import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getClubSuccess = makeActionCreator(actionTypes.GET_CLUB_SUCCESS, 'data');
export const clubPictureUpdateSuccess = makeActionCreator(actionTypes.CLUB_HEADER_UPDATE_SUCCESS, 'data');
export const clubLogoUpdateSuccess = makeActionCreator(actionTypes.CLUB_LOGO_UPDATE_SUCCESS, 'data');
export const clubAliasUpdateSuccess = makeActionCreator(actionTypes.CLUB_ALIAS_UPDATE_SUCCESS, 'data');
export const clubInfoUpdateSuccess = makeActionCreator(actionTypes.CLUB_INFO_UPDATE_SUCCESS, 'data');
export const clubScheduleUpdateSuccess = makeActionCreator(actionTypes.CLUB_SCHEDULE_UPDATE_SUCCESS, 'data');
