import * as actiontypes from './actiontypes';
import {normalizeDictList} from './normalize'
import createReducer from 'utils/createReducer'
import {dictionariesInitialState} from "./config"


const dictionariesReducer = createReducer(dictionariesInitialState, {
    [actiontypes.GET_DICT](state, action) {
        const {dictName} = action;
        const dict = {...state[dictName]};
        dict.loading = true;
        return {
            ...state,
            [dictName]: dict,
        };
    },
    [actiontypes.GET_DICT_SUCCESS](state, action) {
        const {dictName, data} = action;
        const dict = {...state[dictName]};
        const {entities: normalizedDict, result: dictIndex} = normalizeDictList(data);
        //console.log(normalizedDict, dictIndex)
        dict.dict = normalizedDict.dict;
        dict.dictIndex = dictIndex;
        dict.loading = false;
        dict.loaded = true;
        dict.options = data.map(i => ({value: i.id, label: i.name}));
        return {
            ...state,
            [dictName]: dict,
        };
    },
    [actiontypes.GET_DICT_FAILED](state, action) {
        const {dictName} = action;
        const dict = {...state[dictName]};
        dict.loading = false;
        return {
            ...state,
            [dictName]: dict,
        };
    },
});

export default dictionariesReducer;