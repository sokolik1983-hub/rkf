import {defaultReduxKey} from "./config";
import {selectProfileId} from "apps/Auth/selectors";

export const selectClubId = state => {
    const {profile_id: club_id} = selectProfileId(state);
    return {
        club_id
    }
};

export const selectListDocument = state => {
    const {profile_id: club_id} = selectProfileId(state);
    const {
        listIds,
        listCollection,
    } = state[defaultReduxKey];
    return {
        listIds,
        listCollection,
        club_id,
    }
};



export const selectClubDocument=(state,props)=>{
    const {listCollection}=selectListDocument(state);
    return{
        ...listCollection[String(props.id)]
    }
};