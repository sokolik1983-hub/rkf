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
            data.invited_judges.forEach(judge => setJudgeList([...judgeList, judge]))
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    return loading ?
        <Loading /> :
            <Card className="exhibitions-invite">
                {/*кнопка ЛК, "Авторизация на участие в мероприятии"*/}
                <div className="user-documents-status__head">
                    <Link className="btn-backward" to={`/club/${clubAlias}/documents/exhibitions/invite/registry`}>Личный кабинет</Link>
                    &nbsp;/&nbsp;
                    Приглашение на участие в мероприятии
                </div>

                <div className="exhibitions-invite__main-info">
                    <span>Клуб: <a href={`/club/${mainInfo.club_alias}`}>{mainInfo.club_name}</a></span>
                    <span>Мероприятие: <a href={`/exhibitions/${mainInfo.exhibition_id}`}>{mainInfo.exhibition_name}</a></span>
                    <span>Город проведения выставки: {mainInfo.exhibition_city}</span>
                    <span>Дата начала: {formatDate(mainInfo.exhibition_date_start)}</span>
                    <span>Дата окончания: {formatDate(mainInfo.exhibition_date_end)}</span>
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
                                        <span>
                                            Город:
                                            <p>{judge_item.city}</p>
                                        </span>
                                        <span>
                                            Телефон:
                                            <p>{judge_item.phone_number}</p>
                                        </span>
                                        <span>
                                            E-mail:
                                            <p>{judge_item.email}</p>
                                        </span>
                                    </div>
                                    <div className="judge-item__agreement">
                                        {judge_item.nbc_invite_status === 2 ?
                                            <span>Получено согласование от НКП</span> :
                                            judge_item.nbc_invite_status === 3 &&
                                            <span>Получен отказ от НКП, причина: {judge_item.nbc_invite_comment}</span>
                                        }
                                    </div>
                                    <div className="judge-item__invite">
                                        {/*если не отправлено приглашение, то "Отправить приглашение судье"*/}
                                        {/*если приглашение судье отправлено, то "приглашение судье отправлено"    */}
                                        {/*если приглашение принято, то "приглашение принято"    */}
                                        {/*если приглашение отклонено, то "приглашение отклонено", "причина"(по наличию), "Пригласить повторно"    */}
                                        {/*если "Судья отозвал согласие на свое участие, причина:" то "причина" (по наличию), "Подтвердить" либо "Участие судьи отменено", кнопка "Подтвердить" засерена, "Участие судьи отменено"*/}
                                        {/*если "получен отказ от НКП" в соседнем поле, то тут ничего*/}

                                        {judge_item.nbc_invite_status === 2 &&
                                            ((judge_item.judge_invite_status === 1 && judge_item.is_invited_by_club) ?
                                                <Button>Отправить приглашение судье</Button> :
                                                (judge_item.judge_invite_status === 1 && !judge_item.is_invited_by_club) ?
                                                    'Приглашение судье отправлено' :
                                                    judge_item.judge_invite_status === 2 ?
                                                        'Приглашение принято' :
                                                        judge_item.judge_invite_status === 3 ?
                                                            <div>
                                                                <p>Приглашение отклонено</p>
                                                                {!!judge_item.judge_invite_comment &&
                                                                    <p>Причина:
                                                                        {judge_item.judge_invite_comment || 'Не указана'}
                                                                    </p>
                                                                }
                                                                <Button>Пригласить повторно</Button>
                                                            </div> :
                                                            judge_item.judge_invite_status === 4 ?
                                                                <div>
                                                                    <p>
                                                                        Судья отозвал согласие на свое участие, причина:
                                                                        <span>
                                                                            {judge_item.judge_invite_comment || 'Не указана'}
                                                                        </span>
                                                                    </p>
                                                                    {/*<Button primary={true} onClick={ async () => await Request({
                                                                        url: '/api/exhibitions/invite/confirm_reject',
                                                                        method: 'PUT',
                                                                        data: JSON.stringify({
                                                                            invite_id: judge_item.invite_id,
                                                                            judge_id: judge_item.id,
                                                                            judge_invite_status: 3,
                                                                        })
                                                                    }, data => {
                                                                        setVideos(data);
                                                                    }, error => handleError(error));

                                                                    }>
                                                                        Подтвердить
                                                                    </Button>*/}
                                                                    {/*<span>*/}
                                                                    {/*    Участие судьи отменено*/}
                                                                    {/*</span>*/}
                                                                {/*при нажатии на кнопку кнопка дизеблится, под ней появляется надпись "участие судьи отменено". при следующем запросе с бэка меняется статус заявки => кейс меняется    */}
                                                                </div> :
                                                                judge_item.judge_invite_status === 5 &&
                                                                <div>
                                                                    <p>
                                                                        Судья отозвал согласие на свое участие, причина:
                                                                    </p>
                                                                    <p>
                                                                        {judge_item.judge_invite_comment || 'Не указана'}
                                                                    </p>
                                                                    <p>
                                                                        Участе судьи отменено
                                                                    </p>
                                                                    <Button>
                                                                        Пригласить повторно
                                                                    </Button>
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