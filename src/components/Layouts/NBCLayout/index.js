import React, { useEffect, useState } from 'react';
// import {useLocation, useParams} from 'react-router-dom';
// import ls from 'local-storage';
// import StickyBox from 'react-sticky-box';
// import Loading from 'components/Loading';
import Layout from "../index";
// import { Redirect } from 'react-router-dom';
// import Container from 'components/Layouts/Container';
// import UserBanner from 'components/Layouts/UserBanner';
// import UserInfo from 'components/Layouts/UserInfo';
// import UserMenu from 'components/Layouts/UserMenu';
// import UserPhotoGallery from 'components/Layouts/UserGallerys/UserPhotoGallery';
// import UserVideoGallery from 'components/Layouts/UserGallerys/UserVideoGallery';
// import Card from 'components/Card';
// import CopyrightInfo from 'components/CopyrightInfo';
// import { Request } from 'utils/request';
import { connectAuthVisible } from 'pages/Login/connectors';
// import { endpointGetUserInfo, endpointGetRolesInfo, userNav } from './config';
// import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
// import { Fade } from '@progress/kendo-react-animation';
// import useIsMobile from 'utils/useIsMobile';
import {connectShowFilters} from '../../../components/Layouts/connectors';
import {Request} from "../../../utils/request";

import './index.scss';
import {Redirect, useParams} from "react-router-dom";
import Container from "../Container";
import {endpointGetNBCInfo} from "./config";
import Loading from "../../Loading";
import StickyBox from "react-sticky-box";
import useIsMobile from "../../../utils/useIsMobile";
import Aside from "../Aside";
import UserHeader from "../../UserHeader";
import Banner from "../../Banner";
import UserPhotoGallery from "../UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../CopyrightInfo";
import {BANNER_TYPES} from "../../../appConfig";


// { profile_id, is_active_profile, isAuthenticated, children, setShowFilters, isOpenFilters }

const NBCLayout = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [nbcInfo, setNBCInfo] = useState(null);
    const [nbcProfileId, setNBCProfileId] = useState(null);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const [needRequest, setNeedRequest] = useState(true);
    const isMobile = useIsMobile(1080);
    const [canEdit, setCanEdit] = useState(false);

    // const [loading, setLoading] = useState(true);
    // const [success, setSuccess] = useState(false);
    // const [error, setError] = useState(false);
    // const [errorMessage, setErrorMessage] = useState(false);
    // const [errorRedirect, setErrorRedirect] = useState(false);
    // const [userInfo, setUserInfo] = useState({});
    // const [rolesInfo, setRolesInfo] = useState([]);
    // const [judgeInfo, setJudgeInfo] = useState([]);
    // const [canEdit, setCanEdit] = useState(false);
    // const [needRequest, setNeedRequest] = useState(true);
    // const [notificationsLength, setNotificationsLength] = useState(0);
    // const [checkLink, setCheckLink] = useState(false);
    // const { route: alias, id } = useParams();
    // const isMobile = useIsMobile(1080);
    //
    // useEffect(() => {
    //     (() => getUserInfo())();
    // }, []);
    //
    // useEffect(() => {
    //     userInfo?.profile_id &&
    //     (() => getRolesInfo())();
    // }, [userInfo]);
    //
    // useEffect(() => {
    //     !!rolesInfo &&
    //     setJudgeInfo(rolesInfo.open_roles?.map(item => item.key_name === "role_judge" && item.role_data));
    // }, [rolesInfo]);
    //
    // const getUserInfo = async needUpdateAvatar => {
    //     setLoading(true);
    //
    //     await Request({
    //         url: endpointGetUserInfo + alias
    //     }, data => {
    //         if (needUpdateAvatar) {
    //             ls.set('user_info', { ...ls.get('user_info'), logo_link: data.logo_link });
    //         }
    //         setUserInfo(data);
    //         setCanEdit(isAuthenticated && is_active_profile && profile_id === data.profile_id);
    //     }, error => {
    //         console.log(error.response);
    //         setErrorRedirect(error.response);
    //     });
    //
    //     setNeedRequest(true);
    //     setLoading(false);
    // };
    //
    // const getRolesInfo = async() => {
    //     await Request({
    //         url: endpointGetRolesInfo + userInfo.profile_id
    //     }, data => {
    //         setRolesInfo(data);
    //     }, error => {
    //         console.log(error.response);
    //         setErrorRedirect(error.response);
    //     });
    // };
    //
    // const notifySuccess = (message) => {
    //     setSuccess({ status: true, message: message });
    //     !success && setTimeout(() => {
    //         setSuccess(false);
    //     }, 3000);
    // };
    //
    // const notifyError = e => {
    //     if (e.response) {
    //         let message;
    //         if (e.response.data) {
    //             message = e.response.data.errors
    //                 ? Object.values(e.response.data.errors)
    //                 : `${e.response.status} ${e.response.statusText}`;
    //         } else if (e.response.errors) {
    //             message = e.response.errors
    //                 ? Object.values(e.response.errors)
    //                 : `${e.response.status} ${e.response.statusText}`;
    //         } else {
    //             message = 'Произошла ошибка';
    //         }
    //         setErrorMessage(message);
    //         setError(true);
    //         !error && setTimeout(() => {
    //             setError(false);
    //         }, 5000);
    //     }
    // };
    //
    // const onSubscriptionUpdate = (subscribed) => {
    //     setUserInfo({
    //         ...userInfo,
    //         subscribed: subscribed
    //     })
    // }
    //
    // const link = useLocation();
    //
    // function checkLinkUserPage() {
    //     let checkLink = link.pathname.includes('news-feed');
    //     setCheckLink(checkLink)
    // }
    //
    // useEffect(() => {
    //     checkLinkUserPage();
    // },[]);

    const { alias } = useParams();

    const getNBCInfo = async () => {
        Request({
            url: endpointGetNBCInfo + '?alias=' + alias
        }, data => {
            setNBCInfo(data);
            setNBCProfileId(data.profile_id);
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        });
    }

    useEffect(() => {
        (() => getNBCInfo())();
    }, []);


    useEffect(() => {
        console.log('nbcInfo', nbcInfo);
        console.log('nbcProfileId', nbcProfileId);
    }, [nbcInfo, nbcProfileId]);



    return (
        loading ?
            <Loading /> :
                <Layout setNotificationsLength={setNotificationsLength} layoutWithFilters>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    {
                                        React.cloneElement(children, {
                                            isMobile,
                                            userInfo: nbcInfo,
                                            getUserInfo: getNBCInfo,
                                            canEdit,
                                            alias,
                                            id: nbcProfileId,
                                            setNeedRequest,
                                            needRequest,
                                            setUserInfo: setNBCInfo
                                        })
                                    }
                                </div>
                                <Aside className="club-page__info">
                                    <StickyBox offsetTop={60}>
                                        <div className="club-page__info-inner">
                                            {!isMobile &&
                                                <UserHeader
                                                    canEdit={canEdit}
                                                    user='nbc'
                                                    logo={nbcInfo?.avatar || 'https://sun9-71.userapi.com/s/v1/if1/3W325abgVVW87kjXZY6uhbvLOVMGwgyl_bbqnMYyt9AP1QXqp4L_uzvBD_Q8SlPcEhSkZDeS.jpg?size=853x1280&quality=96&type=album'}
                                                    name={nbcInfo?.name || 'Название клуба отсутствует'}
                                                    alias={nbcInfo?.club_alias}
                                                    profileId={nbcInfo?.profile_id}
                                                    // federationName={nbcInfo?.federation_name}
                                                    // federationAlias={nbcInfo?.federation_alias}
                                                    // active_rkf_user={nbcInfo?.active_rkf_user}
                                                    // active_member={nbcInfo?.active_member}
                                                />
                                            }
                                            {/*{!isMobile && <UserMenu  userNav={canEdit*/}
                                            {/*    ? clubNav(alias) // Show NewsFeed menu item to current user only*/}
                                            {/*    : clubNav(alias).filter(i => i.id !== 2)}*/}
                                            {/*                         notificationsLength={notificationsLength}*/}
                                            {/*/>}*/}
                                            {!isMobile &&
                                                <>
                                                    <Banner type={BANNER_TYPES.clubPageUnderPhotos} />
                                                    <UserPhotoGallery
                                                        alias={alias}
                                                        pageLink={`/nbc/${alias}/gallery`}
                                                        canEdit={canEdit}
                                                    />
                                                    <UserVideoGallery
                                                        alias={alias}
                                                        pageLink={`/nbc/${alias}/video`}
                                                        canEdit={canEdit}
                                                    />
                                                    <CopyrightInfo withSocials={true} />
                                                </>
                                            }
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                        </Container>
                    </div>
                </Layout>
        // <Layout>
        //     <Container className="pt-150">
        //         <p>Здесь будет страница НКП</p>
        //         <ul>
        //             <li><a href={`/nbc/${alias}/edit`}>Редачить профиль</a></li>
        //             <li><a href={`/nbc/${alias}/gallery`}>Фото</a></li>
        //             <li><a href={`/nbc/${alias}/video`}>Видео</a></li>
        //             <li><a href={`/nbc/${alias}/documents`}>Документы</a></li>
        //             {children}
        //         </ul>
        //     </Container>
        // </Layout>
    )
};

export default React.memo(connectAuthVisible(connectShowFilters(NBCLayout)));