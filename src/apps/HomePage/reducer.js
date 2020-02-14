import * as actiontypes from './actiontypes';
import { combineReducers } from "redux";
import createReducer from 'utils/createReducer'

// const homePageExhibitionsInitialState = {
//     list: [],
// };

const homePageNewsInitialState = {
    articles_count: null,
    articles: [],
    current_page: 1,
    current_active_typ: null
};

// const homePageClubInitialState = {
//     route: '',
//     contacts: [],
//     documents: [],
//     common: {}
// };


// const exhibitions = createReducer(homePageExhibitionsInitialState, {
//     [actiontypes.GET_EXHIBITIONS_SUCCESS](state, action) {
//         return {
//             ...state,
//             list: action.data
//         };
//     },
// });

const news = createReducer(homePageNewsInitialState, {
    [actiontypes.GET_NEWS_SUCCESS](state, action) {
        return {
            ...action.data
        };
    },
});

// const club = createReducer(homePageClubInitialState, {
//     [actiontypes.GET_COMMON_SUCCESS](state, action) {
//         const { documents, contacts, ...common } = action.data;
//         const { shortcut_route_name: route } = common;
//         return {
//             ...state,
//             route,
//             documents,
//             contacts,
//             common
//         };
//     },
// });


const homePageReducer = combineReducers({
    news
});


export default homePageReducer;