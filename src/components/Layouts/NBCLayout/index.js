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

import './index.scss';
import {Redirect, useParams} from "react-router-dom";
import Container from "../Container";
import StickyBox from "react-sticky-box";
import {kennelNav} from "../NurseryLayout/config";

// { profile_id, is_active_profile, isAuthenticated, children, setShowFilters, isOpenFilters }

const NBCLayout = ({children}) => {
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

    const {id} = useParams();

    const userInfo = {
            "id": 3433,
            "club_alias": "8a07aafe5d9541f0a2f9478e5ae5a795",
            "owner_name": "test test test",
            "owner_position": "Контактное лицо",
            "headliner_link": "/media/YzBmODk0ZTYtYzljOC00MzE2LTk0NjQtNDQwZTdjZjc0OWRiX0NsdWJIZWFkZXI.JPG",
            "logo_link": "/media/YzBmODk0ZTYtYzljOC00MzE2LTk0NjQtNDQwZTdjZjc0OWRiX0NsdWJIZWFkZXI.JPG",
            "shortcut_route_name": "8a07aafe5d9541f0a2f9478e5ae5a795",
            "name": "Питомник Ильича",
            "short_name": "Питомник Ильича",
            "site": "",
            "description": "Наш питомник отличается культурой питания! Собачки нашего клуба - самые воспитанные, они не едят с пола и тем более из мусорного ведра!   ",
            "address": null,
            "city": null,
            "legal_address": "323223, Красноярский край, Посёлок Абан, бульвар 23, корпус 32, комната 32",
            "legal_city": {
                "id": 3,
                "name": "Абан",
                "name_eng": null
            },
            "inn": "",
            "kpp": "",
            "ogrn": "",
            "bank_name": null,
            "rs_number": null,
            "bic": null,
            "bank_comment": null,
            "work_time_from": null,
            "work_time_to": null,
            "work_time": [
                {
                    "id": 62,
                    "week_day_id": 1,
                    "time_from": "05:00:00",
                    "time_to": "18:00:00"
                }
            ],
            "contacts": [
                {
                    "id": 22056,
                    "value": "+7(999)999-99-99",
                    "description": "Из заявки на регистрацию питомника.",
                    "is_main": false,
                    "contact_type_id": 1
                }
            ],
            "documents": [],
            "title": "Питомник Ильича",
            "content": "Наш питомник отличается культурой питания! Собачки нашего клуба - самые воспитанные, они не едят с пола и тем более из мусорного ведра!   ",
            "picture_link": null,
            "create_date": "2022-04-20T15:36:08.9264+03:00",
            "geo_lat": "",
            "geo_lon": "",
            "organization_status_id": 1,
            "organization_status_name": "Действующая",
            "federation_name": "РФЛС",
            "federation_alias": "rfls",
            "is_active": true,
            "user_type": 4,
            "counters": {
                "publications_count": 43,
                "photos_count": 14,
                "videos_count": 2,
                "exhibitions_count": 0,
                "documents_count": 8
            },
            "active_rkf_user": false,
            "active_member": false,
            "subscribed": false,
            "member": false
    }

    return (
        <Layout>
            <Container className="pt-150">
                <p>Здесь будет страница НКП</p>
                <ul>
                    <li><a href={`/nbc/${id}/edit`}>Редачить профиль</a></li>
                    <li><a href={`/nbc/${id}/gallery`}>Фото</a></li>
                    <li><a href={`/nbc/${id}/video`}>Видео</a></li>
                    <li><a href={`/nbc/${id}/documents`}>Документы</a></li>
                    {children}
                </ul>
            </Container>
        </Layout>
    )
    // loading ?
    //     <Loading /> :
    //     error ?
    //         error.status === 422 ? <Redirect to="/kennel/activation" /> : <Redirect to="404" /> :
    //         <Layout setNotificationsLength={setNotificationsLength} layoutWithFilters>
    //             <div className="redesign">
    //                 <Container className="content nursery-page">
    //                     <div className="nursery-page__content-wrap">
    //                         <div className="nursery-page__content">
    //                             {
    //                                 React.cloneElement(children, {
    //                                     isMobile,
    //                                     userInfo: nursery,
    //                                     getUserInfo: getNurserynfo,
    //                                     canEdit,
    //                                     alias,
    //                                     id: profile_id,
    //                                     setNeedRequest,
    //                                     needRequest,
    //                                     setUserInfo: setNursery
    //                                 })
    //                             }
    //                         </div>
    //                         <Aside className="nursery-page__info">
    //                             <StickyBox offsetTop={60}>
    //                                 <div className="nursery-page__info-inner">
    //                                     {!isMobile &&
    //                                         <UserHeader
    //                                             canEdit={canEdit}
    //                                             user="nursery"
    //                                             logo={nursery.logo_link}
    //                                             name={nursery.name || 'Имя отсутствует'}
    //                                             alias={alias}
    //                                             profileId={nursery.id}
    //                                             federationName={nursery.federation_name}
    //                                             federationAlias={nursery.federation_alias}
    //                                             active_rkf_user={nursery.active_rkf_user}
    //                                             active_member={nursery.active_member}
    //                                         />
    //                                     }
    //                                     {!isMobile && <UserMenu userNav={canEdit
    //                                         ? kennelNav(alias) // Show NewsFeed menu item to current user only
    //                                         : kennelNav(alias).filter(i => i.id !== 2)}
    //                                                             notificationsLength={notificationsLength}
    //                                     />}
    //                                     {!isMobile &&
    //                                         <>
    //                                             {nursery.breeds && !!nursery.breeds.length &&
    //                                                 <BreedsList breeds={nursery.breeds} />
    //                                             }
    //                                             <Banner type={BANNER_TYPES.kennelPageUnderPhotos} />
    //                                             <UserPhotoGallery
    //                                                 alias={alias}
    //                                                 pageLink={`/kennel/${alias}/gallery`}
    //                                                 canEdit={canEdit}
    //                                             />
    //                                             <UserVideoGallery
    //                                                 alias={alias}
    //                                                 pageLink={`/kennel/${alias}/video`}
    //                                                 canEdit={canEdit}
    //                                             />
    //                                             <CopyrightInfo withSocials={true} />
    //                                         </>
    //                                     }
    //                                 </div>
    //                             </StickyBox>
    //                         </Aside>
    //                     </div>
    //                 </Container>
    //             </div>
    //         </Layout>
};

export default React.memo(connectAuthVisible(connectShowFilters(NBCLayout)));