import React, { useState } from "react";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import Alert from "../../../../components/Alert";
import { Request } from "../../../../utils/request";
import {blockContent} from "../../../../utils/blockContent";

import "./index.scss";


const ModalDeleteBanner = ({ closeModal, updateInfo }) => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const handleError = e => {
        if (e.response) {
            const errorText = e.response.data.errors ?
                Object.values(e.response.data.errors) :
                `${e.response.status} ${e.response.statusText}`;

            setAlert({
                title: `Ошибка!`,
                text: errorText,
                autoclose: 7.5,
                onOk: () => setAlert(null)
            });
        }
    };

    const deleteBanner = async () => {
        setLoading(true);

        await Request({
            url: '/api/headerpicture',
            method: 'DELETE'
        }, () => {
            closeModal();
            blockContent();
            updateInfo(true);
        }, error => {
            handleError(error);
        });

        setLoading(false);
    };

    const handleClose = () => {
        closeModal();
        blockContent();
    }

    return (
        <Modal className="delete-banner-modal" showModal={true} handleClose={handleClose} handleX={handleClose} headerName="Удаление баннера">
            <div className="delete-banner-modal__content">
                {loading ?
                    <Loading centered={false} /> :
                    <>
                        <p className="delete-banner-modal__describe">
                            Вы уверены, что хотите удалить <br />
                            Ваш баннер?
                        </p>
                        <div className="k-form-buttons">
                            <button
                                className="btn btn-light"
                                type="button"
                                onClick={handleClose}
                            >
                                Отменить
                            </button>
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={deleteBanner}
                            >
                                Удалить
                            </button>
                        </div>
                    </>
                }
            </div>
            {alert && <Alert {...alert} />}
        </Modal>
    )
};

export default React.memo(ModalDeleteBanner);