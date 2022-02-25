import React, { useEffect, useState } from "react";
import AdditionalDocumentUpload from "./AdditionalDocumentUpload";

import "./styles.scss";


const AdditionalDocuments = ({ id, documents, formRenderProps, setDisableSubmit, handleError, editable, getDocuments }) => {

    return <div style={{ marginTop: '20px' }}>
        {
            editable && <div className="application-form__row">
                <AdditionalDocumentUpload
                    documents={documents}
                    setDisableSubmit={setDisableSubmit}
                    formRenderProps={formRenderProps}
                    handleError={handleError}
                    getDocuments={getDocuments}
                />
            </div>
        }
    </div>
}
export default React.memo(AdditionalDocuments);