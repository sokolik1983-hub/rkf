import React, { useEffect, useState } from "react";
import PageNotFound from "../404";
import Layout from "../../components/Layouts";
import Container from "../../components/Layouts/Container";
import Aside from "../../components/Layouts/Aside";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import UserHeader from "../../components/redesign/UserHeader";
import CheckStatus from './components/CheckStatus';
import UserMenu from "../../components/Layouts/UserMenu";
import { Request } from "../../utils/request";
import { clubNav, endpointGetClubInfo } from "./config";
import { connectAuthVisible } from "../Login/connectors";
import { VideoModal } from "components/Modal";
import StickyBox from "react-sticky-box";
import useIsMobile from "../../utils/useIsMobile";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import { isFederationAlias } from "../../utils";
import MenuComponent from "../../components/MenuComponent";

import "./index.scss";
import PhotoComponent from "../../components/PhotoComponent";

const DocumentStatus = ({ history, match, user, is_active_profile, profile_id, isAuthenticated }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [fedInfo, setFedInfo] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [canEdit, setCanEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const isMobile = useIsMobile(1080);
    const alias = match.params.route;

    useEffect(() => {
        (() => Request({
            url: endpointGetClubInfo + alias
        }, data => {
            if (data.user_type === 4) {
                history.replace(`/kennel/${match.params.route}/news`);
            } else {
                setClubInfo(data);
                setLoading(false);
                setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
            }
        }, error => {
            console.log(error.response);
            setError(error.response);
            setLoading(false);
        }))();
    }, [match]);

    const getFedInfo = (url) => {
        Request({
            url: url
        }, data => {
            setFedInfo(data);
            setLoading(false);
        }, error => {
            console.log(error.response);
            setLoading(false);
        });
    }

    const onSubscriptionUpdate = (subscribed) => {
        setClubInfo({
            ...clubInfo,
            subscribed: subscribed
        })
    }

    useEffect(() => {
        if(clubInfo && clubInfo.federation_alias) {
            let url = `/api/Club/federation_base_info?alias=` + clubInfo.federation_alias;
            getFedInfo(url)
        }
    }, [clubInfo]);

    return loading ?
        <Loading /> :
        error ?
            <PageNotFound /> :
            <Layout>
                <div className="redesign">
                    <Container className="content club-page">
                        <div className="club-page__content-wrap">
                            <div className="club-page__content">
                                <Card className="club-page__content-banner">
                                    <div style={clubInfo.headliner_link && { backgroundImage: `url(${clubInfo.headliner_link}` }} />
                                </Card>
                                {isMobile &&
                                    <>
                                        <UserHeader
                                            user={match.params.route !== 'rkf-online' ? 'club' : ''}
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
                                        <UserPhotoGallery
                                            alias={clubInfo.club_alias}
                                            pageLink={`/${clubInfo.club_alias}/gallery`}
                                        />
                                        <UserVideoGallery
                                            alias={clubInfo.club_alias}
                                            pageLink={`/${clubInfo.club_alias}/video`}
                                        />
                                    </>
                                }
                                <CheckStatus />
                            </div>
                            <Aside className="club-page__info">
                                <StickyBox offsetTop={60}>
                                    <div className="club-page__info-inner 555555555555">
                                        {!isMobile &&
                                            <UserHeader
                                                user={match.params.route !== 'rkf-online' ? 'club' : ''}
                                                logo={clubInfo.logo_link}
                                                name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                alias={clubInfo.club_alias}
                                                profileId={clubInfo.id}
                                                federationName={clubInfo.federation_name}
                                                federationAlias={clubInfo.federation_alias}
                                                isFederation={clubInfo.user_type === 5}
                                                active_rkf_user={clubInfo.active_rkf_user}
                                                active_member={clubInfo.active_member}
                                                canEdit={canEdit}
                                                subscribed={clubInfo.subscribed}
                                                member={clubInfo.member}
                                                onSubscriptionUpdate={onSubscriptionUpdate}
                                                isAuthenticated={isAuthenticated}
                                            />
                                        }
                                        {!isMobile && (clubInfo.user_type === 5 || clubInfo.club_alias === 'rkf') && fedInfo &&
                                            <PhotoComponent
                                                photo={fedInfo.owner_photo}
                                                name={fedInfo.owner_name}
                                                position={fedInfo.owner_position}
                                            />
                                        }
                                        {!isMobile && isFederationAlias(clubInfo.club_alias) ?
                                            <MenuComponent
                                                alias={clubInfo.club_alias}
                                                name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                isFederation={true}
                                            />
                                            :
                                            !isMobile &&
                                            <UserMenu userNav={clubNav(clubInfo.club_alias)} />
                                        }
                                        {!isMobile &&
                                            <>
                                                <UserPhotoGallery
                                                    alias={clubInfo.club_alias}
                                                    pageLink={`/${clubInfo.club_alias}/gallery`}
                                                />
                                                <UserVideoGallery
                                                    alias={clubInfo.club_alias}
                                                    pageLink={`/${clubInfo.club_alias}/video`}
                                                />
                                                <CopyrightInfo withSocials={true} />
                                            </>
                                        }
                                    </div>
                                </StickyBox>
                            </Aside>
                        </div>
                        {showModal &&
                            <VideoModal showModal={showModal} handleClose={() => setShowModal(false)} className="VideoGallery__modal">
                                <div dangerouslySetInnerHTML={{ __html: showModal.item.iframe }} />
                            </VideoModal>}
                    </Container>
                </div>
            </Layout>
};

export default React.memo(connectAuthVisible(DocumentStatus));