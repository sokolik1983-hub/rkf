import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Loading from "../../../components/Loading";
import Layout from "../../../components/Layouts";
import Container from "../../../components/Layouts/Container";
import Card from "../../../components/Card";
import CopyrightInfo from "../../../components/CopyrightInfo";
import {Request} from "../../../utils/request";
import {connectAuthVisible} from "../../../pages/Login/connectors";
import {connectShowFilters} from "../connectors";
import transliterate from "../../../utils/transliterate";
import Statistics from "../../Statistics";
import ClubsMap from "../../ClubsMap";
import history from "../../../utils/history";
import LightTooltip from "../../LightTooltip";
import { judgeIcon } from "../UserLayout/config";
import Avatar from "../Avatar";

import "./index.scss";


const JudgeLayout = () => {
    const [loading, setLoading] = useState(true);
    const [loadingJudgePersInfo, setLoadingJudgePersInfo] = useState(false);
    const [judgeAlias, setJudgeAlias] = useState('');
    const [judgeInfoLink, setJudgeInfoLink] = useState(null);
    const [judgeAddInfo, setJudgeAddInfo] = useState(null);
    const [judgePersInfo, setJudgePersInfo] = useState(null);
    const [data, setData] = useState(null);
    const [judgeCity, setJudgeCity] = useState(null);
    const {id, type} = useParams();

    const getJudgeAlias = () => {
        setLoading(true);
        Request({
            url: `/api/referee/alias?judgeId=${id}`
        }, data => {
            setJudgeAlias(data);
        }, error => {
            console.log('error', error);
        });
        setLoading(false);
    };

    const getJudgeInfo = () => {
        setLoadingJudgePersInfo(true);
        if(judgeAlias) {
            Request({
                url: `/api/owners/owner/public_full/${judgeAlias}`
            }, data => {
                setJudgeInfoLink(data.logo_link);
                setJudgePersInfo(data.personal_information);
                setJudgeCity(data.additional_information);
                setLoadingJudgePersInfo(false);
            }, error => {
                console.log('error', error)
            });
        }
    };

    const getJudgeAddInfo = () => {
        setLoading(true);
        Request({
            url: `/api/referee/referee/full?id=${id}&type=${type}`
        }, data => {
            setData(data);
            setJudgeAddInfo(data[0].judge_info);
        }, error => {
            console.log('error', error)
        });
        setLoading(false);
    };

   useEffect(() => {
        (() => getJudgeAlias())();
        (() => getJudgeAddInfo())();
    },[]);

   useEffect(() => {
       (() => getJudgeInfo())();
   }, [judgeAlias]);

    return (
        loading ?
            <Loading /> :
        <Layout>
            <div className="user-page">
                <Container className="user-page__content content">
                    <aside className="user-page__left referee">
                        <Statistics />
                        <Card className="home-page__map-wrap">
                            <h3><Link className="home-page__map-title" to="/clubs-map">Карта авторизованных клубов</Link></h3>
                            <div className="home-page__map">
                                <ClubsMap />
                            </div>
                        </Card>
                        <CopyrightInfo withSocials={true} />
                    </aside>
                    <div className="user-page__content-wrap">
                        <button className="back-button"
                                onClick={() => judgeAlias && history.push(`/user/${judgeAlias}`)}
                        >Назад
                        </button>

                        <Card>
                            {
                                loadingJudgePersInfo
                                ?
                                    <Loading />
                                    :
                                    <div className="judge-info__wrap">
                                        <Avatar
                                            card="specialist-card"
                                            data="header"
                                            logo={judgeInfoLink}
                                            name={`${judgePersInfo?.first_name} ${judgePersInfo?.last_name}`}
                                            subclass={null}
                                        />
                                        <div className="judge-info__inner">
                                            <div className="judge-info__name-location">
                                                <div className="judge-info__name-block">
                                                    <p className="judge-info__name-rus">
                                                        {judgePersInfo && judgePersInfo.first_name + ' ' + judgePersInfo.last_name}
                                                        {judgeAlias && judgeIcon}
                                                    </p>
                                                    <p className="judge-info__name-lat">
                                                        {judgePersInfo && transliterate(`${judgePersInfo.first_name} ${judgePersInfo.last_name}`)}
                                                    </p>
                                                </div>
                                                <div className="judge-info__location-block">
                                                    <p className="judge-info__city">{judgeCity && judgeCity.city_name}</p>
                                                </div>
                                            </div>
                                            <p className="judge-info__list">Лист Судьи
                                                № <span>{data && data[0]?.judge_info?.cert_number}</span></p>
                                        </div>
                                    </div>
                            }

                            <div className="judge-info__contacts">
                                {
                                    judgeAddInfo?.phones.length > 0 &&
                                    <div className="judge-info__tel-email">
                                        <p>Телефон:</p>
                                        <ul>
                                            {
                                                judgeAddInfo.phones.map((item, i) => <li key={i}>{item}</li>)
                                            }
                                        </ul>

                                    </div>
                                }
                                {
                                    judgeAddInfo?.emails.length > 0 &&
                                    <div className="judge-info__tel-email">
                                        <p>E-mail:</p>
                                        <ul>
                                            {
                                                judgeAddInfo.emails.map((item, i) => <li key={i}>{item}</li>)
                                            }
                                        </ul>
                                    </div>
                                }
                            </div>
                            {(type && type === '1' && judgeAddInfo) &&
                                <>
                                    <div className="judge-info__box">
                                        {
                                            <div className="judge-info__add-info">
                                                <p>Статус:</p>
                                                <p className="judge-info__status">
                                                    {judgeAddInfo?.ranks}
                                                </p>
                                            </div>
                                        }
                                        {
                                            judgeAddInfo?.contests.length > 0 &&
                                            <div className="judge-info__add-info">
                                                <p>Выставочные конкурсы:</p>
                                                <ul>
                                                    {
                                                        judgeAddInfo.contests.map((item, i) => <li key={i}>{item}</li>)
                                                    }
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                    {
                                        (!!judgeAddInfo?.contests?.length || judgeAddInfo?.opened_groups_and_breeds?.length) &&
                                        <div className="judge-info__box">
                                                <div className="judge-info__add-info">
                                                    <p>Группа, номер стандарта, название породы:</p>
                                                    <ul>
                                                        {
                                                            judgeAddInfo?.opened_groups_and_breeds?.length ?
                                                                judgeAddInfo.opened_groups_and_breeds.map((item, i) => <li key={i}>{item}</li>) :
                                                                <li>ВСЕ ПОРОДЫ / ALL BREEDS</li>
                                                        }
                                                    </ul>
                                                </div>
                                        </div>
                                    }
                                </>
                            }
                            {type && type === '2' &&
                                data?.map((item) =>
                                    item.judge_info?.disciplines.map((item, i) =>
                                        <div key={i} className="judge-info__rank-box">
                                            <p key={i} className="judge-info__spec">
                                                {item.specialization}
                                            </p>
                                            {
                                                item?.disciplines.map((item, i) =>
                                                    <div key={i}>
                                                        {
                                                            item.for_judge_examiner &&
                                                            <p className="judge-info__exam">Экзаменатор</p>
                                                        }
                                                        <div className="judge-info__box">
                                                            {
                                                                item.rank &&
                                                                <div className="judge-info__add-info">
                                                                    <p>Ранг:</p>
                                                                    <p>
                                                                        {item.rank}
                                                                    </p>
                                                                </div>
                                                            }
                                                            {
                                                                item.disciplines.length > 0 &&
                                                                <div className="judge-info__add-info">
                                                                    <p>Дисциплины:</p>
                                                                    <ul>
                                                                        {item?.disciplines?.map((discipline, index) =>
                                                                            <li>
                                                                                <LightTooltip
                                                                                    title={ discipline.discipline_name || 'title' }
                                                                                    enterDelay={ 100 } leaveDelay={ 50 }
                                                                                    key={ index }>
                                                                                <span
                                                                                    className="card-specialists__discipline">
                                                                                    { discipline.discipline_short_name }
                                                                                </span>
                                                                                </LightTooltip>
                                                                            </li>
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                )
                            }

                        </Card>
                    </div>

                </Container>
            </div>
        </Layout>
        )
};

export default React.memo(connectAuthVisible(connectShowFilters(JudgeLayout)));