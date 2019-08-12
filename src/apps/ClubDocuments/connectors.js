import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectListDocument,
    selectClubId,
    selectClubDocument
} from './selectors'

import {
    getClubDocumentsListSuccess,
    addClubDocumentSuccess,
} from './actions'

export const connectListDocument = connect(
    selectListDocument,
    dispatch => bindActionCreators({
        getClubDocumentsListSuccess
    }, dispatch)
);

export const connectDocumentFrom = connect(
    selectClubId,
    dispatch => bindActionCreators({
        addClubDocumentSuccess
    }, dispatch)
);

export const connectClintClubDocument=connect(
    selectClubDocument,
)