import React, { useEffect, useState } from 'react';
import {useLocation, useParams} from 'react-router-dom';
import ls from 'local-storage';
import StickyBox from 'react-sticky-box';
import {useSelector} from "react-redux";
import Loading from 'components/Loading';
import Layout from 'components/Layouts';
import { Redirect } from 'react-router-dom';
import Container from 'components/Layouts/Container';
import UserBanner from 'components/Layouts/UserBanner';
import UserInfo from 'components/Layouts/UserInfo';
import UserMenu from 'components/Layouts/UserMenu';
import UserPhotoGallery from 'components/Layouts/UserGallerys/UserPhotoGallery';
import UserVideoGallery from 'components/Layouts/UserGallerys/UserVideoGallery';
import Card from 'components/Card';
import CopyrightInfo from 'components/CopyrightInfo';
import { Request } from 'utils/request';
import { connectAuthVisible } from 'pages/Login/connectors';
import { endpointGetUserInfo, userNav} from "../UserLayout/config";
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { Fade } from '@progress/kendo-react-animation';
import useIsMobile from 'utils/useIsMobile';
import {connectShowFilters} from '../../../components/Layouts/connectors';
import {endpointGetJudgeInfo} from "./config";

import "./index.scss";

const JudgeLayout = ({ profile_id, is_active_profile, isAuthenticated, children, setShowFilters, isOpenFilters, location }) => {
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [errorRedirect, setErrorRedirect] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [judgeInfo, setJudgeInfo] = useState({});
    const [canEdit, setCanEdit] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const [checkLink, setCheckLink] = useState(false);
    const isMobile = useIsMobile(1080);



    const {id} = useParams();
    const alias = useSelector(state => state.authentication.user_info.alias);

    console.log('userInfo', userInfo);

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
            setErrorRedirect(error.response);
        });

        setNeedRequest(true);
        setLoading(false);
    };

    // const getJudgeInfo = () => {
    //     setLoading(true);
    //     Request({
    //         url: "/api/referee/referee/full?id=14017&type=1"
    //     }, data => {
    //         console.log('data111111111', data)
    //         setJudgeInfo(data);
    //     }, error => {
    //         console.log(error.response);
    //         console.log(endpointGetJudgeInfo + id);
    //         setErrorRedirect(error.response);
    //     });
    //     setLoading(false);
    // };

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
    }

    useEffect(() => {
        checkLinkUserPage();
        (() => getUserInfo())();
        // (() => getJudgeInfo())();
    },[]);

    return (
        loading ?
            <Loading /> :
            errorRedirect ?
                <Redirect to="/404" />
                :
        <Layout setNotificationsLength={setNotificationsLength} withFilters={checkLink}>

            <div className="user-page">
                <Container className="user-page__content content">
                    {(!checkLink || !isMobile) && <aside className="user-page__left">
                        <StickyBox offsetTop={60}>
                            <Card>
                                <UserInfo
                                    canEdit={canEdit}
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
                            {!isMobile &&
                                <UserMenu userNav={canEdit
                                    ? userNav(alias) // Show NewsFeed menu item to current user only
                                    : userNav(alias).filter(i => i.id !== 2)}
                                          notificationsLength={notificationsLength}
                                />
                            }
                            {!isMobile &&
                                <>
                                    <UserPhotoGallery
                                        alias={alias}
                                        pageLink={`/user/${alias}/gallery`}
                                        canEdit={canEdit}
                                    />
                                    <UserVideoGallery
                                        alias={alias}
                                        pageLink={`/user/${alias}/video`}
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
                                    <img src="/media/MWI4ZjdkNzMtMTc1MS00MDVmLTlkZDUtZmIwYzA5OWUyODMxX0F2YXRhcg.JPG" alt="avatar-img" />
                                    <div className="judge-info__inner">
                                        <div className="judge-info__name-location">
                                            <div className="judge-info__name-block">
                                                <p className="judge-info__name-rus">Ивановский Иван</p>
                                                <p className="judge-info__name-lat">Ivanov Ivan Ivanich</p>
                                            </div>
                                            <div className="judge-info__location-block">
                                                <p className="judge-info__city">Москва</p>
                                            </div>
                                        </div>
                                        <p className="judge-info__list">Лист Судьи № <span>1111</span></p>
                                    </div>
                                </div>

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