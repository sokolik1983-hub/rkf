import React, { useState } from "react";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import { getHeaders } from "utils/request";
import { SvgIcon } from "@progress/kendo-react-common";
import { filePdf, trash } from "@progress/kendo-svg-icons";
import LightTooltip from "components/LightTooltip";
import "./index.scss";


const DocumentLinksArray = ({ documents, editable }) => {
    const headers = getHeaders();
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');

    const getDocument = (docId) => {
        if (isNaN(docId) || !docId) return;

        fetch(`/api/requests/dog_health_check_request/doghealthcheckdocument?id=` + docId, { headers })
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    };

    const handleClick = (id) => {
        setShowModal(true);
        getDocument(id);
    }

    return (
        <div className="DocumentLinksArray">
            {!!documents.length &&
                documents.map((d, key) => {
                    return <div className="DocumentLinksArray__item" key={key}>
                        <div onClick={() => handleClick(d.id)}>
                            <SvgIcon icon={filePdf} size="default" />
                            <LightTooltip title={d.name} enterDelay={200} leaveDelay={200}>
                                <div className="DocumentLinksArray__item-name" >{d.name}</div>
                            </LightTooltip>
                        </div>
                        {editable && !d.accept && <button
                            className="DocumentLinksArray__delete-btn"
                            type="button"
                            onClick={() => { }}
                        >
                            <SvgIcon icon={trash} size="default" />
                        </button>}
                    </div>
                })
            }
            <Modal showModal={showModal} handleClose={() => setShowModal(false)}>
                {url ?
                    <embed src={url} className="DocumentLinksArray__embed" /> :
                    <Loading />
                }
            </Modal>
        </div >
    )
};

export default React.memo(DocumentLinksArray);