import React, { useState, useEffect } from "react";

import "./index.scss";

const up = s => s[0] && s[0].toUpperCase() + s.slice(1);

const DocLink = ({ docId, label, showLabel, distinction }) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const [url, setUrl] = useState('');

    const getUrl = () => {
        if (isNaN(docId) || !docId)
            return;
        setUrl('');
        fetch(`/api/requests/${distinction}_request/Nursery${up(distinction)}Document?id=` + docId, {headers})
        .then(res => res.blob())
        .then(data => URL.createObjectURL(data))
        .then(url => setUrl(url));
    }

    useEffect(() => {
        if (docId) {
            getUrl()
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
