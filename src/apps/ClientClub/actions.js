import * as actionTypes from './actiontypes';
import {makeActionCreator} from 'utils/index'

export const getClubSuccess = makeActionCreator(actionTypes.GET_CLUB_SUCCESS, 'data');
export const getClubPictureUpdateSuccess = makeActionCreator(actionTypes.CLUB_HEADER_UPDATE_SUCCESS, 'data');
export const getClubLogoUpdateSuccess = makeActionCreator(actionTypes.CLUB_LOGO_UPDATE_SUCCESS, 'data');
export const clubAliasUpdateSuccess = makeActionCreator(actionTypes.CLUB_ALIAS_UPDATE_SUCCESS, 'data');
export const clubInfoUpdateSuccess = makeActionCreator(actionTypes.CLUB_INFO_UPDATE_SUCCESS, 'data');
