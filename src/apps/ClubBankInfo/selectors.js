import {defaultReduxKey} from "./config";
import {selectBankInfoId} from 'apps/ClientClub/selectors'

export const selectBankInfo = state => {
    const {legal_information_id} = selectBankInfoId(state);
    const {clubBankInfo} = state[defaultReduxKey];
    return {
        legal_information_id,
        clubBankInfo
    }
};