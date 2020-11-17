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

    console.log(docId);

    return (
        <>
            {!!docId &&
                <button
                    className="btn nomargin"
                    type="button"
                    onClick={() => {
                        setShowModal(true);
                        getDocument();
                    }}
                >Посмотреть</button>
            }
            <Modal className="document-link__modal" showModal={showModal} handleClose={() => setShowModal(false)}>
                {url ?
                    <embed src={url} className="document-link__embed"/> :
                    <Loading/>
                }
            </Modal>
        </>
    )
};

export default React.memo(DocumentLink);