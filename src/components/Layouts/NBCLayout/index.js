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


import {Redirect, useParams} from "react-router-dom";
import Container from "../Container";
import {endpointGetNBCInfo} from "./config";
import Loading from "../../Loading";
import StickyBox from "react-sticky-box";
import useIsMobile from "../../../utils/useIsMobile";
import Aside from "../Aside";
import UserHeader from "../../redesign/UserHeader";
import Banner from "../../Banner";
import UserPhotoGallery from "../UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../CopyrightInfo";
import {BANNER_TYPES} from "../../../appConfig";
import PhotoComponent from "../../PhotoComponent";
import UserBanner from "../UserBanner";
import UserContacts from "../../redesign/UserContacts";
import ExhibitionsComponent from "../../ExhibitionsComponent";
import AddArticle from "../../UserAddArticle";
import UserNews from "../UserNews";
import {useSelector} from "react-redux";



import './index.scss';


const NBCLayout = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [nbcInfo, setNBCInfo] = useState(null);
    const [nbcProfileId, setNBCProfileId] = useState(null);
    const [notificationsLength, setNotificationsLength] = useState(0);
    const [needRequest, setNeedRequest] = useState(true);
    const isMobile = useIsMobile(1080);
    const [canEdit, setCanEdit] = useState(false);
    const isAuthenticated = useSelector(state => state.authentication.isAuthenticated);

    const { alias } = useParams();
    const aliasRedux = useSelector(state => state?.authentication?.user_info?.alias);

    const getNBCInfo = async () => {
        setLoading(true)
        Request({
            url: endpointGetNBCInfo + '?alias=' + alias
        }, data => {
            console.log('data33333333', data);
            setNBCInfo(data);
            setNBCProfileId(data.profile_id);
        }, error => {
            console.log(error.response);
            setError(error.response);
        });
        setLoading(false);
    }

    useEffect(() => {
        (() => getNBCInfo())();
        setCanEdit((aliasRedux === alias));
    }, []);


    const onSubscriptionUpdate = (subscribed) => {
        setNBCInfo({
            ...nbcInfo,
            subscribed: subscribed
        })
    };

    return (
        loading ?
            <Loading /> :
            <div className="redesign">
                <Container className="content nbc-page">
                    <div className="nbc-page__content-wrap">
                        <Aside className="nbc-page__info">
                            <StickyBox offsetTop={60}>
                                <div className="nbc-page__info-inner">
                                    {!isMobile && nbcInfo &&
                                        <>
                                            <UserHeader
                                                user='nbc'
                                                logo={nbcInfo.logo_link}
                                                name={nbcInfo.name || 'Название клуба отсутствует'}
                                                alias={nbcInfo.alias}
                                                profileId={nbcProfileId}
                                                canEdit={canEdit}
                                                subscribed={nbcInfo.subscribed}
                                                onSubscriptionUpdate={onSubscriptionUpdate}
                                                isAuthenticated={isAuthenticated}
                                            />
                                            <PhotoComponent
                                                photo={nbcInfo.owner_photo}
                                                name={nbcInfo.owner_name}
                                                position={nbcInfo.owner_position}
                                                canEdit={canEdit}
                                            />
                                        </>
                                    }

                                    {/*{!isMobile && <UserMenu userNav={canEdit*/}
                                    {/*    ? clubNav(clubInfo.club_alias) // Show NewsFeed menu item to current user only*/}
                                    {/*    : clubNav(clubInfo.club_alias).filter(i => i.id !== 2)}*/}
                                    {/*                        notificationsLength={notificationsLength}*/}
                                    {/*/>}*/}
                                    {!isMobile && nbcInfo &&
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
                        <div className="nbc-page__content">
                            {
                                React.cloneElement(children, {
                                    isMobile,
                                    nbcInfo: nbcInfo,
                                    canEdit,
                                    getNBCInfo: getNBCInfo,
                                    alias: alias,
                                    nbcProfileId: nbcProfileId,
                                    onSubscriptionUpdate: onSubscriptionUpdate,
                                    isAuthenticated,
                                    setNeedRequest: setNeedRequest,
                                    setNBCInfo: setNBCInfo,
                                    needRequest: needRequest
                                })
                            }
                        </div>
                    </div>
                </Container>
            </div>
    )
};

export default React.memo(connectAuthVisible(connectShowFilters(NBCLayout)));