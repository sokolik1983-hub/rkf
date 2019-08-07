import {connect} from 'react-redux'
import {
    selectExhibitions,
    selectExhibition,
    selectNews,
    selectNewsStory,
} from './selectors'

export const connectExhibitionsAnnouncementList=connect(
    selectExhibitions
);

export const connectExhibitionsAnnouncement=connect(
    selectExhibition
);

export const connectNewsList=connect(
    selectNews
);

export const connectNewsStory=connect(
    selectNewsStory
);