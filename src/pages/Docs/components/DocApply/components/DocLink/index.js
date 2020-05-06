import React, { useState, useEffect } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import Loading from "components/Loading";
import { apiPedigreeDocumentEndpoint, apiLitterDocumentEndpoint } from "../../config.js";
import "./index.scss";

const DocLink = ({ docId, label, showLabel, distinction }) => {
    const apiEndpoint = distinction === "pedigree" ? apiPedigreeDocumentEndpoint : apiLitterDocumentEndpoint;
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');
    const get = () => {
        if (isNaN(docId) || !docId)
            return;
        fetch('/api/requests/pedigree_request/PedigreeDocument' + '?id=' + docId, {headers})
        .then(res => res.blob())
        .then(data => URL.createObjectURL(data))
        .then(url => setUrl(url));
    }

    return <>
        <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
            {url ? <embed src={url}/> : <Loading/>}
        </Modal>
        {!!docId && <div className="FormInput">
            <label>{showLabel ? label : "\u00a0"}</label>
            <Button onClick={e => {setShowModal(true); get();}}>Посмотреть</Button>
        </div>}
    </>;
}

export default DocLink;
