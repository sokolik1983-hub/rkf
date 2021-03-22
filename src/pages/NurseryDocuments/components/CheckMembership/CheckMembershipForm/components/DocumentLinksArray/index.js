import React, { useState } from "react";
import Loading from "../../../../../../../components/Loading";
import Modal from "../../../../../../../components/Modal";
import { getHeaders } from "utils/request";
import { SvgIcon } from "@progress/kendo-react-common";
import { file } from "@progress/kendo-svg-icons";
import "./index.scss";


const DocumentLinksArray = ({ documents }) => {
    const headers = getHeaders();
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState('');

    const getDocument = (docId) => {
        if (isNaN(docId) || !docId) return;

        fetch(`/api/requests/get_rkf_document/getrkfdocumentrequestdocument?id=` + docId, { headers })
            .then(res => res.blob())
            .then(data => URL.createObjectURL(data))
            .then(url => setUrl(url));
    };

    const handleClick = (id) => {
        setShowModal(true);
        getDocument(id);
    }

    const setDocumentName = (id) => {
        switch (id) {
            case 5:
                return 'Квитанция об оплате';
            case 27:
                return 'Другое';
            case 50:
                return 'Заявление о подтверждении членства';
            case 51:
                return 'Книга вязок и щенений';
            default:
                return 'Без названия';
        }

    };

    return (
        <div className="DocumentLinksArray">
            {!!documents?.length &&
                documents.map(d => {
                    return <div className="DocumentLinksArray__item" key={d.id}>
                        <div onClick={() => handleClick(d.document_id)}>
                            <SvgIcon icon={file} size="default" />
                            <div className="DocumentLinksArray__item-name">{setDocumentName(d.document_type_id)}</div>
                        </div>
                    </div>
                })
            }
            <Modal showModal={showModal} handleClose={() => { setShowModal(false); setUrl('') }}>
                {url ?
                    <embed src={url} className="DocumentLinksArray__embed" /> :
                    <Loading />
                }
            </Modal>
        </div >
    )
};

export default React.memo(DocumentLinksArray);