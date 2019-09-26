import { useState, useMemo, useEffect } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";
import { getHeaders } from "../utils/request";

export const useVisibility = (initialVisibility = false) => {
    const [visibility, setVisibility] = useState(initialVisibility);
    const toggleVisibility = () => setVisibility(!visibility);
    const setVisible = () => setVisibility(true);
    const setInvisible = () => setVisibility(false);
    return useMemo(
        () => ({
            visibility,
            toggleVisibility, setVisible, setInvisible,
        }),
        [toggleVisibility, setVisible, setInvisible, visibility],
    );
};

export const useFocus = (initialFocus = false) => {
    const [focus, setFocus] = useState(initialFocus);
    const setFocused = () => setFocus(true);
    const setBlured = () => setFocus(false);
    return useMemo(
        () => ({
            focus,
            setFocused, setBlured
        }),
        [setFocused, setBlured, focus],
    );
};

export const useConfirmDialog = (initialConfirmState = false) => {
    const [confirm, setConfirm] = useState(initialConfirmState);
    const onConfirm = () => setConfirm(true);
    const onCancel = () => setConfirm(false);
    return useMemo(
        () => ({
            confirm,
            onConfirm, onCancel
        }),
        [confirm, onConfirm, onCancel],
    );
};


export const useResourceAndStoreToRedux = (resourceUrl, onSuccessAction, onErrorAction) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [requestError, setError] = useState(null);

    useEffect(() => {
        let didCancel = false;

        const axiosConfig = {
            url: resourceUrl,
            headers: getHeaders(),
        };

        const fetchData = async () => {
            try {
                setLoading(true);

                const response = await axios(axiosConfig);

                if (!didCancel) {
                    dispatch(onSuccessAction(response.data.result));
                    setLoading(false);
                }
            } catch (error) {
                setError(error.response);

                if (!didCancel) {
                    if (onErrorAction) {
                        dispatch(onErrorAction(error.response.data.errros));
                    }

                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        };
    }, [resourceUrl]);

    return {
        loading,
        requestError
    }
};


export const usePictureWithUpdate = (endpoint, successAction) => {
    const [state, setState] = useState({ fileInputValue: "", filePreview: null });
    const handleFileInputChange = e => {
        if (e.target.files) {
            const fileInputValue = e.target.files[0];
            setState({ filePreview: URL.createObjectURL(fileInputValue), fileInputValue })
        }
    };
    const clear = () => setState({ ...state, fileInputValue: null });
    const sendFile = () => {
        let didCancel = false;
        const send = async () => {

            if (state.fileInputValue) {
                const data = new FormData();
                data.append('file', state.fileInputValue);
                const config = {
                    url: endpoint,
                    method: "POST",
                    data: data,
                    headers: getHeaders(true)
                };

                const response = await axios(config);
                successAction(response.data.result)
            }

        };
        if (!didCancel) {
            send()
        }
    };
    return ({
        ...state,
        clear,
        handleFileInputChange,
        sendFile
    })
};


export const useWrapClassName = (className) => {
    useEffect(() => {
        // Add class on mount
        const wrap = document.getElementById("wrap");
        wrap.classList.add(className);

        return (
            // Remove on Unmount
            () => wrap.classList.remove(className)
        )

    }, [className]);
};


export const useTimeOut = (callback, time) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            callback()
        }, time);
        return () => clearTimeout(timer);
    }, [callback, time]);
};