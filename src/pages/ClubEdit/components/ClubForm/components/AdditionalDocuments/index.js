import React, { useEffect, useState } from "react";
import AdditionalDocumentUpload from "./AdditionalDocumentUpload";

import "./styles.scss";


const AdditionalDocuments = ({documents, formRenderProps, setDisableSubmit, handleError, getDocuments }) => {

    return <div style={{ marginTop: '20px' }}>
        {
             <div className="application-form__row">
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