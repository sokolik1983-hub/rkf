import React from 'react';
import AdditionalDocumentUpload from './AdditionalDocumentUpload';

import './styles.scss';

const AdditionalDocuments = ({documents, formRenderProps, handleError, getDocuments }) => {

    return <div className="additional-documents">
        {
             <div className="application-form__row">
                <AdditionalDocumentUpload
                    documents={documents}
                    formRenderProps={formRenderProps}
                    handleError={handleError}
                    getDocuments={getDocuments}
                />
            </div>
        }
    </div>
}
export default React.memo(AdditionalDocuments);