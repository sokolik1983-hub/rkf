import {defaultReduxKey} from "./config";
import {selectLegalInfoId} from "../../selectors";

export const selectLegalInfo = state => {
    const {legal_information_id} = selectLegalInfoId(state);
    const {clubLegalInfo} = state[defaultReduxKey];
    return {
        legal_information_id,
        clubLegalInfo
    }
};