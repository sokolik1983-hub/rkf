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


export const selectNews = state => {
    return {...state[defaultReduxKey].news}
};

export const selectNewsStory=(state,props)=>{
    const {listCollection} = selectNews(state);
    return {
        ...listCollection[String(props.id)]
    }
};