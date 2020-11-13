import React, { useState } from "react";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import {getHeaders} from "../../../../utils/request";
import "./index.scss";


const DocumentLink = ({docId}) => {
    const headers = getHeaders();
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');

    const getDocument = () => {
        if (isNaN(docId) || !docId) return;

        fetch(`/api/requests/dog_health_check_request/doghealthcheckdocument?id=` + docId, {headers})
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    };

    return (
        <>
            {!!docId &&
                <button
                    className="btn nomargin"
                    onClick={() => {
                        setShowModal(true);
                        getDocument();
                    }}
                >Посмотреть</button>
            }
            <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
                {url ?
                    <embed src={url}/> :
                    <Loading/>
                }
            </Modal>
        </>
    )
};

export default React.memo(DocumentLink);