import React, { useState, useEffect } from "react";
import Button from "components/Button";
import Modal from "components/Modal";
import "./index.scss";

const apiEndpoint = '/api/clubs/requests/PedigreeRequest/document';

const DocLink = ({docId}) => {
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');
    useEffect(() => {
        if (isNaN(docId))
            return;
        fetch(apiEndpoint + '?id=' + docId)
        .then(res => res.blob())
        .then(data => URL.createObjectURL(data))
        .then(url => setUrl(url));
    },[]);

    return <>
        <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
            <embed src={url}/>
        </Modal>
        {docId && <Button onClick={e => setShowModal(true)}>Посмотреть</Button>}
    </>;
}

export default DocLink;
