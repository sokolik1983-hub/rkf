import { defaultReduxKey } from './config';

export const selectListDocument = state => {
    const { listIds, listCollection } = state[defaultReduxKey];
    return {
        listIds,
        listCollection
    };
};

export const selectExhibitionDocument = (state, props) => {
    const { listCollection } = selectListDocument(state);
    return {
        clubDocument: listCollection[String(props.id)]
    };
};
