import React, { useState } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import Loading from "components/Loading";
import "./index.scss";

const DocLink = ({ docId, label, showLabel, profileType, download }) => {
    const headers = { 'Authorization': `Bearer ${localStorage.getItem("apikey")}` };
    const [showModal, setShowModal] = useState(false);
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

    return <>
        <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
            {url ? <>{download && <a className="modal-download" target="_blank" href={url}>Скачать</a>}<embed src={url}/></> : <Loading/>}
        </Modal>
        {!!docId && <div>
            <label>{showLabel ? label : "\u00a0"}</label>
            <Button className="btn nomargin" onClick={e => {setShowModal(true); get();}}>Посмотреть</Button>
        </div>}
    </>;
}

export default DocLink;