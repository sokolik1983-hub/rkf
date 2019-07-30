import {defaultReduxKey} from "./config";

export const selectBankInfo = state => ({clubBankInfo: state[defaultReduxKey].clubBankInfo});