import React, { useEffect, useState } from "react";
import {Link, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Loading from "../../../../../components/Loading";
import { Request, getHeaders } from "../../../../../utils/request";
import Card from "../../../../../components/Card";
import formatDate from "../../../../../utils/formatDate";
import {allbreedJudgeIcon, judgeIcon} from "../../../../../components/Layouts/UserLayout/config";
import Button from "../../../../../components/Button";
import "./index.scss";

const ExhibitionsInviteClub = ({ alias, userType }) => {
    const [loading, setLoading] = useState(true);
    const [mainInfo, setMainInfo] = useState(null);
    const [judgeList, setJudgeList] = useState([]);
    const [needRequest, setNeedRequest] = useState(true);

    const location = useLocation();
    const id = location.search.replace('?exhibitionId=', '');
    const clubAlias = useSelector(state => state.authentication.user_info.alias);

    const inviteJudges = async (judge_item) => await Request({
                url: `/api/exhibitions/invite/invite_judges`,
                method: 'PUT',
                data: JSON.stringify({
                    exhibition_id: mainInfo.exhibition_id,
                    judge_ids: [judge_item.judge_id],
                })
            }, data => setNeedRequest(true),
            error => console.log(error, 'ошибка')
        );

    const confirmReject = async (judge_item) => await Request({
            url: `/api/exhibitions/invite/confirm_reject`,
            method: 'PUT',
            data: JSON.stringify({
                invite_id: judge_item.invite_id,
                judge_id: judge_item.judge_id,
                judge_invite_status: 3,
            })
        }, data => setNeedRequest(true),
        error => console.log(error, 'ошибка')
    );

    const inviteNbc = async (judge_item) => await Request({
            url: `/api/exhibitions/invite/repeat_autorize_request`,
            method: 'PUT',
            data: JSON.stringify({
                judge_id: judge_item.judge_id,
                invite_id: judge_item.invite_id,
            })
        }, data => setNeedRequest(true),
        error => console.log(error, 'ошибка')
    );

    useEffect( () => {
        needRequest && (async () => await Request({
            url: `/api/exhibitions/invite?exhibitionId=${id}`,
            headers: getHeaders(),
        }, data => {
            setMainInfo(data);
            setJudgeList(data.invited_judges);
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
                    <Link className="btn-backward"
                          to={`/club/${clubAlias}/documents/exhibitions/invite/registry`}>
                        Личный кабинет
                    </Link>
                    &nbsp;/&nbsp;
                    Приглашение на участие в мероприятии
                </div>
                <div className="exhibitions-invite__main-info">
                    <p>Клуб:&nbsp;
                        <Link to={`/club/${mainInfo.club_alias}`}>{mainInfo.club_name}</Link>
                    </p>
                    <p>Мероприятие:&nbsp;
                        <Link to={`/exhibitions/${mainInfo.exhibition_id}`}>{mainInfo.exhibition_name}</Link>
                    </p>
                    <p>Город проведения выставки:&nbsp;
                        <span>{mainInfo.exhibition_city}</span>
                    </p>
                    <p>Дата начала:&nbsp;
                        <span>{formatDate(mainInfo.exhibition_date_start)}</span>
                    </p>
                    <p>Дата окончания:&nbsp;
                        <span>{formatDate(mainInfo.exhibition_date_end)}</span>
                    </p>
                </div>
                <div className="exhibitions-invite__judges-wrap">
                    <span>Список судей/специалистов</span>
                    <ul>
                        {judgeList.map(judge_item =>
                            <li className="exhibition-page__judge-item judge-item" key={id}>
                                <div className="judge-item__wrap">
                                    <div className="judge-item__name-wrap">
                                        {judge_item.judge_alias ?
                                            <Link
                                                className="judge-item__name-rus"
                                                to={`/user/${judge_item.judge_alias}`}
                                            >
                                                <p>{!!judge_item.judge_last_name && `${judge_item.judge_last_name} `}</p>
                                                <p>{!!judge_item.judge_name && `${judge_item.judge_name} `}
                                                    {!!judge_item.judge_second_name && `${judge_item.judge_second_name}`}
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
                                                    {!!judge_item.judge_second_name && `${judge_item.judge_second_name}`}
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
                                            Город:&nbsp;
                                            <span>{judge_item.city}</span>
                                        </p>
                                        <p>
                                            Телефон:&nbsp;
                                            <span>{judge_item.phone_number}</span>
                                        </p>
                                        <p>
                                            E-mail:&nbsp;
                                            <span>{judge_item.email}</span>
                                        </p>
                                    </div>
                                    <div className="judge-item__agreement">
                                        {judge_item.nbc_invite_status === 2 ?
                                            <p className="judge-item__agreement _agree">Получено согласование от НКП</p> :
                                            (judge_item.nbc_invite_status === 3 || judge_item.nbc_invite_status === 1) &&
                                            (!!judge_item.nbc_invite_comment ?
                                                <p className="judge-item__agreement _disagree">Получен отказ от НКП, причина:
                                                    <span>{judge_item.nbc_invite_comment}</span>
                                                </p> :
                                                    <p className="judge-item__agreement _disagree">
                                                        Запрос в НКП отправлен
                                                    </p>
                                            )
                                        }
                                    </div>
                                    <div className="judge-item__invite">
                                        {judge_item.nbc_invite_status === 2 ?
                                            ((judge_item.judge_invite_status === 1 && !judge_item.is_invited_by_club) ?
                                                    <Button primary={true}
                                                            onClick={() => inviteJudges(judge_item)}>
                                                        Отправить приглашение судье
                                                    </Button> :
                                                    (judge_item.judge_invite_status === 1 && judge_item.is_invited_by_club) ?
                                                    'Приглашение судье отправлено' :
                                                    judge_item.judge_invite_status === 2 ?
                                                        <p className="_green">Приглашение принято</p> :
                                                        judge_item.judge_invite_status === 3 ?
                                                            <div>
                                                                <p className="_red">Приглашение отклонено</p>
                                                                {!!judge_item.judge_invite_comment &&
                                                                    <p>Причина:
                                                                        <span>{judge_item.judge_invite_comment || 'Не указана'}</span>
                                                                    </p>
                                                                }
                                                                <Button primary={true} onClick={() => inviteJudges(judge_item)}>Пригласить повторно</Button>
                                                            </div> :
                                                            judge_item.judge_invite_status === 4 ?
                                                                <div>
                                                                    <p>
                                                                        Судья отозвал согласие на свое участие, причина:
                                                                        <span>
                                                                            {judge_item.judge_invite_comment || 'Не указана'}
                                                                        </span>
                                                                    </p>
                                                                    <Button primary={true} onClick={() => confirmReject(judge_item)}>
                                                                        Подтвердить
                                                                    </Button>
                                                                </div> :
                                                                (judge_item.judge_invite_status === 5 &&
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
                                                                        <Button primary={true} onClick={() =>inviteJudges(judge_item)}>Пригласить повторно</Button>
                                                                    </div>
                                                                )
                                            ) :
                                            (judge_item.nbc_invite_status === 3 ?
                                                <Button primary={true} onClick={() => inviteNbc(judge_item)}>
                                                    Пригласить повторно
                                                </Button> :
                                                    ((judge_item.nbc_invite_status === 1 && !!judge_item.nbc_invite_comment) &&
                                                        <p>
                                                            Запрос отправлен повторно
                                                        </p>
                                                    )
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