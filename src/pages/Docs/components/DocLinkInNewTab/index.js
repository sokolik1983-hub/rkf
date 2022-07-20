import React, { useState, useEffect } from "react";
import Button from "components/Button";
import { apiPedigreeDocumentEndpoint, apiLitterDocumentEndpoint } from "../../config.js";

const DocLink = ({ docId, label, showLabel, distinction }) => {
    const apiEndpoint = distinction === "pedigree" ? apiPedigreeDocumentEndpoint : apiLitterDocumentEndpoint;
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (isNaN(docId) || !docId)
            return;
        fetch(apiEndpoint + '?id=' + docId, {headers})
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    },[]);

    return (
        <>
            {!!docId && <div className="FormInput">
                <label>{showLabel ? label : "\u00a0"}</label>
                <a className="form-file__link" href={url} target="_blank">Посмотреть</a>
            </div>}
        </>
    )
}

export default DocLink;
