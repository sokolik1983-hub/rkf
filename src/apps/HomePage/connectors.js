import {connect} from 'react-redux'
import {
    selectExhibitions,
    selectExhibition,
} from './selectors'

export const connectExhibitionsAnnouncementList=connect(
    selectExhibitions
);

export const connectExhibitionsAnnouncement=connect(
    selectExhibition
);