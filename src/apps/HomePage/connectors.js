import {connect} from 'react-redux'
import {
    selectExhibitions,
    selectExhibition,
    selectNews,
    selectNewsStory,
    selectClubHeader,
    selectFeaturedExhibitionsList,
    selectClubDescription,
    selectClubAddress,
    selectClubContacts,
    selectClubDocuments,

} from './selectors'

import {
    getCommonSuccess,
    getNewsSuccess,
    getExhibitionsSuccess,
    storeExhibitions
} from './actions'
import {bindActionCreators} from "redux";


export const connectNewsList = connect(
    selectNews,
    dispatch => bindActionCreators(
        {
            getNewsSuccess
        }, dispatch)
);

export const connectExh = connect(
    selectNews,
    dispatch => bindActionCreators(
        {
            getNewsSuccess
        }, dispatch)
);

export const connectNewsStory = connect(
    selectNewsStory
);

export const connectClubCommon = connect(
    null,
    dispatch => bindActionCreators(
        {
            getCommonSuccess
        }, dispatch)
);


export const connectClubCommonExhibitions = connect(
    selectFeaturedExhibitionsList,
    dispatch => bindActionCreators(
        {
            storeExhibitions
        }, dispatch)
);

export const connectClubHeader = connect(
    selectClubHeader
);


export const connectFeaturedExhibitionsList = connect(
    selectFeaturedExhibitionsList,
    dispatch => bindActionCreators(
        {
            storeExhibitions
        }, dispatch)
);

export const connectClubDescription = connect(
    selectClubDescription,
);


export const connectClubAddress = connect(
    selectClubAddress,
);

export const connectClubContacts = connect(
    selectClubContacts,
);


export const connectClubDocuments = connect(
    selectClubDocuments,
);