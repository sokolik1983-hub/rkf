import {defaultReduxKey} from './config'

export const selectNews = state => ({
    newsIds: state[defaultReduxKey].newsIds,
    news: state[defaultReduxKey].news
});

export const selectNewsStory = (state, props) => ({newsStory: state[defaultReduxKey].news[props.id.toString()]});
