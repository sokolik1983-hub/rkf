import React, { useState, useEffect } from "react";

import "./index.scss";

const DocLink = ({ docId, label, showLabel, profileType, download }) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const [url, setUrl] = useState('');

    const get = () => {
        if (isNaN(docId) || !docId)
            return;
        setUrl('');
        fetch(`/api/requests/dog_health_check_request/${profileType === 'kennel' ? 'kennel' :''}doghealthcheckdocument?id=` + docId, {headers})
        .then(res => res.blob())
        .then(data => URL.createObjectURL(data))
        .then(url => setUrl(url));
    }

    useEffect(() => {
        if (docId) {
            get()
        }
    }, [docId]);


    return <>
        {!!docId && <div>
            <label>{showLabel ? label : "\u00a0"}</label>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn__look btn nomargin" >Посмотреть</a>
        </div>}
    </>;
}

export default DocLink;
