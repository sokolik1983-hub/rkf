import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

    useEffect()

    return (
        <>
            {!!docId && <div className="FormInput">
                <label>{showLabel ? label : "\u00a0"}</label>
                <Link className="form-file__link" to={url}>Посмотреть</Link>
            </div>}
        </>
    )
}

export default DocLink;
