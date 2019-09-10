import { defaultReduxKey } from './config';

const getState = state => state[defaultReduxKey];

export const selectExhibitionDocumentList = state => {
    const { listIds } = getState(state);
    return {
        listIds
    };
};

export const selectExhibitionDocument = (state, props) => {
    const { listCollection } = getState(state);
    return {
        ...listCollection[String(props.id)]
    };
};
