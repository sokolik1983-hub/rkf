import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectListItem,
    selectExhibitionDocumentsList,
} from './selectors'

import {
    getExhibitionDocuments,
    addExhibitionDocumentsSuccess
} from './actions'


export const connectListItem = connect(selectListItem);

export const connectExhibitionDocumentsForm = connect(
    selectExhibitionDocumentsList,
    dispatch => bindActionCreators(
        {
            addExhibitionDocumentsSuccess,
        }, dispatch)
);

export const connectExhibitionDocumentsList = connect(
    selectExhibitionDocumentsList,
    dispatch => bindActionCreators(
        {
            getExhibitionDocuments,
        }, dispatch)
);
