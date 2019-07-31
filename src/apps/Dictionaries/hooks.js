import {useState, useMemo, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux'
import {
    storeDict
} from './actions'
import {normalizeDictList} from './normalize'
import axios from 'axios'
import {getHeaders} from "utils/request";
import {isDevEnv} from "utils/index";

const isDev = isDevEnv();

const prepareUrl = url => isDev ? 'http://dev.uep24.ru' + url : url;

const config = {headers: getHeaders()};

export const useDictionary = (dictName, elementId) => {
    const dispatch = useDispatch();

    const [dictionary, setDictionary] = useState(null);
    const [loading, setLoading] = useState(false);
    //const [loading, setLoading] = useState(false);

    // connect to store
    const dictionaries = useSelector(state => state.dictionaries);
    // select dict by dictName
    const dict = dictionaries[dictName];
    // if loaded return dict
    useEffect(() => {
        let didCancel = false;
        const getDict = async (url) => {
            // get dict from api
            setLoading(true);
            const response = await axios.get(prepareUrl(url), config);
            const data = response.data.result;
            // normalize return array to Object

            if (!didCancel) {
                const normalizedDictionary = normalizeDictList(data);
                // Store dict to redux store
                dispatch(storeDict(dictName, normalizedDictionary));
                setLoading(false)
            }
        };

        if (!dict.loaded) {
            getDict(dict.url);
        }

        return () => {
            didCancel = true;
        };

    }, [dictName]);

    console.log('dictionary', dictionary)
    // return dict
    return () => ({
        dictionary,
        loading,
    })
};