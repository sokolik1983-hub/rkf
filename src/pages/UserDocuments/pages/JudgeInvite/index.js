import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import Loading from "../../../../components/Loading";
import { Request, getHeaders } from "../../../../utils/request";
import Card from "../../../../components/Card";
import formatDate from "../../../../utils/formatDate";
import {useSelector} from "react-redux";
import Button from "../../../../components/Button";
import "./index.scss";

const JudgeInvite = ({ alias, userType }) => {
    const [loading, setLoading] = useState(true);
    const [mainInfo, setMainInfo] = useState(null);
    const [comment, setComment] = useState('');
    const [inviteReject, setInviteReject] = useState(false);
    const location = useLocation();
    const id = location.search.replace('?exhibitionId=', '');
    const profileId = useSelector(state => state.authentication.profile_id);

    const changeInviteStatus = async (x) => {
        if (x === 2) {
            await Request({
                url: `/api/exhibitions/invite/change_judge_status`,
                headers: getHeaders(),
                method: 'PUT',
                data: JSON.stringify({
                        invite_id : mainInfo.invited_judges[0].invite_id,
                        judge_invite_status: x,
                        judge_invite_comment : comment,
                    }
                )
            },data => window.location.reload()
        , error => console.log(error))
        }
    }

    useEffect(() => {
        (() => Request({
            url: `/api/exhibitions/invite?exhibitionId=${id}`,
            headers: getHeaders(),
        }, data => {
            console.log('data', data, 'id', profileId, alias, data.nbc_alias);
            setMainInfo(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    console.log(mainInfo)

    return loading ?
        <Loading /> :
        <Card className="exhibitions-invite">
            кнопка ЛК, "Авторизация на участие в мероприятии"
            <div className="user-documents-status__head">
                <Link className="btn-backward" to={`/user/${alias}/documents/exhibitions/invite/registry`}>Личный кабинет</Link>
                &nbsp;/&nbsp;
                Авторизация на участие в мероприятии
            </div>
            {/*инфа о клубе, выставке*/}
            <div className="exhibitions-invite__main-info">
                <p>Клуб: <a href={`/club/${mainInfo.club_alias}`}>{mainInfo.club_name}</a></p>
                <p>Мероприятие: <a href={`/exhibitions/${mainInfo.exhibition_id}`}>{mainInfo.exhibition_name}</a></p>
                <p>Город проведения выставки: <span>{mainInfo.exhibition_city}</span></p>
                <p>Дата начала: <span>{formatDate(mainInfo.exhibition_date_start)}</span></p>
                <p>Дата окончания: <span>{formatDate(mainInfo.exhibition_date_end)}</span></p>
                <p>НКП: <a href={`/exhibitions/${mainInfo.nbc_alias}`}>{mainInfo.nbc_name}</a> {mainInfo.invited_judges[0].nbc_invite_status === 2 ? <span className="green">Ваше участие согласовано</span> : <span className="red">В авторизации отказано</span>}</p>
            </div>
            {/*причина, если отказ*/}
            {mainInfo.invited_judges[0].nbc_invite_status === 3 &&
                <div>
                    Причина <span>{!!mainInfo.invited_judges[0].nbc_invite_status_name ? mainInfo.invited_judges[0].nbc_invite_comment : 'не указана'}</span>
                </div>
            }
            <div className="exhibitions-invite__buttons">
                {mainInfo.invited_judges[0].nbc_invite_status == 2 && (
                    mainInfo.invited_judges[0].judge_invite_status == 1 ?
                        <div>
                            {mainInfo.invited_judges[0].judge_invite_status === 1 && <Button primary={true} onClick={() => changeInviteStatus(2)}>Принять</Button>}
                            <Button onClick={() => changeInviteStatus(3)}>Отклонить</Button>
                        </div> : (mainInfo.invited_judges[0].nbc_invite_status == 2 &&
                    <div>
                        <p>Вы приняли приглашение на судейство в данном мероприятии</p>
                        <Button primary={true} onClick={() => setInviteReject(true)}>Отказаться от судейства</Button>
                    </div>)
                    )
                }
            </div>
            {!!inviteReject &&
                <div>
                    <p></p>
                    <input type="text"/>
                    <p></p>
                </div>
            }

        </Card>
};

export default React.memo(JudgeInvite);