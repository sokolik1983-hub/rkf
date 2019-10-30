import { useCallback } from 'react'
import { useDispatch } from "react-redux";
import { pushMessage, clearMessages } from './actions'

export const usePushMessage = () => {
    const dispatch = useDispatch();
    const push = useCallback((message) =>
        dispatch(pushMessage(message)),
        []
    );
    return { push }
};

export const useClearMessages = () => {
    const dispatch = useDispatch();
    const clear = useCallback(() =>
        dispatch(clearMessages()),
        []
    );
    return { clear }
};