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
import { isFederationAlias } from "../../utils";
import MenuComponent from "../../components/MenuComponent";
import UserMenu from "../../components/Layouts/UserMenu";
import { clubNav } from "../Club/config";

import "pages/Club/index.scss";
import "./styles.scss";

const ClubUploadedDocuments = ({ location, isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    const [notificationsLength, setNotificationsLength] = useState(0);
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

    const onSubscriptionUpdate = (subscribed) => {
        setClubInfo({
            ...clubInfo,
            subscribed: subscribed
        })
    }


    return (
        <>
            {!pageLoaded && !clubInfo
                ? <Loading />
                : <Layout setNotificationsLength={setNotificationsLength} withFilters>
                    <div className="redesign">
                        <Container className="content club-page">
                            <div className="club-page__content-wrap">
                                <div className="club-page__content">
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
                                            {!isMobile && isFederationAlias(clubInfo.club_alias) ?
                                                <MenuComponent
                                                    alias={clubInfo.club_alias}
                                                    name={clubInfo.short_name || clubInfo.name || 'Название клуба отсутствует'}
                                                    isFederation={true}
                                                />
                                                :
                                                !isMobile &&
                                                <UserMenu userNav={canEdit
                                                    ? clubNav(clubInfo.club_alias) // Show NewsFeed menu item to current user only
                                                    : clubNav(clubInfo.club_alias).filter(i => i.id !== 2)}
                                                    notificationsLength={notificationsLength}
                                                />
                                            }
                                            {!isMobile &&
                                                <>
                                                    <UserPhotoGallery
                                                        alias={clubInfo.club_alias}
                                                        pageLink={`/${clubInfo.club_alias}/gallery`}
                                                        canEdit={canEdit}
                                                    />
                                                    <UserVideoGallery
                                                        alias={clubInfo.club_alias}
                                                        pageLink={`/${clubInfo.club_alias}/video`}
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