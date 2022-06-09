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
    const [judgeStat, setJudgeStat] = useState(null);
    const [judgeStatName, setJudgeStatName] = useState(null);
    const [inviteId, setInviteId] = useState(null);
    const [judgeId, setJudgeId] = useState(null);
    const [judgeComm, setJudgeComm] = useState(null);
    const location = useLocation();
    const id = location.search.replace('?exhibitionId=', '');
    const profileId = useSelector(state => state.authentication.profile_id);

    const changeInviteStatus = async (x) => {
        await Request({
            url: `/api/exhibitions/invite/change_judge_status`,
            method: 'PUT',
            data: JSON.stringify({
                invite_id : inviteId,
                judge_id: judgeId,
                judge_invite_status: x,
                judge_invite_comment : judgeComm,
            })
        })
    }

    useEffect(() => {
        (() => Request({
            url: `/api/exhibitions/invite?exhibitionId=${id}`,
            headers: getHeaders(),
        }, data => {
            console.log('data', data, 'id', profileId, alias, data.nbc_alias);
            setMainInfo(data);

            // for (let i = 0; i < data.invited_judges_groups?.length; i++) {
            //     for (let j = 0; j < data.invited_judges_groups[i].invited_judges.length; j++) {
            //         if (data.invited_judges_groups[i].invited_judges[j].judge_alias === alias) {
            //             setJudgeStat(data.invited_judges_groups[i].invited_judges[j].judge_invite_status) ;
            //             setJudgeStatName(data.invited_judges_groups[i].invited_judges[j].judge_invite_status_name) ;
            //             setInviteId(data.invited_judges_groups[i].invited_judges[j].invite_id) ;
            //             setJudgeId(data.invited_judges_groups[i].invited_judges[j].judge_id) ;
            //         } else {
            //             console.log("ошибочка");
            //         }
            //     }
            // }

            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    // Григорьевич Александр Малышевский
    //

    return loading ?
        <Loading /> :
        <Card className="exhibitions-invite">
            {/*кнопка ЛК, "Авторизация на участие в мероприятии"*/}
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
                <p>НКП: <a href={`/exhibitions/${mainInfo.nbc_alias}`}>{mainInfo.nbc_name}</a> {judgeStat === 2 ? 'Ваше участие согласовано' : 'В авторизации отказано'}</p>
            </div>
            {/*причина, если отказ*/}
            {judgeStat !== 2 &&
                <div>
                    Причина <span>{!!judgeStatName ? judgeStatName : 'не указана'}</span>
                </div>
            }
            {/*кнопка ОК, если отказ||Принять приглашение и отклонить приглашение, если согласовано*/}
            <div className="exhibitions-invite__buttons">
                {judgeStat !== 2 ? <Button primary={true} onClick={() => window.location.href = `/user/${alias}/documents/exhibitions/invite/registry`}>Ок</Button> :
                    <div>
                        <Button onClick={() => changeInviteStatus(2)}>Принять</Button>
                        <Button onClick={() => changeInviteStatus(3)}>Отклонить</Button>
                    </div>}
            </div>

        </Card>
};

export default React.memo(JudgeInvite);