import {defaultReduxKey} from "./config";

export const selectProfile=state=>(state[defaultReduxKey].profile);