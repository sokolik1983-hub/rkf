import * as actiontypes from "./actiontypes";
import {normalizeDictList} from "./normalize";
import createReducer from "../utils/createReducer";
import {dictionariesInitialState} from "./config";


const dictionariesReducer = createReducer(dictionariesInitialState, {
    [actiontypes.STORE_DICT](state, action) {
        const {dictName, data} = action;
        const dict = {...state[dictName]};

        return {
            ...state,
            [dictName]: {...dict, ...data}
        };
    },
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
        const {dictionary, options, dictIndex} = normalizeDictList(data);
        const dict = {...state[dictName]};
        return {
            ...state,
            [dictName]: {
                ...dict,
                dictionary,
                dictIndex,
                loading: false,
                loaded: true,
                options
            },
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
    }
});

export default dictionariesReducer;