import React from "react";
import moment from "moment";

const PdfPageTemplate = () => {
    return (
        <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            {moment(new Date()).format(`DD.MM.YYYY`)}
        </div>
    );
};

export default PdfPageTemplate;