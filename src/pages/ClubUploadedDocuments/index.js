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
import MenuComponent from "../../components/MenuComponent";
import "pages/Club/index.scss";
import useIsMobile from "../../utils/useIsMobile";
import UserVideoGallery from "../../components/Layouts/UserGallerys/UserVideoGallery";
import UserPhotoGallery from "../../components/Layouts/UserGallerys/UserPhotoGallery";
import CopyrightInfo from "../../components/CopyrightInfo";
import UploadedDocuments from "components/UploadedDocuments";
import './styles.scss';

const ClubUploadedDocuments = ({ location, isAuthenticated, is_active_profile, profile_id, match, user }) => {
    const [clubInfo, setClubInfo] = useState(null);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [canEdit, setCanEdit] = useState(false);
    let params = useParams();
    const alias = params.route;
    const isMobile = useIsMobile();

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

    return (
        <>
            {!pageLoaded && !clubInfo
                ? <Loading />
                : <Layout>
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
                                    <StickyBox offsetTop={65}>
                                        <div className="club-page__info-inner">
                                            {!isMobile &&
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
                                                    />
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
                                                    <CopyrightInfo />
                                                </>
                                            }
                                        </div>
                                    </StickyBox>
                                </Aside>
                            </div>
                            {isMobile &&
                                <MenuComponent
                                    alias={clubInfo.club_alias}
                                    user={user}
                                    profileId={clubInfo.id}
                                    noCard={true}
                                />
                            }
                        </Container>
                    </div>
                </Layout>
            }
        </>
    )
};

export default connectAuthVisible(React.memo(ClubUploadedDocuments));