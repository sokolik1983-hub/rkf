import * as actiontypes from './actiontypes';
import createReducer from 'utils/createReducer'
import genID from 'utils/genID'

const messagesInitialState = {
    messages: []
};


const messagesReducer = createReducer(messagesInitialState, {
    [actiontypes.PUSH_MESSAGE](state, action) {
        const id = genID();
        const messages = [...state.messages, { id, ...action.data }];
        return {
            ...state,
            messages
        };
    },
    [actiontypes.REMOVE_MESSAGE](state, action) {
        const messages = state.messages.filter(message => message.id !== action.id);
        return {
            ...state,
            messages
        };
    },
    [actiontypes.CLEAR_MESSAGES](state) {
        const messages = [];
        return {
            ...state,
            messages
        };
    },
});


export default messagesReducer;