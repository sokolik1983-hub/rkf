import {defaultReduxKey} from "./config";

export const selectClubInfo = state => ({clubInfo: state[defaultReduxKey].clubInfo});