import {defaultReduxKey} from "./config";
import {selectBankInfoId} from 'apps/ClientClub/selectors'

export const selectBankInfo = state => {
    const {bank_data_id} = selectBankInfoId(state);
    const {clubBankInfo} = state[defaultReduxKey];
    return {
        bank_data_id,
        clubBankInfo
    }
};