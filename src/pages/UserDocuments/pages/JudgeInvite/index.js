import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import Loading from "../../../../components/Loading";
import { Request, getHeaders } from "../../../../utils/request";
import Card from "../../../../components/Card";
import formatDate from "../../../../utils/formatDate";
import Button from "../../../../components/Button";
import Modal from "../../../../components/Modal";
import {blockContent} from "../../../../utils/blockContent";
import "./index.scss";

const JudgeInvite = ({ alias, userType }) => {
    const [loading, setLoading] = useState(true);
    const [mainInfo, setMainInfo] = useState(null);
    const [comment, setComment] = useState('');
    const [inviteReject, setInviteReject] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [needRequest, setNeedRequest] = useState(true)

    const location = useLocation();
    const id = location.search.replace('?exhibitionId=', '');

    const changeInviteStatus = async (status) => {
            await Request({
                url: `/api/exhibitions/invite/change_judge_status`,
                headers: getHeaders(),
                method: 'PUT',
                data: JSON.stringify({
                        invite_id : mainInfo.invited_judges[0].invite_id,
                        judge_invite_status: status,
                        judge_invite_comment : comment,
                    }
                )
            },data =>  status === 2 ? setNeedRequest(true) : window.location.href = `/user/${alias}/documents/exhibitions/invite/registry`
        , error => console.log(error))

    };

    const closeModal = () => {
        setShowModal(false);
        blockContent(false);
    };

    useEffect(() => {
        needRequest &&(async () => await Request({
            url: `/api/exhibitions/invite?exhibitionId=${id}`,
            headers: getHeaders(),
        }, data => {
            setMainInfo(data);
            setNeedRequest(false);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, [needRequest]);

    return loading ?
        <Loading /> :
        <Card className="exhibitions-invite">
            <div className="user-documents-status__head">
                <Link className="btn-backward" to={`/user/${alias}/documents/exhibitions/invite/registry`}>Личный кабинет</Link>
                &nbsp;/&nbsp;
                Авторизация на участие в мероприятии
            </div>
            <div className="exhibitions-invite__main-info">
                <p>Клуб:
                    <Link to={`/club/${mainInfo.club_alias}`}>{mainInfo.club_name}</Link>
                </p>
                <p>Мероприятие:
                    <Link to={`/exhibitions/${mainInfo.exhibition_id}`}>{mainInfo.exhibition_name}</Link>
                </p>
                <p>Город проведения выставки:
                    <span>{mainInfo.exhibition_city}</span>
                </p>
                <p>Дата начала:
                    <span>{formatDate(mainInfo.exhibition_date_start)}</span>
                </p>
                <p>Дата окончания:
                    <span>{formatDate(mainInfo.exhibition_date_end)}</span>
                </p>
                <p>
                    <span>НКП:
                        <Link to={`/exhibitions/${mainInfo.nbc_alias}`}>{mainInfo.nbc_name}</Link>
                    </span>
                    {mainInfo.invited_judges[0].nbc_invite_status === 2 ?
                        <span className="_green">Ваше участие согласовано</span> :
                        <span className="_red">В авторизации отказано</span>
                    }
                </p>
            </div>
            {mainInfo.invited_judges[0].nbc_invite_status === 3 &&
                <p>
                    Причина <span>{!!mainInfo.invited_judges[0].nbc_invite_status_name ? mainInfo.invited_judges[0].nbc_invite_comment : 'не указана'}</span>
                </p>
            }
            {(mainInfo.invited_judges[0].judge_invite_status === 4 || mainInfo.invited_judges[0].judge_invite_status === 5) &&
                <div>
                    <p>Вы отозвали свое согласие на участие в данном мероприятии. {mainInfo.invited_judges[0].judge_invite_status === 4 ? 'Клуб уведомлен о вашем отказе.' : 'Клуб подтвердил ваш отказ.'}</p>
                    <p>Причина <span>{!!mainInfo.invited_judges[0].judge_invite_comment ? mainInfo.invited_judges[0].judge_invite_comment : 'не указана'}</span></p>
                </div>
            }
            <div className="exhibitions-invite__buttons">
                {mainInfo.invited_judges[0].nbc_invite_status === 2 && (
                    mainInfo.invited_judges[0].judge_invite_status === 1 ?
                        <div>
                            {mainInfo.invited_judges[0].judge_invite_status === 1 && <Button primary={true} onClick={() => changeInviteStatus(2)}>Принять</Button>}
                            <Button onClick={() => changeInviteStatus(3)}>Отклонить</Button>
                        </div> : (mainInfo.invited_judges[0].judge_invite_status === 2 &&
                        <div className='exhibitions-invite__buttons _reject'>
                            <p>Вы приняли приглашение на судейство в данном мероприятии.</p>
                            <Button primary={true}
                                    onClick={() => setInviteReject(true)}
                                    disabled={!!inviteReject}>
                                Отказаться от судейства
                            </Button>
                        </div>
                        )
                    )
                }
            </div>
            {!!inviteReject &&
                <div>
                    <p>Укажите причину отказа</p>
                    <textarea type="text" onChange={e => setComment(e.target.value)}/>
                    {!comment && <p className="_red">*обязательно к заполнению</p>}
                    <Button primary={true}
                            onClick={() => setShowModal(true)}
                            disabled={!comment}>
                        Отправить
                    </Button>
                </div>
            }
            {!!showModal &&
                <Modal
                    className="exhibitions-invite__modal"
                    showModal={showModal}
                    handleClose={closeModal}
                    handleX={closeModal}
                    headerName="Информация"
                >
                    <p>Вы отказались от судейства по причине:</p>
                    <p >"{comment}"</p>
                    <p>Клуб уведомлен о вашем решении</p>
                    <Button primary={true} onClick={() => changeInviteStatus(3)}>Ок</Button>
                </Modal>
            }
        </Card>
};

export default React.memo(JudgeInvite);