import React, { memo, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import JudgeCard from "./JudgeCard";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import formatDate from "../../utils/formatDate";
import { Request } from "../../utils/request";

import "./index.scss";


const NBCInvite = ({ alias }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [form, setForm] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [listJudges, setListJudges] = useState([])
    const [disableRadio, setDisableRadio] = useState([]);
    const [notification, setNotification] = useState(false);
    const [disableButton, setDisableButton] = useState(true);
    const location = useLocation();
    const id = location.search.replace('?exhibitionId=', '');

    useEffect(() => {
        (() => Request({
            url: `/api/exhibitions/invite?exhibitionId=${id}`,
        }, data => {
            setData(data);
            const arrOfJudges = [...data.invited_judges]
            setListJudges(arrOfJudges);
            setDisableRadio(data.invited_judges.map(elem => [elem.judge_id, elem.nbc_invite_status]))
            const newArray = arrOfJudges.map(item => ({
                invite_id: item.invite_id,
                judge_id: item.judge_id,
                nbc_invite_status: item.nbc_invite_status,
                nbc_invite_comment: item.nbc_invite_comment ? item.nbc_invite_comment : ''
            }));
            setForm(newArray);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        }))();
    }, []);

    useEffect(() => {
        setDisableButton(listJudges.map(item => item.nbc_invite_status === 1).some(elem => elem === true) ||
            disableRadio.map(item => item[1] > 1).every(elem => elem === true));
    }, [listJudges, disableRadio]);

    useEffect(() => {
        setNotification(listJudges.map(item =>
            item.nbc_invite_status === 3 && form
                .filter(elem => item.judge_id === elem.judge_id && elem.nbc_invite_comment?.length < 3))
            .some(key => key.length));
    }, [form]);

    const authAndReject = (judge_full_name, event, id) => {
        switch (+event.target.value) {
            case 2:
                setRejected(rejected.filter(item => item[1] !== id));
                setForm(form.map(item => item.judge_id === id ?
                    {...item, nbc_invite_status: 2, nbc_invite_comment: ''} :
                    {...item}));
                setListJudges(listJudges.map( item => item.judge_id === id ?
                    {...item, nbc_invite_status: 2} :
                    {...item}));
                return;
            case 3:
                setForm(form.map(item => item.judge_id === id ?
                    {...item, nbc_invite_status: 3, nbc_invite_comment: ''} :
                    {...item}));
                setListJudges(listJudges.map( item => item.judge_id === id ?
                    {...item, nbc_invite_status: 3, nbc_invite_comment: ''} :
                    {...item}));
                setRejected(([
                    ...rejected,
                    [judge_full_name, id]
                ]));
                return;
            default:
                return;
        }
    }

    const rejectMassage = (e, id) => {
        setForm(form.map(item => item.judge_id === id ?
            { ...item, nbc_invite_comment: e.target.value}
            :
            {...item}));
    }

    const sendInfo = async () => {
        await Request({
            url: '/api/exhibitions/invite/autorize_judges',
            method: 'PUT',
            data: form
        }, () => {
            console.log('данные отправлены!');
            setDisableRadio(form.map(elem=>[elem.judge_id, elem.nbc_invite_status]));
        }, error => {
            console.log(error);
        })
    }

    return (
        loading ?
        <Loading /> :
        <Card className="exhibitions-invite">
            <div className="exhibitions-invite__head">
                <Link className="btn-backward" to={`/nbc/${alias}/documents/`} >Личный кабинет</Link>
                &nbsp;/&nbsp;Приглашение на участие в мероприятии
            </div>
            <div className="club-info">
                <div className="club-info__left">
                    <div className="club-info__inner">
                        <p className="club-info__title">Клуб</p>
                        <Link to={`/club/${alias}`}>{data?.club_name}</Link>
                    </div>
                    <div className="club-info__inner">
                        <p className="club-info__title">Город&nbsp;проведения&nbsp;выставки</p>
                        <p>{data?.exhibition_city}</p>
                    </div>
                </div>
                <div className="club-info__right">
                    <div className="club-info__inner">
                        <p className="club-info__title">Мероприятие</p>
                        <Link to={`/exhibitions/${id}`}>{data?.exhibition_name}</Link>
                    </div>
                    <div className="club-info__inner date">
                        <div className="club-info__inner">
                            <p className="club-info__title">Дата начала</p>
                            <p>{formatDate(data?.exhibition_date_start)}</p>
                        </div>
                        <div className="club-info__inner">
                            <p className="club-info__title">Дата окончания</p>
                            <p>{formatDate(data?.exhibition_date_end)}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="judges-list">
                <p className="judges-list__name">Список судей/специалистов</p>
                <div className="judges-list__cont">
                    {listJudges.length > 0 && listJudges.map(item =>
                        <JudgeCard
                            key={item.judge_id}
                            authAndReject={authAndReject}
                            {...item}
                            disabled={disableRadio.filter(elem => elem[0] === item.judge_id)}
                        />)
                    }
                    {listJudges.length > 0 && disableButton && !disableRadio &&
                        <p className="judges-list__notification">
                            Необходимо выбрать ответ для всех заявленных судей/специалистов
                        </p>
                    }
                </div>
                {!!rejected.length && rejected.map(item =>
                    <div className="rejected-judges" key={item}>
                        <div className="rejected-judges__title">
                            <p>{item[0]}</p>
                            <p>, причина отказа</p>
                        </div>
                        <input
                            type="text"
                            value={form.filter(elem => elem.judge_id === item[1]).nbc_invite_comment}
                            onChange={e => rejectMassage(e, item[1])}
                            disabled={disableRadio.map(elem => elem[0] === item[1] && elem[1] > 1).some(elem => elem === true)}
                        />
                        {+form.filter(elem => elem.judge_id === item[1])
                                .map(key=>key.nbc_invite_comment?.length !== 0 &&
                                    key.nbc_invite_comment?.length)  < 3 &&
                            <p className="rejected-judges__notification">
                                Введите не менее трех символов
                            </p>
                        }
                        {+form.filter(elem => elem.judge_id === item[1])
                                .filter(key=>key.nbc_invite_comment?.length) === 0 &&
                            <p className="rejected-judges__notification">
                                Необходимо указать причину отказа
                            </p>
                        }
                    </div>)
                }
                {listJudges.map(item => item.nbc_invite_status === 3 && !!item.nbc_invite_comment &&
                    <div className="rejected-judges" key={item}>
                        <div className="rejected-judges__title">
                            <p>{`${item.judge_last_name} ${item.judge_name} ${item.judge_second_name}` }</p>
                            <p>, причина отказа</p>
                        </div>
                        <input
                            type="text"
                            value={item.nbc_invite_comment}
                            disabled={true}
                        />
                    </div>)
                }
            </div>
            <button
                className="btn btn-primary"
                type="submit"
                onClick={() => sendInfo()}
                disabled={disableButton || notification}
            >
                Ответить
            </button>
        </Card>
    )
};

export default memo(NBCInvite);
