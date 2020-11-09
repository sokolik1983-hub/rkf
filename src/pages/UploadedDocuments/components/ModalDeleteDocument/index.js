import React, { useState } from "react";
import { Button } from "@progress/kendo-react-buttons";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import { Request } from "../../../../utils/request";
import "./index.scss";


const ModalDeleteDocument = ({ handleSuccess, handleError, getDocuments, documentId, closeModal }) => {
    const [loading, setLoading] = useState(false);

    const deleteCategory = async () => {
        setLoading(true);
        await Request({
            url: `/api/document/publicdocument?id=${documentId}`,
            method: 'DELETE'
        }, () => {
            setLoading(false);
            closeModal();
            handleSuccess('Документ удалён!');
            getDocuments();
        }, error => {
            setLoading(false);
            closeModal();
            handleError(error);
        });
    };

    return (
        <Modal
            className="delete-document-modal"
            showModal={true}
            handleClose={closeModal}
        >
            <div className="delete-document-modal__content">
                <h3 className="delete-document-modal__title">Удаление документа</h3>
                {loading ?
                    <Loading centered={false} /> :
                    <>
                        <p className="delete-document-modal__describe">
                            Вы действительно хотите удалить документ?
                            </p>
                        <div className="k-form-buttons">
                            <button
                                className="btn btn-light"
                                type="button"
                                onClick={closeModal}
                            >
                                Отменить
                                </button>
                            <Button
                                className="btn btn-danger"
                                type="button"
                                onClick={deleteCategory}
                            >
                                Удалить
                                </Button>
                        </div>
                    </>
                }
            </div>
        </Modal>
    )
};

export default React.memo(ModalDeleteDocument);