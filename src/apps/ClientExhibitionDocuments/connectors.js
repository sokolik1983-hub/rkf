import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectListDocument, selectExhibitionDocument } from './selectors';

import {
    getExhibitionDocumentsListSuccess,
    addExhibitionDocumentSuccess,
    updateExhibitionDocumentSuccess,
    deleteExhibitionDocumentSuccess
} from './actions';

export const connectExhibitionDocumentsList = connect(
    //Here
    selectListDocument,
    dispatch =>
        bindActionCreators(
            {
                getExhibitionDocumentsListSuccess
            },
            dispatch
        )
);

export const connectDocumentFrom = connect(
    null,
    dispatch =>
        bindActionCreators(
            {
                addExhibitionDocumentSuccess
            },
            dispatch
        )
);

export const connectExhibitionDocumentListItem = connect(
    selectExhibitionDocument,
    dispatch =>
        bindActionCreators(
            {
                updateExhibitionDocumentSuccess,
                deleteExhibitionDocumentSuccess
            },
            dispatch
        )
);
