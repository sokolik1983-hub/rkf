import {defaultReduxKey} from "./config";

export const selectLegalInfo = state => ({clubLegalInfo: state[defaultReduxKey].clubLegalInfo});