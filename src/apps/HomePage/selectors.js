import {defaultReduxKey} from "./config";

export const selectExhibitions = state => {
    return {...state[defaultReduxKey].exhibitions}
};

export const selectExhibition=(state,props)=>{
    const {listCollection} = selectExhibitions(state);
    return {
        ...listCollection[String(props.id)]
    }
};