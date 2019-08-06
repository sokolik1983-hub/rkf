import * as actiontypes from './actiontypes';
import {normalizeExhibitionList} from './normalize'
import createReducer from 'utils/createReducer'

const clientInitialState = {
    loadingApi: false,
    exhibitionIdList: [],
    exhibitions: {},
    exhibitionsDetails: {},
    requestErrors: {},
    listDays: []
};

const clientExhibitionsReducer = createReducer(clientInitialState, {
    [actiontypes.GET_LIST](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    // [actiontypes.GET_LIST_SUCCESS](state, action) {
    //     const {entities, result: exhibitionIdList} = normalizeExhibitionList(action.data)
    //     const {exhibitions} = entities;
    //     return {
    //         ...state,
    //         loading: false,
    //         exhibitions,
    //         exhibitionIdList,
    //         listDays: action.data,
    //     };
    // },
    [actiontypes.GET_LIST_SUCCESS](state, action) {
        const {entities, result: exhibitionIdList} = normalizeExhibitionList(action.data);
        const {exhibitions} = entities;
        return {
            ...state,
            loading: false,
            exhibitions,
            exhibitionIdList,
        };
    },
    [actiontypes.GET_LIST_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        };
    },
    [actiontypes.ADD](state, action) {
        return {
            ...state,
            loading: true,
        };
    },

    [actiontypes.ADD_SUCCESS](state, action) {
        const {id} = action.data;
        const exhibitionIdList = [...state.exhibitionIdList, id];
        const exhibitions = {...state.exhibitions};
        exhibitions[String(id)] = action.data;
        const exhibitionsDetails = {...state.exhibitionsDetails};
        exhibitionsDetails[String(id)] = action.data;
        return {
            ...state,
            exhibitionIdList,
            exhibitions,
            exhibitionsDetails,
            loading: false,
        };
    },
    [actiontypes.ADD_FAILED](state, action) {
        return {
            ...state,
            loading: false,
        };
    },
    [actiontypes.DETAILS_SUCCESS](state, action) {
        const {id} = action.data;
        const exhibitionsDetails = {...state.exhibitionsDetails};
        exhibitionsDetails[String(id)] = action.data;
        return {
            ...state,
            loading: false,
            exhibitionsDetails,
        };
    },
    [actiontypes.UPDATE_SUCCESS](state, action) {
        const {id} = action.data;
        const exhibitionsDetails = {...state.exhibitionsDetails};
        exhibitionsDetails[String(id)] = action.data;
        return {
            ...state,
            loading: false,
            exhibitionsDetails,
        };
    },

    [actiontypes.ADD_AVATAR_SUCCESS](state, action) {
        const {exhibition_id} = action.data;
        const exhibitionsDetails = {...state.exhibitionsDetails};
        const exhibitionDetails = {...exhibitionsDetails[String(exhibition_id)]};
        exhibitionDetails.exhibition_avatar_link = action.data.picture_link;
        exhibitionsDetails[String(exhibition_id)]=exhibitionDetails;
        return {
            ...state,
            exhibitionsDetails
        };
    },
    [actiontypes.DELETE_AVATAR_SUCCESS](state, action) {
        const {exhibition_id} = action.data;
        const exhibitionsDetails = {...state.exhibitionsDetails};
        const exhibitionDetails = {...exhibitionsDetails[String(exhibition_id)]};
        exhibitionDetails.exhibition_avatar_link = action.data.picture_link;
        exhibitionsDetails[String(exhibition_id)]=exhibitionDetails;
        return {
            ...state,
            exhibitionsDetails
        };
    },
    [actiontypes.ADD_MAP_SUCCESS](state, action) {
        const {exhibition_id} = action.data;
        const exhibitionsDetails = {...state.exhibitionsDetails};
        const exhibitionDetails = {...exhibitionsDetails[String(exhibition_id)]};
        exhibitionDetails.exhibition_map_link = action.data.picture_link;
        exhibitionsDetails[String(exhibition_id)]=exhibitionDetails;
        return {
            ...state,
            exhibitionsDetails
        };
    },
    [actiontypes.DELETE_MAP_SUCCESS](state, action) {
        const {exhibition_id} = action.data;
        const exhibitionsDetails = {...state.exhibitionsDetails};
        const exhibitionDetails = {...exhibitionsDetails[String(exhibition_id)]};
        exhibitionDetails.exhibition_map_link = null;
        exhibitionsDetails[String(exhibition_id)]=exhibitionDetails;
        return {
            ...state,
            exhibitionsDetails
        };
    },
});

export default clientExhibitionsReducer;