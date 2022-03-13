import React, { useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import ls from 'local-storage';
import StickyBox from 'react-sticky-box';
import {useSelector} from "react-redux";
import Loading from 'components/Loading';
import Layout from 'components/Layouts';
import Container from 'components/Layouts/Container';
import UserInfo from 'components/Layouts/UserInfo';
import UserMenu from 'components/Layouts/UserMenu';
import UserPhotoGallery from 'components/Layouts/UserGallerys/UserPhotoGallery';
import UserVideoGallery from 'components/Layouts/UserGallerys/UserVideoGallery';
import Card from 'components/Card';
import CopyrightInfo from 'components/CopyrightInfo';
import { Request } from 'utils/request';
import { connectAuthVisible } from 'pages/Login/connectors';
import { endpointGetUserInfo, userNav} from '../UserLayout/config';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import useIsMobile from 'utils/useIsMobile';
import {connectShowFilters} from '../../../components/Layouts/connectors';
import transliterate from '../../../utils/transliterate';
import {endpointGetClubInfo, clubNav} from '../ClubLayout/config';
import {kennelNav} from '../NurseryLayout/config';
import UserHeader from '../../redesign/UserHeader';
import MenuComponent from '../../MenuComponent';

import './index.scss';

const JudgeLayout = ({ profile_id, is_active_profile, isAuthenticated, children, setShowFilters, isOpenFilters, location }) => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [clubInfo, setClubInfo] = useState({});
    const [judgeAlias, setJudgeAlias] = useState('');
    const [judgeInfoLink, setJudgeInfoLink] = useState(null);
    const [judgeAddInfo, setJudgeAddInfo] = useState(null);
    const [judgePersInfo, setJudgePersInfo] = useState(null);
    const [data, setData] = useState(null);
    const [judgeCity, setJudgeCity] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const [checkLink, setCheckLink] = useState(false);
    const isMobile = useIsMobile(1080);

    const {id, type} = useParams();
    const isAuthentificated = useSelector(state => state.authentication.isAuthenticated);
    const alias = isAuthentificated ? useSelector(state => state.authentication.user_info.alias) : 'rkf';
    const userType = isAuthentificated ? useSelector(state => state.authentication.user_info.user_type) : 3;

    const getUserInfo = async needUpdateAvatar => {
        setLoading(true);
        await Request({
            url: endpointGetUserInfo + alias
        }, data => {
            if (needUpdateAvatar) {
                ls.set('user_info', { ...ls.get('user_info'), logo_link: data.logo_link });
            }
            setUserInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
        }, error => {
            console.log(error.response);
        });
        setNeedRequest(true);
        setLoading(false);
    };

    const getClubInfo = async needUpdateAvatar => {
        setLoading(true);
        await Request({
            url: endpointGetClubInfo + alias
        }, data => {
            if (needUpdateAvatar) {
                ls.set('user_info', { ...ls.get('user_info'), logo_link: data.logo_link });
            }
            setClubInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
        }, error => {
            console.log(error.response);
        });
        setNeedRequest(true);
        setLoading(false);
    };

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
        setLoading(true);
        if(judgeAlias) {
            Request({
                url: `/api/owners/owner/public_full/${judgeAlias}`
            }, data => {
                setJudgeInfoLink(data.logo_link);
                setJudgePersInfo(data.personal_information);
                setJudgeCity(data.additional_information);
            }, error => {
                console.log('error', error)
            });
        }
        setLoading(false);
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

    const notifySuccess = (message) => {
        setSuccess({ status: true, message: message });
        !success && setTimeout(() => {
            setSuccess(false);
        }, 3000);
    };

    const notifyError = e => {
        if (e.response) {
            let message;
            if (e.response.data) {
                message = e.response.data.errors
                    ? Object.values(e.response.data.errors)
                    : `${e.response.status} ${e.response.statusText}`;
            } else if (e.response.errors) {
                message = e.response.errors
                    ? Object.values(e.response.errors)
                    : `${e.response.status} ${e.response.statusText}`;
            } else {
                message = 'Произошла ошибка';
            }
            setErrorMessage(message);
            setError(true);
            !error && setTimeout(() => {
                setError(false);
            }, 5000);
        }
    };

    const onSubscriptionUpdate = (subscribed) => {
        setUserInfo({
            ...userInfo,
            subscribed: subscribed
        })
    }

    const link = useLocation();

   function checkLinkUserPage() {
        let checkLink = link.pathname.includes('news-feed');
        setCheckLink(checkLink)
    };


    const getUserMenu = (userType) => {
        switch (userType) {
            case 1:  return <UserMenu userNav={canEdit
                ? userNav(alias) // Show NewsFeed menu item to current user only
                : userNav(alias).filter(i => i.id !== 2)}
                                      notificationsLength={notificationsLength}
            />;
            case 3:
                if(clubInfo.club_alias === 'rkf' || clubInfo.club_alias === 'rkf-online') {
                    return <MenuComponent
                        club_alias={clubInfo.club_alias}
                        isFederation={true}
                    />;
                } else {
                    return <UserMenu userNav={clubNav(clubInfo.club_alias)} refereePage />;
                }
            case 4:  return  <UserMenu userNav={kennelNav(clubInfo.club_alias)}  refereePage />;
            case 5:  return <MenuComponent
                club_alias={clubInfo.club_alias}
                isFederation={true}
            />;
            default: return;
        }
    };

   useEffect(() => {
        checkLinkUserPage();
        if(userType === 1) {
            (() => getUserInfo())();
        } else if(userType === 3 || userType === 4 || userType === 5) {
            (() => getClubInfo())();
        }
        (() => getJudgeAlias())();
        (() => getJudgeAddInfo())();
    },[]);

   useEffect(() => {
       (() => getJudgeInfo())();
   }, [judgeAlias]);

    return (
        loading ?
            <Loading />
            :
            <Layout setNotificationsLength={setNotificationsLength} withFilters={checkLink}>

            <div className="user-page">
                <Container className="user-page__content content">
                    {(!checkLink || !isMobile) && <aside className="user-page__left referee">
                        <StickyBox offsetTop={60}>
                            {
                                (userType && userType === 1)
                                    ?
                                    <Card>
                                        <UserInfo
                                            canEdit={true}
                                            logo_link={userInfo.logo_link}
                                            share_link={`https://rkf.online/user/${alias}`}
                                            first_name={userInfo.personal_information ? userInfo.personal_information.first_name : 'Аноним'}
                                            last_name={userInfo.personal_information ? userInfo.personal_information.last_name : ''}
                                            alias={alias}
                                            subscribed={userInfo.subscribed}
                                            subscribed_id={userInfo.profile_id}
                                            onSubscriptionUpdate={onSubscriptionUpdate}
                                            onSuccess={notifySuccess}
                                            onError={notifyError}
                                        />
                                    </Card>
                                    :
                                    <div className="redesign">
                                        <UserHeader
                                            user={userType === 4 ? 'nursery' : 'club'}
                                            logo={clubInfo.logo_link}
                                            name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                            alias={clubInfo.club_alias}
                                            profileId={clubInfo.id}
                                            federationName={clubInfo.federation_name}
                                            federationAlias={clubInfo.federation_alias}
                                            isFederation={clubInfo.user_type === 5}
                                            active_rkf_user={clubInfo.active_rkf_user}
                                            active_member={clubInfo.active_member}
                                            canEdit={isAuthenticated}
                                            subscribed={clubInfo.subscribed}
                                            member={clubInfo.member}
                                            onSubscriptionUpdate={onSubscriptionUpdate}
                                            isAuthenticated={isAuthenticated}
                                        />
                                    </div>
                            }
                            {!isMobile && userType &&
                                getUserMenu(userType)
                            }
                            {!isMobile &&
                                <>
                                    <UserPhotoGallery
                                        alias={alias}
                                        pageLink={() => {
                                            switch (userType) {
                                                case 1:
                                                    return `/user/${alias}/gallery`
                                                case 3:
                                                    if(alias === 'rkf' || alias === 'rkf-online') {
                                                        return `/${alias}/gallery`
                                                    } else {
                                                        return `/club/${alias}/gallery`
                                                    }
                                                case 4:
                                                    return `/kennel/${alias}/gallery`
                                                case 5:
                                                    return `/${alias}/gallery`
                                                default:
                                                    break;
                                            }
                                        }
                                    }
                                        canEdit={canEdit}
                                    />
                                    <UserVideoGallery
                                        alias={alias}
                                        pageLink={() => {
                                            switch (userType) {
                                                case 1:
                                                    return `/user/${alias}/video`
                                                case 3:
                                                    if(alias === 'rkf' || alias === 'rkf-online') {
                                                        return `/${alias}/video`
                                                    } else {
                                                        return `/club/${alias}/video`
                                                    }
                                                case 4:
                                                    return `/kennel/${alias}/video`
                                                case 5:
                                                    return `/${alias}/video`
                                                default:
                                                    break;
                                            }
                                        }
                                        }
                                        canEdit={canEdit}
                                    />
                                    <CopyrightInfo withSocials={true} />
                                </>
                            }
                        </StickyBox>
                    </aside>}
                    <div className="user-page__right">
                            <Card>
                                <div className="judge-info__wrap">
                                    <img src={judgeInfoLink ? judgeInfoLink : '/static/icons/default/default_avatar.svg'} alt="avatar-img" />
                                    <div className="judge-info__inner">
                                        <div className="judge-info__name-location">
                                            <div className="judge-info__name-block">
                                                <p className="judge-info__name-rus">{judgePersInfo && judgePersInfo.first_name + ' ' + judgePersInfo.last_name}</p>
                                                <p className="judge-info__name-lat">{judgePersInfo && transliterate(`${judgePersInfo.first_name} ${judgePersInfo.last_name}`)}</p>
                                            </div>
                                            <div className="judge-info__location-block">
                                                <p className="judge-info__city">{judgeCity && judgeCity.city_name}</p>
                                            </div>
                                        </div>
                                        <p className="judge-info__list">Лист Судьи № <span>{data && data[0].judge_info.cert_number}</span></p>
                                    </div>
                                </div>
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
                                { (type && type === '1' &&  judgeAddInfo) &&
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
                                            !(judgeAddInfo?.contests.includes("Все конкурсы/All competitions")) &&
                                            <div className="judge-info__box">
                                                {
                                                    judgeAddInfo?.opened_groups_and_breeds.length > 0 &&
                                                    <div className="judge-info__add-info">
                                                        <p>Группа, номер стандарта, название породы:</p>
                                                        <ul>
                                                            {
                                                                judgeAddInfo.opened_groups_and_breeds.map((item, i) => <li key={i}>{item}</li>)
                                                            }
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </>
                                }
                                {type && type === '2'
                                    &&
                                    data?.map((item) =>
                                        item.judge_info?.disciplines.map((item, i) =>
                                                <div key={i} className="judge-info__rank-box">
                                                    <p key={i} className="judge-info__spec">
                                                    {item.specialization}
                                                    </p>
                                                    {
                                                        item?.disciplines.map((item , i)=>
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
                                                                            <p className="">
                                                                                {item.rank}
                                                                            </p>
                                                                        </div>
                                                                    }
                                                                    {
                                                                        item.disciplines.length > 0 &&
                                                                        <div className="judge-info__add-info">
                                                                            <p>Дисциплины:</p>
                                                                            <ul>
                                                                                {
                                                                                    item.disciplines.map((item, i) =>
                                                                                        <li>{item.discipline_short_name}</li>
                                                                                    )
                                                                                }
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
                <NotificationGroup>
                    <Fade enter={true} exit={true}>
                        {success.status && <Notification
                            type={{ style: 'success', icon: true }}
                            closable={true}
                            onClose={() => setSuccess(false)}
                        >
                            <span>{success.message ? success.message : 'Информация сохранена!'}</span>
                        </Notification>}
                    </Fade>
                    <Fade enter={true} exit={true}>
                        {error && <Notification
                            type={{ style: 'error', icon: true }}
                            closable={true}
                            onClose={() => setError(false)}
                        >
                            <span>{errorMessage}</span>
                        </Notification>}
                    </Fade>
                </NotificationGroup>
            </div>
        </Layout>
        )
};

export default React.memo(connectAuthVisible(connectShowFilters(JudgeLayout)));