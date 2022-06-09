import React, { useState, useEffect } from "react";
import Layout from "components/Layouts";
import Container from "components/Layouts/Container";
import { useParams } from "react-router-dom";
import Loading from "components/Loading";
import { Request } from "utils/request";
import { connectAuthVisible } from "../Login/connectors";
import StickyBox from "react-sticky-box";
import Aside from "components/Layouts/Aside";
import UserHeader from "../../components/redesign/UserHeader";
import useIsMobile from "../../utils/useIsMobile";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import UploadedDocuments from "components/UploadedDocuments";
import PhotoComponent from "../../components/PhotoComponent";
import MenuComponentNew from "../../components/MenuComponentNew";

import "pages/Club/index.scss";
import "./styles.scss";

const ClubUploadedDocuments = ({ location, isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [fedInfo, setFedInfo] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    let params = useParams();
    const alias = params.route;
    const isMobile = useIsMobile(1080);

    useEffect(() => {
        setPageLoaded(false);
        Promise.all([!clubInfo && getClub()])
            .then(() => {
                setPageLoaded(true);
            });
    }, []);

    const getClub = () => {
        return Request({
            url: '/api/Club/public/' + alias
        }, data => {
            setClubInfo(data);
            setCanEdit(isAuthenticated && is_active_profile && profile_id === data.id);
        }, error => console.log(error));
    };

    const getFedInfo = (url) => {
        Request({
            url: url
        }, data => {
            setFedInfo(data);
            setPageLoaded(true);
        }, error => {
            console.log(error.response);
            setPageLoaded(true);
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

    return (
        <>
            {!pageLoaded && !clubInfo
                ? <Loading />
                : <Layout layoutWithFilters>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className={`club-page__content-wrap${clubInfo.federation_name ? ' _isFederation' : ''}`}>
                                <div className="club-page__content">
                                    {isMobile && clubInfo &&
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
                                        </>
                                    }
                                    <div className="UploadedDocuments">
                                        {!pageLoaded
                                            ? <Loading centered={false} />
                                            : <UploadedDocuments location={location} match={match} canEdit={canEdit} />
                                        }
                                    </div>
                                </div>
                                <Aside className="club-page__info">
                                    <StickyBox offsetTop={60}>
                                        <div className="club-page__info-inner">
                                            {!isMobile &&
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
                                            }
                                            {!isMobile && (clubInfo.user_type === 5 || clubInfo.club_alias === 'rkf') && fedInfo &&
                                                <PhotoComponent
                                                    photo={fedInfo.owner_photo}
                                                    name={fedInfo.owner_name}
                                                    position={fedInfo.owner_position}
                                                />
                                            }
                                            {!isMobile &&
                                                <>
                                                    <MenuComponentNew />
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
            }
        </>
    )
};

export default connectAuthVisible(React.memo(ClubUploadedDocuments));