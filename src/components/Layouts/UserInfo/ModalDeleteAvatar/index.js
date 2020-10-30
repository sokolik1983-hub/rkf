import React, {useState} from "react";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import Alert from "../../../../components/Alert";
import {Request} from "../../../../utils/request";
import "./index.scss";


const ModalDeleteAvatar = ({closeModal, updateInfo}) => {
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
            url: '/api/avatar',
            method: 'DELETE'
        }, () => {
            closeModal();
            updateInfo(true);
        }, error => {
            handleError(error);
        });

        setLoading(false);
    };

    return (
        <Modal className="delete-avatar-modal" showModal={true} handleClose={() => null} handleX={closeModal}>
            <div className="delete-avatar-modal__content">
                <h3 className="delete-avatar-modal__title">Удаление аватара</h3>
                {loading ?
                    <Loading centered={false}/> :
                    <>
                        <p className="delete-avatar-modal__describe">
                            Вы уверены, что хотите удалить <br/>
                            Ваш аватар?
                        </p>
                        <div className="k-form-buttons">
                            <button
                                className="btn btn-light"
                                type="button"
                                onClick={closeModal}
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