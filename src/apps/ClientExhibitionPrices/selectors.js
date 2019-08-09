import {defaultReduxKey} from './config'


export const selectExhibitionPriceList = (state) => {
    const {listCollection, listIds} = state[defaultReduxKey];
    return {
        listCollection,
        listIds
    }
};

export const selectPrice = (state, props) => {
    const {listCollection} = selectExhibitionPriceList(state);
    return {...listCollection[String(props.id)]}
}