import * as actiontypes from './actiontypes';
import {normalizeList} from 'shared/normilizers'
import createReducer from 'utils/createReducer'


const fakeData=[
    {
        id:1,
        title: 'Справка такая-то 1',
        link: 'http://yandex.disk/bla-bla-bla.jpg'
    },
    {
        id:2,
        title: 'Справка такая-то 2',
        link: 'http://yandex.disk/bla-bla-bla.jpg'
    },
    {
        id:3,
        title: 'Справка такая-то 3',
        link: 'http://yandex.disk/bla-bla-bla.jpg'
    },
    {
        id:4,
        title: 'Справка такая-то 4',
        link: 'http://yandex.disk/bla-bla-bla.jpg'
    },
];

const clientExhibitionDocumentsInitialState = {
    loadingApi: false,
    listCollection: {},
    listIds: [],
};

const clientExhibitionScheduleReducer = createReducer(clientExhibitionDocumentsInitialState, {
    [actiontypes.GET_LIST](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [actiontypes.GET_LIST_SUCCESS](state, action) {
        if (action.data.length) {
            const {entities, result: listIds} = normalizeList(fakeData);
            return {
                ...state,
                loading: false,
                listCollection: entities.listCollection,
                listIds
            };
        }
        return {
            ...state,
            loading: false,
        }
    },

    [actiontypes.GET_LIST_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        }
    },
    [actiontypes.ADD_DOCUMENT_SUCCESS](state, action) {
        const {id} = action.data;
        const documentsListCollection = {...state.documentsListCollection};
        const documentsListIds = [id, ...state.documentsListIds];
        documentsListCollection[id.toString()]=action.data;

        return {
            ...state,
            documentsListCollection,
            documentsListIds,
            loading: false,
        }
    },
});

export default clientExhibitionScheduleReducer;
