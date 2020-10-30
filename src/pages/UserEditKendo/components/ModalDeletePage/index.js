import React, {useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import Loading from "../../../../components/Loading";
import Modal from "../../../../components/Modal";
import Alert from "../../../../components/Alert";
import {Request} from "../../../../utils/request";
import {formatDateTime} from "../../../../utils/datetime";
import "./index.scss";


const ModalDeletePage = ({closeModal, updateInfo}) => {
    const [loading, setLoading] = useState(false);
    const [isAnswer, setIsAnswer] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [date, setDate] = useState('');
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

    const getDate = async () => {
        await Request({
            url: '/api/registration/date_deactivated'
        }, data => {
            setDate(data ? formatDateTime(data) : null);
        }, error => {
            handleError(error);
        });
    };

    const deletePage = async () => {
        setLoading(true);

        await Request({
            url: '/api/registration/delete_account',
            method: 'DELETE'
        }, () => {
           getDate().then(() => {
               setIsAnswer(false);
               setDeleteConfirm(true);
               setLoading(false);
           });
        }, error => {
            setLoading(false);
            handleError(error);
        });
    };

    const cancelDeletePage = async () => {
        setLoading(true);

        await Request({
            url: '/api/registration/cancel_deletion',
            method: 'POST'
        }, () => {
            setIsAnswer(false);
            setDeleteConfirm(false);
            setLoading(false);
        }, error => {
            setLoading(false);
            handleError(error);
        });
    };

    return (
        <Modal className="delete-page-modal" showModal={true} handleClose={() => null}>
            <div className="delete-page-modal__content">
                <h3 className="delete-page-modal__title">Удаление страницы</h3>
                {loading ?
                    <Loading centered={false}/> :
                    isAnswer ?
                        <>
                            <p className="delete-page-modal__describe">
                                Вы уверены, что хотите безвозвратно удалить <br/>
                                Вашу страницу на Цифровой Платформе <br/>
                                российского кинологического сообщества RKF.Online?
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
                                    onClick={deletePage}
                                >
                                    Удалить
                                </Button>
                            </div>
                        </> :
                        deleteConfirm ?
                            <>
                                <p className="delete-page-modal__describe">
                                    Ваша страница будет удалена <br/>
                                    <b>{date}</b>
                                </p>
                                <div className="k-form-buttons">
                                    <button
                                        className="btn btn-light"
                                        type="button"
                                        onClick={cancelDeletePage}
                                    >
                                        Отменить
                                    </button>
                                    <Button
                                        primary={true}
                                        type="button"
                                        onClick={() => {
                                            updateInfo();
                                            closeModal();
                                        }}
                                    >Закрыть</Button>
                                </div>
                            </> :
                            <>
                                <p className="delete-page-modal__describe">
                                    Ваша страница не будет удалена. <br/>
                                    Мы рады, что Вы остаетесь с нами!
                                </p>
                                <div className="k-form-buttons">
                                    <Button
                                        primary={true}
                                        type="button"
                                        onClick={() => {
                                            updateInfo();
                                            closeModal();
                                        }}
                                    >Закрыть</Button>
                                </div>
                            </>
                }
            </div>
            {alert && <Alert {...alert} />}
        </Modal>
    )
};

export default React.memo(ModalDeletePage);