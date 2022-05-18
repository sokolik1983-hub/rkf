import React from "react";
import NBCLayout from "../../components/Layouts/NBCLayout";
import Content from "./Content"

import "./styles.scss"

const NBCUploadedDocuments = (props) => {
    return (
        <NBCLayout layoutWithFilters {...props}>
            <Content />
        </NBCLayout>
    )
};

export default React.memo(NBCUploadedDocuments);