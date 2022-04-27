import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import UserBanner from "../../components/Layouts/UserBanner";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import UserDescription from "../../components/Layouts/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";
import {BANNER_TYPES, DEFAULT_IMG} from "../../appConfig";
import UserLayout from 'components/Layouts/UserLayout';
import NBCLayout from "../../components/Layouts/NBCLayout";
import Loading from "../../components/Loading";
import {Redirect, useParams} from "react-router-dom";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import BreedsList from "../../components/BreedsList";
import Aside from "../../components/Layouts/Aside";
import StickyBox from "react-sticky-box";
import UserMenu from "../../components/Layouts/UserMenu";
import {kennelNav} from "../Nursery/config";
import Banner from "../../components/Banner";
import CopyrightInfo from "../../components/CopyrightInfo";
import useIsMobile from "../../utils/useIsMobile";
import UserHeader from "../../components/redesign/UserHeader";
import UserContacts from "../../components/redesign/UserContacts";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import {clubNav} from "../Club/config";
import {Request} from "../../utils/request";
import {endpointGetNBCInfo} from "../../components/Layouts/NBCLayout/config";

import "./index.scss"
import PhotoComponent from "../../components/PhotoComponent";

const NBCPage = () => {
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
        setCanEdit((aliasRedux === alias));
    }, []);

    const onSubscriptionUpdate = (subscribed) => {
        setNBCInfo({
            ...nbcInfo,
            subscribed: subscribed
        })
    }


    useEffect(() => {
        console.log('aliasRedux', aliasRedux);
        console.log('alias', alias);
    }, [nbcInfo, nbcProfileId]);

    return (
        loading ?
            <Loading />
            :
            <Layout setNotificationsLength={setNotificationsLength}>
                <div className="redesign">
                    <Container className="content nbc-page">
                        <div className="nbc-page__content-wrap">
                            <Aside className="nbc-page__info">
                                <StickyBox offsetTop={60}>
                                    <div className="club-page__info-inner">
                                        {!isMobile && nbcInfo &&
                                            <>
                                                <UserHeader
                                                    user='nbc'
                                                    logo={nbcInfo.logo_link}
                                                    name={nbcInfo.name || 'Название клуба отсутствует'}
                                                    alias={nbcInfo.alias}
                                                    profileId={nbcProfileId}
                                                    // federationName={clubInfo.federation_name}
                                                    // federationAlias={clubInfo.federation_alias}
                                                    // active_rkf_user={clubInfo.active_rkf_user}
                                                    // active_member={clubInfo.active_member}
                                                    canEdit={canEdit}
                                                    subscribed={nbcInfo.subscribed}
                                                    // member={clubInfo.member}
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
                                <UserBanner
                                    link={nbcInfo?.headliner_link || '/static/images/noimg/no-banner.png'} //сюда добавить, когда будет готово на беке   nbcInfo.headliner_link ||
                                    canEdit={canEdit}
                                    updateInfo={getNBCInfo}
                                />
                                {isMobile && nbcInfo &&
                                    <UserHeader
                                        user={alias !== 'rkf-online' ? 'club' : ''}
                                        logo={nbcInfo.logo_link}
                                        name={'Название клуба отсутствует'} //сюда добавить, когда будет готово на беке => nbcInfo.name ||
                                        alias={nbcInfo.alias}
                                        profileId={nbcProfileId}
                                        // federationName={nbcInfo.federation_name}
                                        // federationAlias={nbcInfo.federation_alias}
                                        // active_rkf_user={nbcInfo.active_rkf_user}
                                        // active_member={nbcInfo.active_member}
                                        canEdit={canEdit}
                                        subscribed={nbcInfo.subscribed}
                                        // member={nbcInfo.member}
                                        onSubscriptionUpdate={onSubscriptionUpdate}
                                        isAuthenticated={isAuthenticated}
                                    />
                                }
                                {/*<UserDescription description={nbcInfo.description} />*/}
                                <UserContacts {...nbcInfo} profileAlias={alias} />
                                <div className="club-page__exhibitions">
                                    <ExhibitionsComponent alias={alias} />
                                </div>
                                {isMobile && nbcInfo &&
                                    <>
                                        <UserPhotoGallery
                                            alias={nbcInfo.alias}
                                            pageLink={`/nbc/${nbcInfo.alias}/gallery`}
                                            canEdit={canEdit}
                                        />
                                        <UserVideoGallery
                                            alias={nbcInfo.alias}
                                            pageLink={`/nbc/${nbcInfo.alias}/video`}
                                            canEdit={canEdit}
                                        />
                                    </>
                                }
                                {canEdit && nbcInfo &&
                                    <AddArticle
                                        id={nbcProfileId}
                                        logo={nbcInfo.avatar}
                                        setNeedRequest={setNeedRequest}
                                        profileInfo={nbcInfo}
                                        setProfileInfo={setNBCInfo}
                                    />
                                }
                                <UserNews
                                    canEdit={canEdit}
                                    alias={alias}
                                    needRequest={needRequest}
                                    setNeedRequest={setNeedRequest}
                                    profileInfo={nbcInfo}
                                    setProfileInfo={setNBCInfo}
                                />
                            </div>
                        </div>
                    </Container>
                </div>
            </Layout>
    )
};

export default React.memo(NBCPage);