import { makeActionCreator } from 'utils/index'
import * as actiontypes from './actiontypes';

export const pushMessage = makeActionCreator(actiontypes.PUSH_MESSAGE, 'data');
export const removeMessage = makeActionCreator(actiontypes.REMOVE_MESSAGE, 'id');
export const clearMessages = makeActionCreator(actiontypes.CLEAR_MESSAGES);