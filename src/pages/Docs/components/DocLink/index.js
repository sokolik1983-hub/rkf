import React, { useState, useEffect } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import { apiPedigreeDocumentEndpoint, apiLitterDocumentEndpoint } from "../../config.js";
import "./index.scss";

const DocLink = ({ docId, label, showLabel, distinction }) => {
    const apiEndpoint = distinction === "pedigree" ? apiPedigreeDocumentEndpoint : apiLitterDocumentEndpoint;
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');
    useEffect(() => {
        if (isNaN(docId) || !docId)
            return;
        fetch(apiEndpoint + '?id=' + docId, {headers})
        .then(res => res.blob())
        .then(data => URL.createObjectURL(data))
        .then(url => setUrl(url));
    },[]);

    return <>
        <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
            <embed src={url}/>
        </Modal>
        {docId && <div className="FormInput">
            <label>{showLabel ? label : "\u00a0"}</label>
            <Button onClick={e => setShowModal(true)}>Посмотреть</Button>
        </div>}
    </>;
}

export default DocLink;
