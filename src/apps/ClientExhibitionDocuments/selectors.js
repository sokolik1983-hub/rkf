import {defaultReduxKey} from './config'


export const selectListItem = (state, props) => {
    const {id} = props;
    return {
        ...state[defaultReduxKey].listCollection[String(id)]
    }
};

export const selectExhibitionDocumentsList = state => ({
    listIds: state[defaultReduxKey].listIds,
    listCollection: state[defaultReduxKey].listCollection
});
