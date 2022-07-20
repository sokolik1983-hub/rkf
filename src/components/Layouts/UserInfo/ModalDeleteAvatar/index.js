import React, {memo, useState} from "react";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import Alert from "../../../../components/Alert";
import {Request} from "../../../../utils/request";
import {blockContent} from "../../../../utils/blockContent";
import {connectAuthUserInfo} from "../../../../pages/Login/connectors";
import "./index.scss";


const ModalDeleteAvatar = ({user_info, updateUserInfo, closeModal, pageBanner, owner}) => {
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

    const deleteAvatar = async () => {
        setLoading(true);

        await Request({
            url: pageBanner ? '/api/headerpicture' : owner ? '/api/nbcownerpicture' : '/api/avatar',
            method: 'DELETE'
        }, () => {
            if(!owner) {
                let userInfo = user_info;

                if(pageBanner) {
                    userInfo.headliner_link = '';
                } else {
                    userInfo.logo_link = '';
                }

                updateUserInfo(userInfo);
            }

            closeModal();
        }, error => {
            handleError(error);
        });

        setLoading(false);
    };

    const handleClose = () => {
        closeModal();
        blockContent();
    };

    return (
        <Modal
            className="delete-avatar-modal"
            showModal={true}
            handleClose={handleClose}
            handleX={handleClose}
            headerName={pageBanner ? 'Удаление заставки' : 'Удаление аватара'}
        >
            <div className="delete-avatar-modal__content">
                {loading ?
                    <Loading centered={false} /> :
                    <>
                        <p className="delete-avatar-modal__describe">
                            Вы уверены, что хотите удалить <br />
                            {pageBanner ? 'Вашу заставку?' : 'Ваш аватар?'}
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
                                onClick={deleteAvatar}
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

export default memo(connectAuthUserInfo(ModalDeleteAvatar));