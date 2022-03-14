import React, { useState } from 'react';
import Loading from '../../../../components/Loading';
import Modal from '../../../../components/Modal';
import { getHeaders } from 'utils/request';
import { SvgIcon } from '@progress/kendo-react-common';
import { trash } from '@progress/kendo-svg-icons';
import './index.scss';


const DocumentLinksArray = ({ documents, editable, onRemove }) => {
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

    return (
        <div className="DocumentLinksArray">
            {!!documents?.length &&
                documents.map(d => {
                    return <div className="DocumentLinksArray__item" key={d.id}>
                        <button
                            className="btn nomargin"
                            type="button"
                            onClick={() => handleClick(d.id)}
                        >Посмотреть
                        </button>
                        {editable && !d.accept && <button
                            className="DocumentLinksArray__delete-btn"
                            type="button"
                            onClick={() => onRemove(d.id)}
                        >
                            <SvgIcon icon={trash} size="default" />
                        </button>}
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