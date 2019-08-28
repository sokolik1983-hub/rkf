import {useCallback} from 'react'
import {useDispatch} from "react-redux";
import {pushMessage} from './actions'

export const usePushMessage = () => {
    const dispatch = useDispatch();
    const push = useCallback((message) =>
            dispatch(pushMessage(message)),
        []
    );
    return {push}
};