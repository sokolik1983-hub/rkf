import React, { useState } from 'react';
import Loading from '../../../../components/Loading';
import Modal from '../../../../components/Modal';
import Alert from '../../../../components/Alert';
import { Request } from '../../../../utils/request';
import ls from 'local-storage';
import {blockContent} from '../../../../utils/blockContent';

import './index.scss';


const ModalDeleteAvatar = ({ closeModal, updateInfo, pageBanner, owner }) => {
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const currentLink = pageBanner ? '/api/headerpicture' : owner ? '/api/nbcownerpicture' : '/api/avatar';

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
                url: currentLink,
                method: 'DELETE'
            }, () => {
                closeModal();
                pageBanner && ls.set('user_info', { ...ls.get('user_info'), headliner_link: '' });
                !pageBanner && !owner && ls.set('user_info', { ...ls.get('user_info'), logo_link: '' });
                window.location.reload();
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
        <Modal
            className="delete-avatar-modal"
            showModal={true}
            handleClose={handleClose}
            handleX={handleClose}
            headerName={pageBanner ?
                "Удаление заставки" :
                "Удаление аватара"
        }>
            <div className="delete-avatar-modal__content">
                {loading ?
                    <Loading centered={false} /> :
                    <>

                            {
                                pageBanner
                                ?
                                    <p className="delete-avatar-modal__describe">
                                    Вы уверены, что хотите удалить <br />
                                Вашу заставку?
                                    </p>
                                :
                                    <p className="delete-avatar-modal__describe">
                                        Вы уверены, что хотите удалить <br />
                                        Ваш аватар?
                                    </p>
                            }

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

export default React.memo(ModalDeleteAvatar);