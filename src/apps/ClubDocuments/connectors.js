import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {
    selectListDocument,
    selectClubId,
    selectClubDocument,

} from './selectors'

import {
    getClubDocumentsListSuccess,
    addClubDocumentSuccess,
    updateClubDocumentSuccess,
    deleteClubDocumentSuccess,
} from './actions'

export const connectListDocument = connect(
    //Here
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

export const connectClientClubListItem = connect(
    selectClubDocument,
    dispatch => bindActionCreators({
        updateClubDocumentSuccess,
        deleteClubDocumentSuccess
    }, dispatch)
)