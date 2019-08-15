import {defaultReduxKey} from './config'


export const getState = state => state[defaultReduxKey];

export const selectNews = state => {
    const {listIds, listCollection} = getState(state);
    return {listIds, listCollection}
};

export const selectNewsStory = (state, props) => {
    const {listCollection} = getState(state);
    return {
        newsStory: listCollection[props.id.toString()]
    }
};