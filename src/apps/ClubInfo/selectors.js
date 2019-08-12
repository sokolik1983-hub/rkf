import {defaultReduxKey} from "./config";
import {objectNotEmpty} from "../../utils";
import {getAuthenticationState} from 'apps/Auth/selectors'
export const selectClubId = state => {
    const {club_info} = state.client_common;
    return {
        club_id: objectNotEmpty(club_info) ? club_info.club_id : null
    }
};
export const selectClubInfo = state => {
    const {profile_id} = getAuthenticationState(state);
    return {
        club_id:profile_id,
        clubInfo: state[defaultReduxKey].clubInfo
    }
};