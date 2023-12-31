import React, {useEffect, useState} from "react";
import {Button} from "@progress/kendo-react-buttons";
import Loading from "../../../../components/Loading";
import Alert from "../../../../components/Alert";
import ModalDeletePage from "../../components/ModalDeletePage";
import {Request} from "../../../../utils/request";
import {formatDateTime} from "../../../../utils/datetime";
import {blockContent} from "../../../../utils/blockContent";

import "./index.scss";


const DeletePage = ({
    judgeInfo
}) => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [alert, setAlert] = useState(null);
    const [date, setDate] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(true);

    useEffect(() => {
        (() => getDate())();
    }, []);

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
        setLoading(true);

        await Request({
            url: '/api/registration/date_deactivated'
        }, data => {
            setDate(data ? formatDateTime(data) : null);
            setLoading(false);
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
            setDeleteConfirm(false);
            setLoading(false);
        }, error => {
            setLoading(false);
            handleError(error);
        });
    };

    return (
        <div className="ue-delete-page k-form">
            <legend className="k-form-legend">Удаление страницы</legend>
            {loading ?
                <Loading centered={false} /> :
                !!judgeInfo.length ?
                    <div className="user-edit__delete">
                        <p>
                            Удаление Профиля Судьи недоступно
                        </p>
                        <button
                            className="button-delete__disable"
                            disabled="disabled"
                        >
                            Удалить
                        </button>
                    </div> :
                !date ?
                    <>
                        <p className="ue-delete-page__describe">
                            При нажатии на кнопку "Удалить" Ваша страница будет <br/>
                            безвозвратно удалена в течение 30 календарных дней. <br/>
                            Все размещенные Вами данные будут утеряны.
                        </p>
                        <p className="ue-delete-page__describe__mobile">
                            При нажатии на кнопку "Удалить"<br/>
                            Ваша страница будет безвозвратно удалена<br/>
                            в течение 30 календарных дней. <br/>
                            Все размещенные Вами данные будут утеряны.
                        </p>
                        <div className="k-form-buttons">
                            <Button className="btn btn-danger" type="button" onClick={() => setShowModal(true)}>
                                Удалить
                            </Button>
                        </div>
                    </> :
                    deleteConfirm ?
                        <>
                            <p className="ue-delete-page__describe">
                                Ваша страница будет удалена <br/>
                                <b>{date}</b>
                            </p>
                            <div className="k-form-buttons">
                                <Button primary={true} type="button" onClick={cancelDeletePage}>
                                    Отменить
                                </Button>
                            </div>
                        </> :
                        <>
                            <p className="ue-delete-page__describe">
                                Ваша страница не будет удалена. <br/>
                                Мы рады, что Вы остаетесь с нами!
                            </p>
                            <div className="k-form-buttons">
                                <Button primary={true} type="button" onClick={() => {
                                    setDeleteConfirm(true);
                                    getDate();
                                }}>
                                    OK
                                </Button>
                            </div>
                        </>
            }
            {showModal &&
                <ModalDeletePage
                    closeModal={() => {
                        setShowModal(false);
                        blockContent(false)}
                    }
                    updateInfo={getDate}
                />
            }
            {alert && <Alert {...alert} />}
        </div>
    )
};

export default React.memo(DeletePage);