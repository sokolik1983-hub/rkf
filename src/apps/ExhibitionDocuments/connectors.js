import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectExhibitionDocumentList,
    selectExhibitionDocument,
} from './selectors'

import {
    getExhibitionDocumentsListSuccess,
} from './actions'

export const connectExhibitionDocumentsList = connect(
    selectExhibitionDocumentList,
    dispatch => bindActionCreators({
        getExhibitionDocumentsListSuccess
    }, dispatch)
);

export const connectExhibitionDocument = connect(
    selectExhibitionDocument,
)