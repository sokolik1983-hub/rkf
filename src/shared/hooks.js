import {useState, useMemo, useEffect} from "react";
import axios from 'axios'
import {useDispatch} from "react-redux";
import {getHeaders} from "../utils/request";

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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let didCancel = false;
        const axiosConfig={
            url:resourceUrl,
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
        loading
    }
};