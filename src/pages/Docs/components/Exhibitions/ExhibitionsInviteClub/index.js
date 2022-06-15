import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Loading from "../../../../../components/Loading";
import { Request, getHeaders } from "../../../../../utils/request";
import Card from "../../../../../components/Card";
import formatDate from "../../../../../utils/formatDate";
import {allbreedJudgeIcon, judgeIcon} from "../../../../../components/Layouts/UserLayout/config";
import "./index.scss";
import Button from "../../../../../components/Button";

const ExhibitionsInviteClub = ({ alias, userType }) => {
    const [loading, setLoading] = useState(true);
    const [mainInfo, setMainInfo] = useState(null);
    const [judgeList, setJudgeList] = useState([]);

    const location = useLocation();
    const id = location.search.replace('?exhibitionId=', '');
    const clubAlias = useSelector(state => state.authentication.user_info.alias)

    useEffect( () => {
        (async () => await Request({
            url: `/api/exhibitions/invite?exhibitionId=${id}`,
            headers: getHeaders(),
        }, data => {
            setMainInfo(data);
            setJudgeList(data.invited_judges)
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading /> :
            <Card className="exhibitions-invite">
                <div className="user-documents-status__head">
                    <Link className="btn-backward" to={`/club/${clubAlias}/documents/exhibitions/invite/registry`}>Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    Приглашение на участие в мероприятии
                </div>
                <div className="exhibitions-invite__main-info">
                    <p>Клуб: <a href={`/club/${mainInfo.club_alias}`}>{mainInfo.club_name}</a></p>
                    <p>Мероприятие: <a href={`/exhibitions/${mainInfo.exhibition_id}`}>{mainInfo.exhibition_name}</a></p>
                    <p>Город проведения выставки: <span>{mainInfo.exhibition_city}</span></p>
                    <p>Дата начала: <span>{formatDate(mainInfo.exhibition_date_start)}</span></p>
                    <p>Дата окончания: <span>{formatDate(mainInfo.exhibition_date_end)}</span></p>
                </div>
                <div className="exhibitions-invite__judges_list-wrap">
                    <span>Список судей/специалистов</span>
                    <ul>
                        {judgeList.map(judge_item =>
                            <li className="exhibition-page__judge-item judge-item" key={id}>
                                <div className="judge-item__wrap">
                                    <div className="judge-item__name">
                                        {judge_item.judge_alias ?
                                            <Link
                                                className="judge-item__name-rus"
                                                to={`/user/${judge_item.judge_alias}`}
                                            >
                                                <p>{!!judge_item.judge_last_name && `${judge_item.judge_last_name} `}</p>
                                                <p>{!!judge_item.judge_name && `${judge_item.judge_name} `}
                                                    {judge_item.judge_second_name}
                                                    {judge_item.judge_alias && judgeIcon}
                                                    {judge_item.is_all_breeder &&
                                                        allbreedJudgeIcon
                                                    }
                                                </p>
                                            </Link>
                                            :
                                            <p className="judge-item__name-rus">
                                                <span>{judge_item.judge_last_name && `${judge_item.judge_last_name} `}</span>
                                                <span>{judge_item.judge_name && `${judge_item.judge_name} `}
                                                    {judge_item.judge_second_name}
                                                    {judge_item.judge_alias && judgeIcon}
                                                    {judge_item.is_all_breeder &&
                                                        allbreedJudgeIcon
                                                    }
                                                </span>
                                            </p>
                                        }
                                        <p className="judge-item__name-eng">
                                            {judge_item.judge_en_full_name}
                                        </p>
                                        <p className="judge-item__cert-number">
                                            Лист судьи №{judge_item.judge_cert_number}
                                        </p>
                                    </div>
                                    <div className="judge-item__info">
                                        <p>
                                            Город:
                                            <span>{judge_item.city}</span>
                                        </p>
                                        <p>
                                            Телефон:
                                            <span>{judge_item.phone_number}</span>
                                        </p>
                                        <p>
                                            E-mail:
                                            <span>{judge_item.email}</span>
                                        </p>
                                    </div>
                                    <div className="judge-item__agreement">
                                        {judge_item.nbc_invite_status === 2 ?
                                            <p>Получено согласование от НКП</p> :
                                            judge_item.nbc_invite_status === 3 &&
                                            <p>Получен отказ от НКП, причина: <span>{!!judge_item.nbc_invite_comment ? judge_item.nbc_invite_comment : 'Не указано'}</span></p>
                                        }
                                    </div>
                                    <div className="judge-item__invite">
                                        {judge_item.nbc_invite_status === 2 &&
                                            ((judge_item.judge_invite_status === 1 && !judge_item.is_invited_by_club) ?
                                                <Button>Отправить приглашение судье</Button> :
                                                (judge_item.judge_invite_status === 1 && judge_item.is_invited_by_club) ?
                                                    'Приглашение судье отправлено' :
                                                    judge_item.judge_invite_status === 2 ?
                                                        <p className="green">Приглашение принято</p> :
                                                        judge_item.judge_invite_status === 3 ?
                                                            <div>
                                                                <p className="red">Приглашение отклонено</p>
                                                                {!!judge_item.judge_invite_comment &&
                                                                    <p>Причина:
                                                                        <span>{judge_item.judge_invite_comment || 'Не указана'}</span>
                                                                    </p>
                                                                }
                                                                <Button primary={true} onClick={ async () => await Request({
                                                                        url: `/api/exhibitions/invite/invite_judges`,
                                                                        method: 'PUT',
                                                                        data: JSON.stringify({
                                                                            exhibition_id: mainInfo.exhibition_id,
                                                                            judge_ids: [judge_item.judge_id],
                                                                        })
                                                                    }, data => window.location.reload(),
                                                                    error => console.log(error, 'ошибка')
                                                                )}>Пригласить повторно</Button>
                                                            </div> :
                                                            judge_item.judge_invite_status === 4 ?
                                                                <div style={{display: "block"}}>
                                                                    <p>
                                                                        Судья отозвал согласие на свое участие, причина:
                                                                        <span>
                                                                            {judge_item.judge_invite_comment || 'Не указана'}
                                                                        </span>
                                                                    </p>
                                                                    <Button primary={true} onClick={ async () => await Request({
                                                                        url: `/api/exhibitions/invite/confirm_reject`,
                                                                        method: 'PUT',
                                                                        data: JSON.stringify({
                                                                            invite_id: judge_item.invite_id,
                                                                            judge_id: judge_item.judge_id,
                                                                            judge_invite_status: 3,
                                                                        })
                                                                    }, data => window.location.reload(),
                                                                        error => console.log(error, 'ошибка')
                                                                    )}>
                                                                        Подтвердить
                                                                    </Button>
                                                                </div> :
                                                                (judge_item.judge_invite_status === 5 && judge_item.is_invited_by_club) &&
                                                                <div>
                                                                    <p>
                                                                        Судья отозвал согласие на свое участие, причина:
                                                                        <span>
                                                                            {judge_item.judge_invite_comment || 'Не указана'}
                                                                        </span>
                                                                    </p>
                                                                    <p>
                                                                        Участе судьи отменено
                                                                    </p>
                                                                    <Button primary={true} onClick={ async () => await Request({
                                                                            url: `/api/exhibitions/invite/invite_judges`,
                                                                            method: 'PUT',
                                                                            data: JSON.stringify({
                                                                                exhibition_id: mainInfo.exhibition_id,
                                                                                judge_ids: [judge_item.judge_id],
                                                                            })
                                                                        }, data => window.location.reload()
                                                                        , error => console.log(error, 'ошибка')
                                                                    )}>Пригласить повторно</Button>
                                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </li>)}
                    </ul>
                </div>
            </Card>
};

export default React.memo(ExhibitionsInviteClub);