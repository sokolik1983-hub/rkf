import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import StickyBox from "react-sticky-box";
import NotConfirmed from "../NotConfirmed";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import CopyrightInfo from "../../components/CopyrightInfo";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import UserHeader from "../../components/redesign/UserHeader";
import ExhibitionsComponent from "../../components/ExhibitionsComponent";
import UserContacts from "../../components/redesign/UserContacts";
import UserDescription from "../../components/redesign/UserDescription";
import AddArticle from "../../components/UserAddArticle";
import UserNews from "../../components/Layouts/UserNews";
import { Request } from "../../utils/request";
import {endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import useIsMobile from "../../utils/useIsMobile";
import { BANNER_TYPES } from "../../appConfig";
import Banner from "../../components/Banner";
import UserBanner from "../../components/Layouts/UserBanner";
import MenuComponentNew from "../../components/MenuComponentNew";

import "./index.scss";

const ClubPage = ({ history, match, profile_id, is_active_profile, isAuthenticated, user }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [error, setError] = useState(null);
    const [canEdit, setCanEdit] = useState(false);
    const [notActiveProfile, setNotActiveProfile] = useState(false);
    const [needRequest, setNeedRequest] = useState(true);
    const [loading, setLoading] = useState(true);
    const isMobile = useIsMobile(1080);
    const alias = match.params.route

    useEffect(() => {
        (() => getClubInfo())();
        return () => setNeedRequest(true);
    }, [match]);

    const getClubInfo = async () => {
        await Request({
            url: endpointGetClubInfo + alias
        }, data => {
            if (data.user_type === 4) {
                history.replace(`/kennel/${alias}`);
            } else {
                setClubInfo(data);
                setNotActiveProfile(isAuthenticated && !is_active_profile);
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
                setLoading(false);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        });
    }

    const onSubscriptionUpdate = (subscribed) => {
        setClubInfo({
            ...clubInfo,
            subscribed: subscribed
        })
    }

    return loading ?
        <Loading /> :
        error ?
            <Redirect to="404" /> :
            notActiveProfile ?
                <NotConfirmed /> :
                <Layout>
                    <div className="redesign">
                        {
                            alert('11111111111111111')
                        }
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
                                    <UserBanner
                                        link={clubInfo.headliner_link}
                                        canEdit={canEdit}
                                        updateInfo={getClubInfo}
                                    />
                                    {isMobile &&
                                        <UserHeader
                                            user={alias !== 'rkf-online' ? 'club' : ''}
                                            userType={clubInfo.user_type}
                                            logo={clubInfo.logo_link}
                                            name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                            alias={clubInfo.club_alias}
                                            profileId={clubInfo.id}
                                            federationName={clubInfo.federation_name}
                                            federationAlias={clubInfo.federation_alias}
                                            active_rkf_user={clubInfo.active_rkf_user}
                                            active_member={clubInfo.active_member}
                                            canEdit={canEdit}
                                            subscribed={clubInfo.subscribed}
                                            member={clubInfo.member}
                                            onSubscriptionUpdate={onSubscriptionUpdate}
                                            isAuthenticated={isAuthenticated}
                                        />
                                    }
                                    <UserDescription description={clubInfo.description} />
                                    <UserContacts {...clubInfo} profileAlias={`club/${clubInfo.club_alias}`} />
                                    <div className="club-page__exhibitions">
                                        <ExhibitionsComponent alias={clubInfo.club_alias} />
                                    </div>
                                    {isMobile &&
                                        <>
                                            <UserPhotoGallery
                                                alias={clubInfo.club_alias}
                                                pageLink={`/club/${clubInfo.club_alias}/gallery`}
                                                canEdit={canEdit}
                                            />
                                            <UserVideoGallery
                                                alias={clubInfo.club_alias}
                                                pageLink={`/club/${clubInfo.club_alias}/video`}
                                                canEdit={canEdit}
                                            />
                                        </>
                                    }
                                    {canEdit &&
                                        <AddArticle
                                            id={clubInfo.id}
                                            logo={clubInfo.logo_link}
                                            setNeedRequest={setNeedRequest}
                                            profileInfo={clubInfo}
                                            setProfileInfo={setClubInfo}
                                        />
                                    }
                                    <UserNews
                                        canEdit={canEdit}
                                        alias={alias}
                                        needRequest={needRequest}
                                        setNeedRequest={setNeedRequest}
                                        profileInfo={clubInfo}
                                        setProfileInfo={setClubInfo}
                                    />
                                </div>
                                <Aside className="club-page__info">
                                    <StickyBox offsetTop={60}>
                                        <div className="club-page__info-inner">
                                            {!isMobile &&
                                                <>
                                                    <UserHeader
                                                        user={alias !== 'rkf-online' ? 'club' : ''}
                                                        logo={clubInfo.logo_link}
                                                        name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                        alias={clubInfo.club_alias}
                                                        profileId={clubInfo.id}
                                                        federationName={clubInfo.federation_name}
                                                        federationAlias={clubInfo.federation_alias}
                                                        active_rkf_user={clubInfo.active_rkf_user}
                                                        active_member={clubInfo.active_member}
                                                        canEdit={canEdit}
                                                        subscribed={clubInfo.subscribed}
                                                        member={clubInfo.member}
                                                        onSubscriptionUpdate={onSubscriptionUpdate}
                                                        isAuthenticated={isAuthenticated}
                                                    />
                                                    <MenuComponentNew />
                                                    <Banner type={BANNER_TYPES.clubPageUnderPhotos} />
                                                    <UserPhotoGallery
                                                        alias={clubInfo.club_alias}
                                                        pageLink={`/club/${clubInfo.club_alias}/gallery`}
                                                        canEdit={canEdit}
                                                    />
                                                    <UserVideoGallery
                                                        alias={clubInfo.club_alias}
                                                        pageLink={`/club/${clubInfo.club_alias}/video`}
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
};

export default React.memo(connectAuthVisible(ClubPage));