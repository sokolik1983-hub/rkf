import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import {getDict} from './actions'


export const useDictionary = (dictName) => {
    const dispatch = useDispatch();
    // connect to store
    const dictionaries = useSelector(state => state.dictionaries);
    // select dict by dictName
    const dict = dictionaries[dictName];

    // if loaded return dict
    useEffect(() => {
        if (!dict.loaded && !dict.loading) {
            dispatch(getDict(dictName))
        }
    },[dictName, dict.loaded]);

    return {
        dictionary: dict
    }
};